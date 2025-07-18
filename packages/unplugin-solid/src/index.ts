import { readFileSync } from "node:fs";
import {
  type FilterPattern,
  type UnpluginContextMeta,
  type UnpluginFactory,
  type UnpluginInstance,
  createUnplugin,
} from "unplugin";
import type { Alias, AliasOptions, Plugin as VitePlugin } from "vite";
import { crawlFrameworkPkgs } from "vitefu";

import * as babel from "@babel/core";
// @ts-expect-error
import solid from "babel-preset-solid";
// @ts-expect-error
import ts from "@babel/preset-typescript";
import * as solidRefresh from "solid-refresh/babel";
import { mergeAndConcat } from "merge-anything";

/** Possible options for the extensions property */
export interface ExtensionOptions {
  typescript?: boolean;
}

/** Configuration options for vite-plugin-solid. */
export interface Options {
  /**
   * A [picomatch](https://github.com/micromatch/picomatch) pattern, or array of patterns, which specifies the files
   * the plugin should operate on.
   */
  include?: FilterPattern;
  /**
   * A [picomatch](https://github.com/micromatch/picomatch) pattern, or array of patterns, which specifies the files
   * to be ignored by the plugin.
   */
  exclude?: FilterPattern;
  /**
   * This will inject solid-js/dev in place of solid-js in dev mode. Has no
   * effect in prod. If set to `false`, it won't inject it in dev. This is
   * useful for extra logs and debugging.
   *
   * @default true
   */
  dev?: boolean;
  /**
   * This will force SSR code in the produced files.
   *
   * @default false
   */
  ssr?: boolean;

  /**
   * This will inject HMR runtime in dev mode. Has no effect in prod. If
   * set to `false`, it won't inject the runtime in dev.
   *
   * @default true
   */
  hot?: boolean;
  /**
   * This registers additional extensions that should be processed by
   * vite-plugin-solid.
   *
   * @default undefined
   */
  extensions?: (string | [string, ExtensionOptions])[];
  /**
   * Pass any additional babel transform options. They will be merged with
   * the transformations required by Solid.
   *
   * @default {}
   */
  babel?:
    | babel.TransformOptions
    | ((source: string, id: string, ssr: boolean) => babel.TransformOptions)
    | ((
        source: string,
        id: string,
        ssr: boolean,
      ) => Promise<babel.TransformOptions>);
  /**
   * Pass any additional [babel-plugin-jsx-dom-expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions#plugin-options).
   * They will be merged with the defaults sets by [babel-preset-solid](https://github.com/solidjs/solid/blob/main/packages/babel-preset-solid/index.js#L8-L25).
   *
   * @default {}
   */
  solid?: {
    /**
     * Remove unnecessary closing tags from template strings. More info here:
     * https://github.com/solidjs/solid/blob/main/CHANGELOG.md#smaller-templates
     *
     * @default false
     */
    omitNestedClosingTags?: boolean;

    /**
     * Remove the last closing tag from template strings. Enabled by default even when `omitNestedClosingTags` is disabled.
     * Can be disabled for compatibility for some browser-like environments.
     *
     * @default true
     */
    omitLastClosingTag?: boolean;

    /**
     * Remove unnecessary quotes from template strings.
     * Can be disabled for compatibility for some browser-like environments.
     *
     * @default true
     */
    omitQuotes?: boolean;

    /**
     * The name of the runtime module to import the methods from.
     *
     * @default "solid-js/web"
     */
    moduleName?: string;

    /**
     * The output mode of the compiler.
     * Can be:
     * - "dom" is standard output
     * - "ssr" is for server side rendering of strings.
     * - "universal" is for using custom renderers from solid-js/universal
     *
     * @default "dom"
     */
    generate?: "ssr" | "dom" | "universal";

    /**
     * Indicate whether the output should contain hydratable markers.
     *
     * @default false
     */
    hydratable?: boolean;

    /**
     * Boolean to indicate whether to enable automatic event delegation on camelCase.
     *
     * @default true
     */
    delegateEvents?: boolean;

    /**
     * Boolean indicates whether smart conditional detection should be used.
     * This optimizes simple boolean expressions and ternaries in JSX.
     *
     * @default true
     */
    wrapConditionals?: boolean;

    /**
     * Boolean indicates whether to set current render context on Custom Elements and slots.
     * Useful for seemless Context API with Web Components.
     *
     * @default true
     */
    contextToCustomElements?: boolean;

    /**
     * Array of Component exports from module, that aren't included by default with the library.
     * This plugin will automatically import them if it comes across them in the JSX.
     *
     * @default ["For","Show","Switch","Match","Suspense","SuspenseList","Portal","Index","Dynamic","ErrorBoundary"]
     */
    builtIns?: string[];
  };
}

const runtimePublicPath = "/@solid-refresh";
const runtimeFilePath = require.resolve("solid-refresh/dist/solid-refresh.mjs");
const runtimeCode = readFileSync(runtimeFilePath, "utf-8");

const getExtension = (filename: string): string => {
  const index = filename.lastIndexOf(".");
  return index < 0 ? "" : filename.substring(index).replace(/\?.+$/, "");
};

const containsSolidField = (fields: Record<string, any>) => {
  const keys = Object.keys(fields);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key === "solid") return true;
    if (
      typeof fields[key] === "object" &&
      fields[key] != null &&
      containsSolidField(fields[key])
    )
      return true;
  }
  return false;
};

const getJestDomExport = (setupFiles: string[]) => {
  return setupFiles?.some((path) => /jest-dom/.test(path))
    ? undefined
    : [
        "@testing-library/jest-dom/vitest",
        "@testing-library/jest-dom/extend-expect",
      ].find((path) => {
        try {
          require.resolve(path);
          return true;
        } catch (e) {
          return false;
        }
      });
};

const normalizeAliases = (alias: AliasOptions = []): Alias[] => {
  return Array.isArray(alias)
    ? alias
    : Object.entries(alias).map(([find, replacement]) => ({
        find,
        replacement,
      }));
};

export const Solid: UnpluginInstance<Options | undefined, false> =
  createUnplugin((options = {}) => {
    let needHmr = false;
    let replaceDev = false;
    let projectRoot = process.cwd();
    let isTestMode = false;

    return {
      name: "unplugin-solid",
      enforce: "pre",
      vite: {
        async config(userConfig, { command }) {
          // We inject the dev mode only if the user explicitly wants it or if we are in dev (serve) mode
          replaceDev =
            options.dev === true ||
            (options.dev !== false && command === "serve");
          projectRoot = userConfig.root ?? process.cwd();
          isTestMode = userConfig.mode === "test";

          if (!userConfig.resolve) userConfig.resolve = {};
          userConfig.resolve.alias = normalizeAliases(
            userConfig.resolve && userConfig.resolve.alias,
          );

          const solidPkgsConfig = await crawlFrameworkPkgs({
            viteUserConfig: userConfig,
            root: projectRoot || process.cwd(),
            isBuild: command === "build",
            isFrameworkPkgByJson(pkgJson) {
              return containsSolidField(pkgJson.exports || {});
            },
          });

          // fix for bundling dev in production
          const nestedDeps = replaceDev
            ? [
                "solid-js",
                "solid-js/web",
                "solid-js/store",
                "solid-js/html",
                "solid-js/h",
              ]
            : [];

          const userTest = (userConfig as any).test ?? {};
          const test = {} as any;
          if (userConfig.mode === "test") {
            // to simplify the processing of the config, we normalize the setupFiles to an array
            const userSetupFiles: string[] =
              typeof userTest.setupFiles === "string"
                ? [userTest.setupFiles]
                : userTest.setupFiles || [];

            if (!userTest.environment && !options.ssr) {
              test.environment = "jsdom";
            }

            if (
              !userTest.server?.deps?.external?.find((item: string | RegExp) =>
                /solid-js/.test(item.toString()),
              )
            ) {
              test.server = { deps: { external: [/solid-js/] } };
            }
            if (!userTest.browser?.enabled) {
              // vitest browser mode already has bundled jest-dom assertions
              // https://main.vitest.dev/guide/browser/assertion-api.html#assertion-api
              const jestDomImport = getJestDomExport(userSetupFiles);
              if (jestDomImport) {
                test.setupFiles = [jestDomImport];
              }
            }
          }

          const version = (await import("vite")).version;
          const isVite6 = version.startsWith("6.");

          return {
            /**
             * We only need esbuild on .ts or .js files.
             * .tsx & .jsx files are handled by us
             */
            // esbuild: { include: /\.ts$/ },
            resolve: {
              conditions: isVite6
                ? undefined
                : [
                    "solid",
                    ...(replaceDev ? ["development"] : []),
                    ...(userConfig.mode === "test" && !options.ssr
                      ? ["browser"]
                      : []),
                  ],
              dedupe: nestedDeps,
              alias: [
                { find: /^solid-refresh$/, replacement: runtimePublicPath },
              ],
            },
            optimizeDeps: {
              include: [...nestedDeps, ...solidPkgsConfig.optimizeDeps.include],
              exclude: solidPkgsConfig.optimizeDeps.exclude,
            },
            ssr: solidPkgsConfig.ssr,
            ...(test.server ? { test } : {}),
          };
        },
        async configEnvironment(name, config, opts) {
          config.resolve ??= {};
          // Emulate Vite default fallback for `resolve.conditions` if not set
          if (config.resolve.conditions == null) {
            // @ts-ignore These exports only exist in Vite 6
            const { defaultClientConditions, defaultServerConditions } =
              await import("vite");
            if (
              config.consumer === "client" ||
              name === "client" ||
              opts.isSsrTargetWebworker
            ) {
              config.resolve.conditions = [...defaultClientConditions];
            } else {
              config.resolve.conditions = [...defaultServerConditions];
            }
          }
          config.resolve.conditions = [
            "solid",
            ...(replaceDev ? ["development"] : []),
            ...(isTestMode && !opts.isSsrTargetWebworker ? ["browser"] : []),
            ...config.resolve.conditions,
          ];
        },
        configResolved(config) {
          needHmr =
            config.command === "serve" &&
            config.mode !== "production" &&
            options.hot !== false;
        },

        resolveId(id) {
          if (id === runtimePublicPath) return id;
        },

        load(id) {
          if (id === runtimePublicPath) return runtimeCode;
        },
      } satisfies Partial<VitePlugin>,
      transform: {
        filter: {
          id: {
            include: options.include,
            exclude: options.exclude,
          },
        },
        async handler(source, id) {
          // const isSsr = transformOptions && transformOptions.ssr;
          const isSsr = options.ssr ?? false;
          const currentFileExtension = getExtension(id);

          const extensionsToWatch = options.extensions || [];
          const allExtensions = extensionsToWatch.map((extension) =>
            // An extension can be a string or a tuple [extension, options]
            typeof extension === "string" ? extension : extension[0],
          );

          id = id.replace(/\?.*$/, "");

          if (
            !(
              /\.[mc]?[tj]sx$/i.test(id) ||
              allExtensions.includes(currentFileExtension)
            )
          ) {
            return null;
          }

          const inNodeModules = /node_modules/.test(id);

          let solidOptions: { generate: "ssr" | "dom"; hydratable: boolean };

          if (options.ssr) {
            if (isSsr) {
              solidOptions = { generate: "ssr", hydratable: true };
            } else {
              solidOptions = { generate: "dom", hydratable: true };
            }
          } else {
            solidOptions = { generate: "dom", hydratable: false };
          }

          // We need to know if the current file extension has a typescript options tied to it
          const shouldBeProcessedWithTypescript =
            /\.[mc]?tsx$/i.test(id) ||
            extensionsToWatch.some((extension) => {
              if (typeof extension === "string") {
                return extension.includes("tsx");
              }

              const [extensionName, extensionOptions] = extension;
              if (extensionName !== currentFileExtension) return false;

              return extensionOptions.typescript;
            });
          const plugins: NonNullable<
            NonNullable<babel.TransformOptions["parserOpts"]>["plugins"]
          > = ["jsx"];

          if (shouldBeProcessedWithTypescript) {
            plugins.push("typescript");
          }

          const opts: babel.TransformOptions = {
            root: projectRoot,
            filename: id,
            sourceFileName: id,
            presets: [[solid, { ...solidOptions, ...(options.solid || {}) }]],
            plugins:
              needHmr && !isSsr && !inNodeModules
                ? [[solidRefresh, { bundler: "vite" }]]
                : [],
            ast: false,
            sourceMaps: true,
            configFile: false,
            babelrc: false,
            parserOpts: {
              plugins,
            },
          };

          // Default value for babel user options
          let babelUserOptions: babel.TransformOptions = {};

          if (options.babel) {
            if (typeof options.babel === "function") {
              const babelOptions = options.babel(source, id, isSsr);
              babelUserOptions =
                babelOptions instanceof Promise
                  ? await babelOptions
                  : babelOptions;
            } else {
              babelUserOptions = options.babel;
            }
          }

          const babelOptions = mergeAndConcat(
            babelUserOptions,
            opts,
          ) as babel.TransformOptions;

          const { code, map } =
            (await babel.transformAsync(source, babelOptions)) ?? {};

          return { code: code!, map };
        },
      },
    };
  });
