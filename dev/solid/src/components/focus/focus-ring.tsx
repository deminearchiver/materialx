import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
  useContext,
  type Accessor,
  type Component,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { createEventListenerMap } from "@solid-primitives/event-listener";
import clsx from "clsx";
import {
  access,
  type FalsyValue,
  type MaybeAccessor,
} from "@solid-primitives/utils";
import type { Ref } from "@solid-primitives/refs";

const HANDLED_BY_FOCUS_RING = Symbol("handledByFocusRing");
interface FocusRingEvent {
  [HANDLED_BY_FOCUS_RING]?: boolean;
}

export type FocusRingPlacement = "outward" | "inward";

export type FocusRingProps = Omit<
  JSX.HTMLAttributes<HTMLElement>,
  "aria-hidden" | "children"
> & {
  for?: MaybeAccessor<HTMLElement | FalsyValue>;
  placement?: FocusRingPlacement;
};

export const FocusRing: Component<FocusRingProps> = (props) => {
  const mergedProps = mergeProps(
    { placement: "outward" as FocusRingPlacement },
    props,
  );

  const [local, others] = splitProps(mergedProps, [
    "ref",
    "class",
    "for",
    "placement",
  ]);

  const { classNames } = useFocusRingTheme();

  const target = createMemo(() => {
    const element = access(local.for);
    return element || undefined;
  });

  const [isVisible, setIsVisible] = createSignal(false);

  const withEvent = <T extends Event = Event>(
    callback: (event: T & FocusRingEvent) => void,
  ): ((event: T & FocusRingEvent) => void) => {
    return (event) => {
      if (HANDLED_BY_FOCUS_RING in event && event[HANDLED_BY_FOCUS_RING]) {
        return;
      }
      callback(event);
      event[HANDLED_BY_FOCUS_RING] = true;
    };
  };

  const onFocusIn = withEvent(() => {
    const visible = target()?.matches(":focus-visible");
    setIsVisible(visible ?? false);
  });

  const onFocusOut = withEvent(() => {
    setIsVisible(false);
  });

  const onPointerDown = withEvent(() => {
    setIsVisible(false);
  });

  createEffect(() => {
    const element = access(target);
    if (!element) {
      setIsVisible(false);
      return;
    }
    createEventListenerMap(element, {
      focusin: onFocusIn,
      focusout: onFocusOut,
      pointerdown: onPointerDown,
    });
  });

  return (
    <div
      ref={local.ref as Ref<HTMLDivElement>}
      class={clsx(
        classNames()?.host({
          isVisible: isVisible(),
          placement: local.placement,
        }),
        local.class,
      )}
      aria-hidden="true"
      {...others}
    />
  );
};

type FocusRingClassNamesHostOptions = {
  isVisible: boolean;
  placement: FocusRingPlacement;
};

export type FocusRingClassNames = {
  host: (options: FocusRingClassNamesHostOptions) => string;
};

interface FocusRingThemeData {
  classNames: Accessor<FocusRingClassNames | undefined>;
}

const FocusRingThemeContext = createContext<FocusRingThemeData>({
  classNames: () => undefined,
});

const useFocusRingTheme = () => useContext(FocusRingThemeContext);

export type FocusRingThemeProps = {
  classNames: FocusRingClassNames;
};

export const FocusRingTheme: ParentComponent<FocusRingThemeProps> = (props) => {
  return (
    <FocusRingThemeContext.Provider
      value={{
        classNames: () => props.classNames,
      }}
      children={props.children}
    />
  );
};
