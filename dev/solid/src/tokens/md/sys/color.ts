import { createThemeContract } from "@vanilla-extract/css";
import {
  hexFromArgb,
  type DynamicScheme,
} from "@materialx/material-color-utilities";
import type { CSSVarFunction } from "~/utils";
import type * as palette from "../ref/palette";

export type BaselineTokens<T> = {
  background: T;
  onBackground: T;
  surface: T;
  surfaceDim: T;
  surfaceBright: T;
  surfaceContainerLowest: T;
  surfaceContainerLow: T;
  surfaceContainer: T;
  surfaceContainerHigh: T;
  surfaceContainerHighest: T;
  onSurface: T;
  surfaceVariant: T;
  onSurfaceVariant: T;
  outline: T;
  outlineVariant: T;
  inverseSurface: T;
  inverseOnSurface: T;
  shadow: T;
  scrim: T;
  surfaceTint: T;
  primary: T;
  onPrimary: T;
  primaryContainer: T;
  onPrimaryContainer: T;
  primaryFixed: T;
  primaryFixedDim: T;
  onPrimaryFixed: T;
  onPrimaryFixedVariant: T;
  inversePrimary: T;
  secondary: T;
  onSecondary: T;
  secondaryContainer: T;
  onSecondaryContainer: T;
  secondaryFixed: T;
  secondaryFixedDim: T;
  onSecondaryFixed: T;
  onSecondaryFixedVariant: T;
  tertiary: T;
  onTertiary: T;
  tertiaryContainer: T;
  onTertiaryContainer: T;
  tertiaryFixed: T;
  tertiaryFixedDim: T;
  onTertiaryFixed: T;
  onTertiaryFixedVariant: T;
  error: T;
  onError: T;
  errorContainer: T;
  onErrorContainer: T;
};

export type DynamicOnlyTokens<T> = {
  primaryPaletteKeyColor: T;
  secondaryPaletteKeyColor: T;
  tertiaryPaletteKeyColor: T;
  neutralPaletteKeyColor: T;
  neutralVariantPaletteKeyColor: T;
  errorPaletteKeyColor: T;
  primaryDim: T;
  secondaryDim: T;
  tertiaryDim: T;
  errorDim: T;
};

export type DynamicTokens<T> = BaselineTokens<T> & DynamicOnlyTokens<T>;

export type Tokens<T> = DynamicTokens<T>;

export const createBaselineTokens = (): BaselineTokens<CSSVarFunction> => {
  const template: BaselineTokens<null> = {
    background: null,
    onBackground: null,
    surface: null,
    surfaceDim: null,
    surfaceBright: null,
    surfaceContainerLowest: null,
    surfaceContainerLow: null,
    surfaceContainer: null,
    surfaceContainerHigh: null,
    surfaceContainerHighest: null,
    onSurface: null,
    surfaceVariant: null,
    onSurfaceVariant: null,
    outline: null,
    outlineVariant: null,
    inverseSurface: null,
    inverseOnSurface: null,
    shadow: null,
    scrim: null,
    surfaceTint: null,
    primary: null,
    onPrimary: null,
    primaryContainer: null,
    onPrimaryContainer: null,
    primaryFixed: null,
    primaryFixedDim: null,
    onPrimaryFixed: null,
    onPrimaryFixedVariant: null,
    inversePrimary: null,
    secondary: null,
    onSecondary: null,
    secondaryContainer: null,
    onSecondaryContainer: null,
    secondaryFixed: null,
    secondaryFixedDim: null,
    onSecondaryFixed: null,
    onSecondaryFixedVariant: null,
    tertiary: null,
    onTertiary: null,
    tertiaryContainer: null,
    onTertiaryContainer: null,
    tertiaryFixed: null,
    tertiaryFixedDim: null,
    onTertiaryFixed: null,
    onTertiaryFixedVariant: null,
    error: null,
    onError: null,
    errorContainer: null,
    onErrorContainer: null,
  };
  return createThemeContract(template);
};

export const createDynamicOnlyTokens =
  (): DynamicOnlyTokens<CSSVarFunction> => {
    const template: DynamicOnlyTokens<null> = {
      primaryPaletteKeyColor: null,
      secondaryPaletteKeyColor: null,
      tertiaryPaletteKeyColor: null,
      neutralPaletteKeyColor: null,
      neutralVariantPaletteKeyColor: null,
      errorPaletteKeyColor: null,
      primaryDim: null,
      secondaryDim: null,
      tertiaryDim: null,
      errorDim: null,
    };
    return createThemeContract(template);
  };

export const createTokens = (): Tokens<CSSVarFunction> => {
  return {
    ...createBaselineTokens(),
    ...createDynamicOnlyTokens(),
  };
};

export const colorValuesFromDynamicScheme = (
  scheme: DynamicScheme,
): Tokens<string> => {
  return {
    primaryPaletteKeyColor: hexFromArgb(scheme.primaryPaletteKeyColor),
    secondaryPaletteKeyColor: hexFromArgb(scheme.secondaryPaletteKeyColor),
    tertiaryPaletteKeyColor: hexFromArgb(scheme.tertiaryPaletteKeyColor),
    neutralPaletteKeyColor: hexFromArgb(scheme.neutralPaletteKeyColor),
    neutralVariantPaletteKeyColor: hexFromArgb(
      scheme.neutralVariantPaletteKeyColor,
    ),
    errorPaletteKeyColor: hexFromArgb(scheme.errorPaletteKeyColor),
    background: hexFromArgb(scheme.background),
    onBackground: hexFromArgb(scheme.onBackground),
    surface: hexFromArgb(scheme.surface),
    surfaceDim: hexFromArgb(scheme.surfaceDim),
    surfaceBright: hexFromArgb(scheme.surfaceBright),
    surfaceContainerLowest: hexFromArgb(scheme.surfaceContainerLowest),
    surfaceContainerLow: hexFromArgb(scheme.surfaceContainerLow),
    surfaceContainer: hexFromArgb(scheme.surfaceContainer),
    surfaceContainerHigh: hexFromArgb(scheme.surfaceContainerHigh),
    surfaceContainerHighest: hexFromArgb(scheme.surfaceContainerHighest),
    onSurface: hexFromArgb(scheme.onSurface),
    surfaceVariant: hexFromArgb(scheme.surfaceVariant),
    onSurfaceVariant: hexFromArgb(scheme.onSurfaceVariant),
    outline: hexFromArgb(scheme.outline),
    outlineVariant: hexFromArgb(scheme.outlineVariant),
    inverseSurface: hexFromArgb(scheme.inverseSurface),
    inverseOnSurface: hexFromArgb(scheme.inverseOnSurface),
    shadow: hexFromArgb(scheme.shadow),
    scrim: hexFromArgb(scheme.scrim),
    surfaceTint: hexFromArgb(scheme.surfaceTint),
    primary: hexFromArgb(scheme.primary),
    primaryDim: hexFromArgb(scheme.primaryDim),
    onPrimary: hexFromArgb(scheme.onPrimary),
    primaryContainer: hexFromArgb(scheme.primaryContainer),
    onPrimaryContainer: hexFromArgb(scheme.onPrimaryContainer),
    primaryFixed: hexFromArgb(scheme.primaryFixed),
    primaryFixedDim: hexFromArgb(scheme.primaryFixedDim),
    onPrimaryFixed: hexFromArgb(scheme.onPrimaryFixed),
    onPrimaryFixedVariant: hexFromArgb(scheme.onPrimaryFixedVariant),
    inversePrimary: hexFromArgb(scheme.inversePrimary),
    secondary: hexFromArgb(scheme.secondary),
    secondaryDim: hexFromArgb(scheme.secondaryDim),
    onSecondary: hexFromArgb(scheme.onSecondary),
    secondaryContainer: hexFromArgb(scheme.secondaryContainer),
    onSecondaryContainer: hexFromArgb(scheme.onSecondaryContainer),
    secondaryFixed: hexFromArgb(scheme.secondaryFixed),
    secondaryFixedDim: hexFromArgb(scheme.secondaryFixedDim),
    onSecondaryFixed: hexFromArgb(scheme.onSecondaryFixed),
    onSecondaryFixedVariant: hexFromArgb(scheme.onSecondaryFixedVariant),
    tertiary: hexFromArgb(scheme.tertiary),
    tertiaryDim: hexFromArgb(scheme.tertiaryDim),
    onTertiary: hexFromArgb(scheme.onTertiary),
    tertiaryContainer: hexFromArgb(scheme.tertiaryContainer),
    onTertiaryContainer: hexFromArgb(scheme.onTertiaryContainer),
    tertiaryFixed: hexFromArgb(scheme.tertiaryFixed),
    tertiaryFixedDim: hexFromArgb(scheme.tertiaryFixedDim),
    onTertiaryFixed: hexFromArgb(scheme.onTertiaryFixed),
    onTertiaryFixedVariant: hexFromArgb(scheme.onTertiaryFixedVariant),
    error: hexFromArgb(scheme.error),
    errorDim: hexFromArgb(scheme.errorDim),
    onError: hexFromArgb(scheme.onError),
    errorContainer: hexFromArgb(scheme.errorContainer),
    onErrorContainer: hexFromArgb(scheme.onErrorContainer),
  };
};

export type Theme = "light" | "dark";
export type Contrast = "normal" | "medium" | "high";

const BASELINE_COLOR_VALUES: Record<
  Theme,
  Record<
    Contrast,
    (palette: palette.BaselineTokens<string>) => BaselineTokens<string>
  >
> = {
  light: {
    normal: (palette) => ({
      // Primary
      primary: palette.primary40,
      onPrimary: palette.primary100,
      primaryContainer: palette.primary90,
      onPrimaryContainer: palette.primary30,
      // Secondary
      secondary: palette.secondary40,
      onSecondary: palette.secondary100,
      secondaryContainer: palette.secondary90,
      onSecondaryContainer: palette.secondary30,
      // Tertiary
      tertiary: palette.tertiary40,
      onTertiary: palette.tertiary100,
      tertiaryContainer: palette.tertiary90,
      onTertiaryContainer: palette.tertiary30,
      // Error
      error: palette.error40,
      onError: palette.error100,
      errorContainer: palette.error90,
      onErrorContainer: palette.error30,
      // Surface
      surface: palette.neutral98,
      onSurface: palette.neutral10,
      surfaceVariant: palette.neutralVariant90,
      onSurfaceVariant: palette.neutralVariant30,
      surfaceContainerHighest: palette.neutral90,
      surfaceContainerHigh: palette.neutral92,
      surfaceContainer: palette.neutral94,
      surfaceContainerLow: palette.neutral96,
      surfaceContainerLowest: palette.neutral100,
      inverseSurface: palette.neutral20,
      inverseOnSurface: palette.neutral95,
      surfaceTint: palette.primary40,
      // Outline
      outline: palette.neutralVariant50,
      outlineVariant: palette.neutralVariant80,
      // Add-on primary
      primaryFixed: palette.primary90,
      onPrimaryFixed: palette.primary10,
      primaryFixedDim: palette.primary80,
      onPrimaryFixedVariant: palette.primary30,
      inversePrimary: palette.primary80,
      // Add-on secondary
      secondaryFixed: palette.secondary90,
      onSecondaryFixed: palette.secondary10,
      secondaryFixedDim: palette.secondary80,
      onSecondaryFixedVariant: palette.secondary30,
      // Add-on tertiary
      tertiaryFixed: palette.tertiary90,
      onTertiaryFixed: palette.tertiary10,
      tertiaryFixedDim: palette.tertiary80,
      onTertiaryFixedVariant: palette.tertiary30,
      // Add-on surface
      background: palette.neutral98,
      onBackground: palette.neutral10,
      surfaceBright: palette.neutral98,
      surfaceDim: palette.neutral87,
      scrim: palette.neutral0,
      shadow: palette.neutral0,
    }),
    medium: (palette) => ({
      // Primary
      primary: palette.primary30,
      onPrimary: palette.primary100,
      primaryContainer: palette.primary40,
      onPrimaryContainer: palette.primary100,
      // Secondary
      secondary: palette.secondary30,
      onSecondary: palette.secondary100,
      secondaryContainer: palette.secondary40,
      onSecondaryContainer: palette.secondary100,
      // Tertiary
      tertiary: palette.tertiary30,
      onTertiary: palette.tertiary100,
      tertiaryContainer: palette.tertiary40,
      onTertiaryContainer: palette.tertiary100,
      // Error
      error: palette.error30,
      onError: palette.error100,
      errorContainer: palette.error40,
      onErrorContainer: palette.error100,
      // Surface
      surface: palette.neutral98,
      onSurface: palette.neutral0,
      surfaceVariant: palette.neutralVariant90,
      onSurfaceVariant: palette.neutralVariant20,
      surfaceContainerHighest: palette.neutral90,
      surfaceContainerHigh: palette.neutral92,
      surfaceContainer: palette.neutral94,
      surfaceContainerLow: palette.neutral96,
      surfaceContainerLowest: palette.neutral100,
      inverseSurface: palette.neutral20,
      inverseOnSurface: palette.neutral100,
      surfaceTint: palette.primary30,
      // Outline
      outline: palette.neutralVariant30,
      outlineVariant: palette.neutralVariant50,
      // Add-on primary
      primaryFixed: palette.primary40,
      onPrimaryFixed: palette.primary100,
      primaryFixedDim: palette.primary30,
      onPrimaryFixedVariant: palette.primary100,
      inversePrimary: palette.primary80,
      // Add-on secondary
      secondaryFixed: palette.secondary40,
      onSecondaryFixed: palette.secondary100,
      secondaryFixedDim: palette.secondary30,
      onSecondaryFixedVariant: palette.secondary100,
      // Add-on tertiary
      tertiaryFixed: palette.tertiary40,
      onTertiaryFixed: palette.tertiary100,
      tertiaryFixedDim: palette.tertiary30,
      onTertiaryFixedVariant: palette.tertiary100,
      // Add-on surface
      background: palette.neutral98,
      onBackground: palette.neutral0,
      surfaceBright: palette.neutral98,
      surfaceDim: palette.neutral87,
      scrim: palette.neutral0,
      shadow: palette.neutral0,
    }),
    high: (palette) => ({
      // Primary
      primary: palette.primary20,
      onPrimary: palette.primary100,
      primaryContainer: palette.primary30,
      onPrimaryContainer: palette.primary100,
      // Secondary
      secondary: palette.secondary20,
      onSecondary: palette.secondary100,
      secondaryContainer: palette.secondary30,
      onSecondaryContainer: palette.secondary100,
      // Tertiary
      tertiary: palette.tertiary20,
      onTertiary: palette.tertiary100,
      tertiaryContainer: palette.tertiary30,
      onTertiaryContainer: palette.tertiary100,
      // Error
      error: palette.error20,
      onError: palette.error100,
      errorContainer: palette.error30,
      onErrorContainer: palette.error100,
      // Surface
      surface: palette.neutral98,
      onSurface: palette.neutral0,
      surfaceVariant: palette.neutralVariant90,
      onSurfaceVariant: palette.neutralVariant0,
      surfaceContainerHighest: palette.neutral90,
      surfaceContainerHigh: palette.neutral92,
      surfaceContainer: palette.neutral94,
      surfaceContainerLow: palette.neutral96,
      surfaceContainerLowest: palette.neutral100,
      inverseSurface: palette.neutral20,
      inverseOnSurface: palette.neutral100,
      surfaceTint: palette.primary20,
      // Outline
      outline: palette.neutralVariant20,
      outlineVariant: palette.neutralVariant30,
      // Add-on primary
      primaryFixed: palette.primary30,
      onPrimaryFixed: palette.primary100,
      primaryFixedDim: palette.primary20,
      onPrimaryFixedVariant: palette.primary100,
      inversePrimary: palette.primary80,
      // Add-on secondary
      secondaryFixed: palette.secondary30,
      onSecondaryFixed: palette.secondary100,
      secondaryFixedDim: palette.secondary20,
      onSecondaryFixedVariant: palette.secondary100,
      // Add-on tertiary
      tertiaryFixed: palette.tertiary30,
      onTertiaryFixed: palette.tertiary100,
      tertiaryFixedDim: palette.tertiary20,
      onTertiaryFixedVariant: palette.tertiary100,
      // Add-on surface
      background: palette.neutral98,
      onBackground: palette.neutral0,
      surfaceBright: palette.neutral98,
      surfaceDim: palette.neutral87,
      scrim: palette.neutral0,
      shadow: palette.neutral0,
    }),
  },
  dark: {
    normal: (palette) => ({
      // Primary
      primary: palette.primary80,
      onPrimary: palette.primary20,
      primaryContainer: palette.primary30,
      onPrimaryContainer: palette.primary90,
      // Secondary
      secondary: palette.secondary80,
      onSecondary: palette.secondary20,
      secondaryContainer: palette.secondary30,
      onSecondaryContainer: palette.secondary90,
      // Tertiary
      tertiary: palette.tertiary80,
      onTertiary: palette.tertiary20,
      tertiaryContainer: palette.tertiary30,
      onTertiaryContainer: palette.tertiary90,
      // Error
      error: palette.error80,
      onError: palette.error20,
      errorContainer: palette.error30,
      onErrorContainer: palette.error90,
      // Surface
      surface: palette.neutral6,
      onSurface: palette.neutral90,
      surfaceVariant: palette.neutralVariant30,
      onSurfaceVariant: palette.neutralVariant80,
      surfaceContainerHighest: palette.neutral22,
      surfaceContainerHigh: palette.neutral17,
      surfaceContainer: palette.neutral12,
      surfaceContainerLow: palette.neutral10,
      surfaceContainerLowest: palette.neutral4,
      inverseSurface: palette.neutral90,
      inverseOnSurface: palette.neutral20,
      surfaceTint: palette.primary80,
      // Outline
      outline: palette.neutralVariant60,
      outlineVariant: palette.neutralVariant30,
      // Add-on primary
      primaryFixed: palette.primary90,
      onPrimaryFixed: palette.primary10,
      primaryFixedDim: palette.primary80,
      onPrimaryFixedVariant: palette.primary30,
      inversePrimary: palette.primary40,
      // Add-on secondary
      secondaryFixed: palette.secondary90,
      onSecondaryFixed: palette.secondary10,
      secondaryFixedDim: palette.secondary80,
      onSecondaryFixedVariant: palette.secondary30,
      // Add-on tertiary
      tertiaryFixed: palette.tertiary90,
      onTertiaryFixed: palette.tertiary10,
      tertiaryFixedDim: palette.tertiary80,
      onTertiaryFixedVariant: palette.tertiary30,
      // Add-on surface
      background: palette.neutral6,
      onBackground: palette.neutral90,
      surfaceBright: palette.neutral24,
      surfaceDim: palette.neutral6,
      scrim: palette.neutral0,
      shadow: palette.neutral0,
    }),
    medium: (palette) => ({
      // Primary
      primary: palette.primary90,
      onPrimary: palette.primary10,
      primaryContainer: palette.primary60,
      onPrimaryContainer: palette.primary0,
      // Secondary
      secondary: palette.secondary90,
      onSecondary: palette.secondary10,
      secondaryContainer: palette.secondary60,
      onSecondaryContainer: palette.secondary0,
      // Tertiary
      tertiary: palette.tertiary90,
      onTertiary: palette.tertiary10,
      tertiaryContainer: palette.tertiary60,
      onTertiaryContainer: palette.tertiary0,
      // Error
      error: palette.error90,
      onError: palette.error10,
      errorContainer: palette.error60,
      onErrorContainer: palette.error0,
      // Surface
      surface: palette.neutral6,
      onSurface: palette.neutral100,
      surfaceVariant: palette.neutralVariant30,
      onSurfaceVariant: palette.neutralVariant90,
      surfaceContainerHighest: palette.neutral22,
      surfaceContainerHigh: palette.neutral17,
      surfaceContainer: palette.neutral12,
      surfaceContainerLow: palette.neutral10,
      surfaceContainerLowest: palette.neutral4,
      inverseSurface: palette.neutral90,
      inverseOnSurface: palette.neutral10,
      surfaceTint: palette.primary90,
      // Outline
      outline: palette.neutralVariant70,
      outlineVariant: palette.neutralVariant60,
      // Add-on primary
      primaryFixed: palette.primary90,
      onPrimaryFixed: palette.primary0,
      primaryFixedDim: palette.primary80,
      onPrimaryFixedVariant: palette.primary20,
      inversePrimary: palette.primary30,
      // Add-on secondary
      secondaryFixed: palette.secondary90,
      onSecondaryFixed: palette.secondary0,
      secondaryFixedDim: palette.secondary80,
      onSecondaryFixedVariant: palette.secondary20,
      // Add-on tertiary
      tertiaryFixed: palette.tertiary90,
      onTertiaryFixed: palette.tertiary0,
      tertiaryFixedDim: palette.tertiary80,
      onTertiaryFixedVariant: palette.tertiary20,
      // Add-on surface
      background: palette.neutral6,
      onBackground: palette.neutral100,
      surfaceBright: palette.neutral24,
      surfaceDim: palette.neutral6,
      scrim: palette.neutral0,
      shadow: palette.neutral0,
    }),
    high: (palette) => ({
      // Primary
      primary: palette.primary95,
      onPrimary: palette.primary0,
      primaryContainer: palette.primary80,
      onPrimaryContainer: palette.primary0,
      // Secondary
      secondary: palette.secondary95,
      onSecondary: palette.secondary0,
      secondaryContainer: palette.secondary80,
      onSecondaryContainer: palette.secondary0,
      // Tertiary
      tertiary: palette.tertiary95,
      onTertiary: palette.tertiary0,
      tertiaryContainer: palette.tertiary80,
      onTertiaryContainer: palette.tertiary0,
      // Error
      error: palette.error95,
      onError: palette.error0,
      errorContainer: palette.error80,
      onErrorContainer: palette.error0,
      // Surface
      surface: palette.neutral6,
      onSurface: palette.neutral100,
      surfaceVariant: palette.neutralVariant30,
      onSurfaceVariant: palette.neutralVariant90,
      surfaceContainerHighest: palette.neutral22,
      surfaceContainerHigh: palette.neutral17,
      surfaceContainer: palette.neutral12,
      surfaceContainerLow: palette.neutral10,
      surfaceContainerLowest: palette.neutral4,
      inverseSurface: palette.neutral90,
      inverseOnSurface: palette.neutral0,
      surfaceTint: palette.primary95,
      // Outline
      outline: palette.neutralVariant95,
      outlineVariant: palette.neutralVariant80,
      // Add-on primary
      primaryFixed: palette.primary90,
      onPrimaryFixed: palette.primary0,
      primaryFixedDim: palette.primary80,
      onPrimaryFixedVariant: palette.primary0,
      inversePrimary: palette.primary20,
      // Add-on secondary
      secondaryFixed: palette.secondary90,
      onSecondaryFixed: palette.secondary0,
      secondaryFixedDim: palette.secondary80,
      onSecondaryFixedVariant: palette.secondary0,
      // Add-on tertiary
      tertiaryFixed: palette.tertiary90,
      onTertiaryFixed: palette.tertiary0,
      tertiaryFixedDim: palette.tertiary80,
      onTertiaryFixedVariant: palette.tertiary0,
      // Add-on surface
      background: palette.neutral6,
      onBackground: palette.neutral100,
      surfaceBright: palette.neutral24,
      surfaceDim: palette.neutral6,
      scrim: palette.neutral0,
      shadow: palette.neutral0,
    }),
  },
};

export const baselineColorValuesFromPalette = (
  palette: palette.BaselineTokens<string>,
  theme: Theme,
  contrast: Contrast = "normal",
): BaselineTokens<string> => BASELINE_COLOR_VALUES[theme][contrast](palette);

export const dynamicOnlyColorValuesFromBaselineColorValues = (
  color: BaselineTokens<string>,
): DynamicOnlyTokens<string> => {
  return {
    // TODO: Probably key colors aren't accessible in this context.
    primaryPaletteKeyColor: "",
    secondaryPaletteKeyColor: "",
    tertiaryPaletteKeyColor: "",
    neutralPaletteKeyColor: "",
    neutralVariantPaletteKeyColor: "",
    errorPaletteKeyColor: "",

    // Remap md.sys.color.*-dim roles to md.sys.color.*
    primaryDim: color.primary,
    secondaryDim: color.secondary,
    tertiaryDim: color.tertiary,
    errorDim: color.error,
  };
};

export const createValuesFromPalette = (
  color: BaselineTokens<string>,
  palette: palette.BaselineTokens<string>,
  theme: Theme,
  contrast: Contrast = "normal",
): Tokens<string> => {
  return {
    ...baselineColorValuesFromPalette(palette, theme, contrast),
    ...dynamicOnlyColorValuesFromBaselineColorValues(color),
  };
};
