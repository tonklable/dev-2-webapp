var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// As defined on the list of supported events: https://reactjs.org/docs/events.html
export var clipboardEvents = ['onCopy', 'onCut', 'onPaste'];
export var compositionEvents = [
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',
];
export var keyboardEvents = ['onKeyDown', 'onKeyPress', 'onKeyUp'];
export var focusEvents = ['onFocus', 'onBlur'];
export var formEvents = ['onChange', 'onInput', 'onInvalid', 'onReset', 'onSubmit'];
export var genericEvents = ['onError', 'onLoad'];
export var mouseEvents = [
    'onClick',
    'onContextMenu',
    'onDoubleClick',
    'onDrag',
    'onDragEnd',
    'onDragEnter',
    'onDragExit',
    'onDragLeave',
    'onDragOver',
    'onDragStart',
    'onDrop',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'onMouseOut',
    'onMouseOver',
    'onMouseUp',
];
export var pointerEvents = [
    'onPointerDown',
    'onPointerMove',
    'onPointerUp',
    'onPointerCancel',
    'onGotPointerCapture',
    'onLostPointerCapture',
    'onPointerEnter',
    'onPointerLeave',
    'onPointerOver',
    'onPointerOut',
];
export var selectionEvents = ['onSelect'];
export var touchEvents = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];
export var uiEvents = ['onScroll'];
export var wheelEvents = ['onWheel'];
export var mediaEvents = [
    'onAbort',
    'onCanPlay',
    'onCanPlayThrough',
    'onDurationChange',
    'onEmptied',
    'onEncrypted',
    'onEnded',
    'onError',
    'onLoadedData',
    'onLoadedMetadata',
    'onLoadStart',
    'onPause',
    'onPlay',
    'onPlaying',
    'onProgress',
    'onRateChange',
    'onSeeked',
    'onSeeking',
    'onStalled',
    'onSuspend',
    'onTimeUpdate',
    'onVolumeChange',
    'onWaiting',
];
export var imageEvents = ['onLoad', 'onError'];
export var animationEvents = [
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
];
export var transitionEvents = ['onTransitionEnd'];
export var otherEvents = ['onToggle'];
export var allEvents = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], clipboardEvents, true), compositionEvents, true), keyboardEvents, true), focusEvents, true), formEvents, true), genericEvents, true), mouseEvents, true), pointerEvents, true), selectionEvents, true), touchEvents, true), uiEvents, true), wheelEvents, true), mediaEvents, true), imageEvents, true), animationEvents, true), transitionEvents, true), otherEvents, true);
/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {Function=} getArgs A function that returns argument(s) on-event callbacks
 *   shall be curried with.
 */
export default function makeEventProps(props, getArgs) {
    var eventProps = {};
    allEvents.forEach(function (eventName) {
        var eventHandler = props[eventName];
        if (!eventHandler) {
            return;
        }
        if (!getArgs) {
            eventProps[eventName] = eventHandler;
            return;
        }
        eventProps[eventName] = function (event) { return eventHandler(event, getArgs(eventName)); };
    });
    return eventProps;
}
