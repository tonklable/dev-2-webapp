export declare const clipboardEvents: readonly ["onCopy", "onCut", "onPaste"];
export declare const compositionEvents: readonly ["onCompositionEnd", "onCompositionStart", "onCompositionUpdate"];
export declare const keyboardEvents: readonly ["onKeyDown", "onKeyPress", "onKeyUp"];
export declare const focusEvents: readonly ["onFocus", "onBlur"];
export declare const formEvents: readonly ["onChange", "onInput", "onInvalid", "onReset", "onSubmit"];
export declare const genericEvents: readonly ["onError", "onLoad"];
export declare const mouseEvents: readonly ["onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp"];
export declare const pointerEvents: readonly ["onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onGotPointerCapture", "onLostPointerCapture", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut"];
export declare const selectionEvents: readonly ["onSelect"];
export declare const touchEvents: readonly ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
export declare const uiEvents: readonly ["onScroll"];
export declare const wheelEvents: readonly ["onWheel"];
export declare const mediaEvents: readonly ["onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting"];
export declare const imageEvents: readonly ["onLoad", "onError"];
export declare const animationEvents: readonly ["onAnimationStart", "onAnimationEnd", "onAnimationIteration"];
export declare const transitionEvents: readonly ["onTransitionEnd"];
export declare const otherEvents: readonly ["onToggle"];
export declare const allEvents: readonly ["onCopy", "onCut", "onPaste", "onCompositionEnd", "onCompositionStart", "onCompositionUpdate", "onKeyDown", "onKeyPress", "onKeyUp", "onFocus", "onBlur", "onChange", "onInput", "onInvalid", "onReset", "onSubmit", "onError", "onLoad", "onClick", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onPointerDown", "onPointerMove", "onPointerUp", "onPointerCancel", "onGotPointerCapture", "onLostPointerCapture", "onPointerEnter", "onPointerLeave", "onPointerOver", "onPointerOut", "onSelect", "onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart", "onScroll", "onWheel", "onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting", "onLoad", "onError", "onAnimationStart", "onAnimationEnd", "onAnimationIteration", "onTransitionEnd", "onToggle"];
type AllEvents = typeof allEvents[number];
type EventHandler = (event: unknown, ...args: unknown[]) => void;
type Props = Record<string, unknown> & {
    [K in AllEvents]?: EventHandler;
};
type EventProps<T> = {
    [K in keyof T as K extends AllEvents ? K : never]: T[K];
};
/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {Function=} getArgs A function that returns argument(s) on-event callbacks
 *   shall be curried with.
 */
export default function makeEventProps<T extends Props, U>(props: T, getArgs?: (eventName: string) => U): EventProps<T>;
export {};
