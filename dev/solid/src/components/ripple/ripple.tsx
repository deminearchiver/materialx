import { createEventListenerMap } from "@solid-primitives/event-listener";
import { createMediaQuery } from "@solid-primitives/media";
import { mergeRefs, type Ref } from "@solid-primitives/refs";
import {
  access,
  asArray,
  type FalsyValue,
  type Many,
  type MaybeAccessor,
} from "@solid-primitives/utils";
import clsx from "clsx";
import {
  createEffect,
  createMemo,
  createSignal,
  splitProps,
  type Component,
  type JSX,
} from "solid-js";

const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = "::after";
const ANIMATION_FILL = "forwards";

type State = "inactive" | "touch-delay" | "holding" | "waiting-for-click";

const TOUCH_DELAY_MS = 150;

export type RippleProps = Omit<JSX.HTMLAttributes<HTMLElement>, "children"> & {
  for: MaybeAccessor<Many<HTMLElement | FalsyValue>>;
  disabled?: boolean;
};

export const Ripple: Component<RippleProps> = (props) => {
  const [local, others] = splitProps(props, ["ref", "class", "for"]);
  const forcedColors = createMediaQuery("(forced-colors: active)");

  const targets = createMemo(() => {
    const elements = asArray(access(local.for));
    if (!elements) return [];
    return elements.filter((element) => !!element);
  });

  const enabled = () => targets().length > 0;

  const disabled = () => !enabled();

  const [hovered, setHovered] = createSignal(false);
  const [pressed, setPressed] = createSignal(false);
  let rippleSize = "";
  let rippleScale = "";
  let initialSize = 0;
  let growAnimation: Animation | undefined;
  let state: State = "inactive";
  let rippleStartEvent: PointerEvent | undefined;
  let checkBoundsAfterContextMenu = false;

  let ref!: HTMLDivElement;
  let surfaceRef!: HTMLDivElement;

  const shouldReactToEvent = (event: PointerEvent) => {
    if (disabled() || !event.isPrimary) {
      return false;
    }

    if (rippleStartEvent && rippleStartEvent.pointerId !== event.pointerId) {
      return false;
    }

    if (event.type === "pointerenter" || event.type === "pointerleave") {
      return !isTouch(event);
    }

    const isPrimaryButton = event.buttons === 1;
    return isTouch(event) || isPrimaryButton;
  };

  const inBounds = ({ x, y }: PointerEvent) => {
    const { top, left, bottom, right } = ref.getBoundingClientRect();
    return x >= left && x <= right && y >= top && y <= bottom;
  };

  const isTouch = ({ pointerType }: PointerEvent) => pointerType === "touch";

  const getNormalizedPointerEventCoords = (
    pointerEvent: PointerEvent,
  ): { x: number; y: number } => {
    const { scrollX, scrollY } = window;
    const { left, top } = ref.getBoundingClientRect();
    const documentX = scrollX + left;
    const documentY = scrollY + top;
    const { pageX, pageY } = pointerEvent;
    return { x: pageX - documentX, y: pageY - documentY };
  };

  const determineRippleSize = () => {
    const { height, width } = ref.getBoundingClientRect();
    const maxDim = Math.max(height, width);
    const softEdgeSize = Math.max(
      SOFT_EDGE_CONTAINER_RATIO * maxDim,
      SOFT_EDGE_MINIMUM_SIZE,
    );

    initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
    const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
    const maxRadius = hypotenuse + PADDING;

    rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
    rippleSize = `${initialSize}px`;
  };

  const getTranslationCoordinates = (positionEvent?: PointerEvent) => {
    const { height, width } = ref.getBoundingClientRect();
    // end in the center
    const endPoint = {
      x: (width - initialSize) / 2,
      y: (height - initialSize) / 2,
    };

    let startPoint;
    if (positionEvent instanceof PointerEvent) {
      startPoint = getNormalizedPointerEventCoords(positionEvent);
    } else {
      startPoint = {
        x: width / 2,
        y: height / 2,
      };
    }

    // center around start point
    startPoint = {
      x: startPoint.x - initialSize / 2,
      y: startPoint.y - initialSize / 2,
    };

    return { startPoint, endPoint };
  };

  const startPressAnimation = (positionEvent?: PointerEvent) => {
    setPressed(true);
    growAnimation?.cancel();
    determineRippleSize();
    const { startPoint, endPoint } = getTranslationCoordinates(positionEvent);
    const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
    const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

    growAnimation = surfaceRef.animate(
      {
        top: [0, 0],
        left: [0, 0],
        height: [rippleSize, rippleSize],
        width: [rippleSize, rippleSize],
        transform: [
          `translate(${translateStart}) scale(1)`,
          `translate(${translateEnd}) scale(${rippleScale})`,
        ],
      },
      {
        pseudoElement: PRESS_PSEUDO,
        duration: PRESS_GROW_MS,
        // easing: EASING.STANDARD,
        easing: "cubic-bezier(0.2, 0, 0, 1)",
        fill: ANIMATION_FILL,
      },
    );
  };

  const endPressAnimation = async () => {
    rippleStartEvent = undefined;
    state = "inactive";
    const animation = growAnimation;
    let pressAnimationPlayState = Infinity;
    if (typeof animation?.currentTime === "number") {
      pressAnimationPlayState = animation.currentTime;
    } else if (animation?.currentTime) {
      pressAnimationPlayState = animation.currentTime.to("ms").value;
    }

    if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
      setPressed(false);
      return;
    }

    await new Promise((resolve) => {
      setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
    });

    if (growAnimation !== animation) {
      // A new press animation was started. The old animation was canceled and
      // should not finish the pressed state.
      return;
    }

    setPressed(false);
  };

  const onPointerEnter = (event: PointerEvent) => {
    if (!shouldReactToEvent(event)) return;
    setHovered(true);
  };
  const onPointerLeave = (event: PointerEvent) => {
    if (!shouldReactToEvent(event)) return;
    setHovered(false);
    if (state !== "inactive") {
      endPressAnimation();
    }
  };

  const onPointerUp = (event: PointerEvent) => {
    if (!shouldReactToEvent(event)) {
      return;
    }

    if (state === "holding") {
      state = "waiting-for-click";
      return;
    }

    if (state === "touch-delay") {
      state = "waiting-for-click";
      startPressAnimation(rippleStartEvent);
      return;
    }
  };

  const onPointerDown = async (event: PointerEvent) => {
    if (!shouldReactToEvent(event)) {
      return;
    }

    rippleStartEvent = event;
    if (!isTouch(event)) {
      state = "waiting-for-click";
      startPressAnimation(event);
      return;
    }

    // after a longpress contextmenu event, an extra `pointerdown` can be
    // dispatched to the pressed element. Check that the down is within
    // bounds of the element in this case.
    if (checkBoundsAfterContextMenu && !inBounds(event)) {
      return;
    }

    checkBoundsAfterContextMenu = false;

    // Wait for a hold after touch delay
    state = "touch-delay";
    await new Promise((resolve) => {
      setTimeout(resolve, TOUCH_DELAY_MS);
    });

    if (state !== "touch-delay") {
      return;
    }

    state = "holding";
    startPressAnimation(event);
  };

  const onClick = () => {
    // Click is a MouseEvent in Firefox and Safari, so we cannot use
    // `shouldReactToEvent`
    if (disabled()) {
      return;
    }

    if (state === "waiting-for-click") {
      endPressAnimation();
      return;
    }

    if (state === "inactive") {
      // keyboard synthesized click event
      startPressAnimation();
      endPressAnimation();
    }
  };

  const onPointerCancel = (event: PointerEvent) => {
    if (!shouldReactToEvent(event)) {
      return;
    }

    endPressAnimation();
  };

  const onContextMenu = () => {
    if (disabled()) return;

    checkBoundsAfterContextMenu = true;
    endPressAnimation();
  };

  createEffect(() => {
    if (forcedColors()) {
      return;
    }
    createEventListenerMap(targets(), {
      click: onClick,
      pointerdown: onPointerDown,
      pointerup: onPointerUp,
      pointerenter: onPointerEnter,
      pointerleave: onPointerLeave,
      pointercancel: onPointerCancel,
      contextmenu: onContextMenu,
    });
  });

  return (
    <div
      ref={mergeRefs(
        (element) => (ref = element),
        local.ref as Ref<HTMLDivElement>,
      )}
      class={clsx(local.class)}
      // Needed for VoiceOver, which will create a "group" if the element is a
      // sibling to other content.
      aria-hidden="true"
      {...others}
    >
      <div ref={surfaceRef} class={clsx()} />
    </div>
  );
};

// export const Ripple: Component<RippleProps> = (props) => {
//   const mergedProps = mergeProps({ disabled: false }, props);
//   const [local, others] = splitProps(mergedProps, ["ref", "class", "for"]);

//   const forcedColors = createMediaQuery("(forced-colors: active)");

//   const targets = createMemo(() => {
//     const elements = asArray(access(local.for));
//     if (!elements) return [];
//     return elements.filter((element) => !!element);
//   });

//   const enabled = () => targets().length > 0;

//   const disabled = () => !enabled();

//   const [hovered, setHovered] = createSignal(false);
//   const [pressed, setPressed] = createSignal(false);
//   let rippleSize = "";
//   let rippleScale = "";
//   let initialSize = 0;
//   let growAnimation: Animation | undefined;
//   let state: State = "inactive";
//   let rippleStartEvent: PointerEvent | undefined;
//   let checkBoundsAfterContextMenu = false;

//   let ref!: HTMLDivElement;
//   let surfaceRef!: HTMLDivElement;

//   const shouldReactToEvent = (event: PointerEvent) => {
//     if (disabled() || !event.isPrimary) {
//       return false;
//     }

//     if (rippleStartEvent && rippleStartEvent.pointerId !== event.pointerId) {
//       return false;
//     }

//     if (event.type === "pointerenter" || event.type === "pointerleave") {
//       return !isTouch(event);
//     }

//     const isPrimaryButton = event.buttons === 1;
//     return isTouch(event) || isPrimaryButton;
//   };

//   const inBounds = ({ x, y }: PointerEvent) => {
//     const { top, left, bottom, right } = ref.getBoundingClientRect();
//     return x >= left && x <= right && y >= top && y <= bottom;
//   };

//   const isTouch = ({ pointerType }: PointerEvent) => pointerType === "touch";

//   const getNormalizedPointerEventCoords = (
//     pointerEvent: PointerEvent,
//   ): { x: number; y: number } => {
//     const { scrollX, scrollY } = window;
//     const { left, top } = ref.getBoundingClientRect();
//     const documentX = scrollX + left;
//     const documentY = scrollY + top;
//     const { pageX, pageY } = pointerEvent;
//     return { x: pageX - documentX, y: pageY - documentY };
//   };

//   const determineRippleSize = () => {
//     const { height, width } = ref.getBoundingClientRect();
//     const maxDim = Math.max(height, width);
//     const softEdgeSize = Math.max(
//       SOFT_EDGE_CONTAINER_RATIO * maxDim,
//       SOFT_EDGE_MINIMUM_SIZE,
//     );

//     initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
//     const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
//     const maxRadius = hypotenuse + PADDING;

//     rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
//     rippleSize = `${initialSize}px`;
//   };

//   const getTranslationCoordinates = (positionEvent?: PointerEvent) => {
//     const { height, width } = ref.getBoundingClientRect();
//     // end in the center
//     const endPoint = {
//       x: (width - initialSize) / 2,
//       y: (height - initialSize) / 2,
//     };

//     let startPoint;
//     if (positionEvent instanceof PointerEvent) {
//       startPoint = getNormalizedPointerEventCoords(positionEvent);
//     } else {
//       startPoint = {
//         x: width / 2,
//         y: height / 2,
//       };
//     }

//     // center around start point
//     startPoint = {
//       x: startPoint.x - initialSize / 2,
//       y: startPoint.y - initialSize / 2,
//     };

//     return { startPoint, endPoint };
//   };

//   const startPressAnimation = (positionEvent?: PointerEvent) => {
//     setPressed(true);
//     growAnimation?.cancel();
//     determineRippleSize();
//     const { startPoint, endPoint } = getTranslationCoordinates(positionEvent);
//     const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
//     const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;

//     growAnimation = surfaceRef.animate(
//       {
//         top: [0, 0],
//         left: [0, 0],
//         height: [rippleSize, rippleSize],
//         width: [rippleSize, rippleSize],
//         transform: [
//           `translate(${translateStart}) scale(1)`,
//           `translate(${translateEnd}) scale(${rippleScale})`,
//         ],
//       },
//       {
//         pseudoElement: PRESS_PSEUDO,
//         duration: PRESS_GROW_MS,
//         // easing: EASING.STANDARD,
//         easing: "cubic-bezier(0.2, 0, 0, 1)",
//         fill: ANIMATION_FILL,
//       },
//     );
//   };

//   const endPressAnimation = async () => {
//     rippleStartEvent = undefined;
//     state = "inactive";
//     const animation = growAnimation;
//     let pressAnimationPlayState = Infinity;
//     if (typeof animation?.currentTime === "number") {
//       pressAnimationPlayState = animation.currentTime;
//     } else if (animation?.currentTime) {
//       pressAnimationPlayState = animation.currentTime.to("ms").value;
//     }

//     if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
//       setPressed(false);
//       return;
//     }

//     await new Promise((resolve) => {
//       setTimeout(resolve, MINIMUM_PRESS_MS - pressAnimationPlayState);
//     });

//     if (growAnimation !== animation) {
//       // A new press animation was started. The old animation was canceled and
//       // should not finish the pressed state.
//       return;
//     }

//     setPressed(false);
//   };

//   const onPointerEnter = (event: PointerEvent) => {
//     if (!shouldReactToEvent(event)) return;
//     setHovered(true);
//   };
//   const onPointerLeave = (event: PointerEvent) => {
//     if (!shouldReactToEvent(event)) return;
//     setHovered(false);
//     if (state !== "inactive") {
//       endPressAnimation();
//     }
//   };

//   const onPointerUp = (event: PointerEvent) => {
//     if (!shouldReactToEvent(event)) {
//       return;
//     }

//     if (state === "holding") {
//       state = "waiting-for-click";
//       return;
//     }

//     if (state === "touch-delay") {
//       state = "waiting-for-click";
//       startPressAnimation(rippleStartEvent);
//       return;
//     }
//   };

//   const onPointerDown = async (event: PointerEvent) => {
//     if (!shouldReactToEvent(event)) {
//       return;
//     }

//     rippleStartEvent = event;
//     if (!isTouch(event)) {
//       state = "waiting-for-click";
//       startPressAnimation(event);
//       return;
//     }

//     // after a longpress contextmenu event, an extra `pointerdown` can be
//     // dispatched to the pressed element. Check that the down is within
//     // bounds of the element in this case.
//     if (checkBoundsAfterContextMenu && !inBounds(event)) {
//       return;
//     }

//     checkBoundsAfterContextMenu = false;

//     // Wait for a hold after touch delay
//     state = "touch-delay";
//     await new Promise((resolve) => {
//       setTimeout(resolve, TOUCH_DELAY_MS);
//     });

//     if (state !== "touch-delay") {
//       return;
//     }

//     state = "holding";
//     startPressAnimation(event);
//   };

//   const onClick = () => {
//     // Click is a MouseEvent in Firefox and Safari, so we cannot use
//     // `shouldReactToEvent`
//     if (disabled()) {
//       return;
//     }

//     if (state === "waiting-for-click") {
//       endPressAnimation();
//       return;
//     }

//     if (state === "inactive") {
//       // keyboard synthesized click event
//       startPressAnimation();
//       endPressAnimation();
//     }
//   };

//   const onPointerCancel = (event: PointerEvent) => {
//     if (!shouldReactToEvent(event)) {
//       return;
//     }

//     endPressAnimation();
//   };

//   const onContextMenu = () => {
//     if (disabled()) return;

//     checkBoundsAfterContextMenu = true;
//     endPressAnimation();
//   };

//   createEffect(() => {
//     createEventListenerMap(
//       targets(),
//       forcedColors()
//         ? {}
//         : {
//             click: onClick,
//             pointerdown: onPointerDown,
//             pointerup: onPointerUp,
//             pointerenter: onPointerEnter,
//             pointerleave: onPointerLeave,
//             pointercancel: onPointerCancel,
//             contextmenu: onContextMenu,
//           },
//     );
//   });

//   return (
//     <div
//       ref={mergeRefs((element) => (ref = element), local.ref)}
//       class={clsx(styles.host({ disabled: disabled() }), local.class)}
//       // Needed for VoiceOver, which will create a "group" if the element is a
//       // sibling to other content./
//       aria-hidden="true"
//       {...others}
//     >
//       <div
//         ref={surfaceRef}
//         class={styles.surface({ hovered: hovered(), pressed: pressed() })}
//       />
//     </div>
//   );
// };
