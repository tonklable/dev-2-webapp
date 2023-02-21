"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allEvents = exports.otherEvents = exports.transitionEvents = exports.animationEvents = exports.imageEvents = exports.mediaEvents = exports.wheelEvents = exports.uiEvents = exports.touchEvents = exports.selectionEvents = exports.pointerEvents = exports.mouseEvents = exports.genericEvents = exports.formEvents = exports.focusEvents = exports.keyboardEvents = exports.compositionEvents = exports.clipboardEvents = void 0;
// As defined on the list of supported events: https://reactjs.org/docs/events.html
exports.clipboardEvents = ['onCopy', 'onCut', 'onPaste'];
exports.compositionEvents = [
    'onCompositionEnd',
    'onCompositionStart',
    'onCompositionUpdate',
];
exports.keyboardEvents = ['onKeyDown', 'onKeyPress', 'onKeyUp'];
exports.focusEvents = ['onFocus', 'onBlur'];
exports.formEvents = ['onChange', 'onInput', 'onInvalid', 'onReset', 'onSubmit'];
exports.genericEvents = ['onError', 'onLoad'];
exports.mouseEvents = [
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
exports.pointerEvents = [
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
exports.selectionEvents = ['onSelect'];
exports.touchEvents = ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'];
exports.uiEvents = ['onScroll'];
exports.wheelEvents = ['onWheel'];
exports.mediaEvents = [
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
exports.imageEvents = ['onLoad', 'onError'];
exports.animationEvents = [
    'onAnimationStart',
    'onAnimationEnd',
    'onAnimationIteration',
];
exports.transitionEvents = ['onTransitionEnd'];
exports.otherEvents = ['onToggle'];
exports.allEvents = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], exports.clipboardEvents, true), exports.compositionEvents, true), exports.keyboardEvents, true), exports.focusEvents, true), exports.formEvents, true), exports.genericEvents, true), exports.mouseEvents, true), exports.pointerEvents, true), exports.selectionEvents, true), exports.touchEvents, true), exports.uiEvents, true), exports.wheelEvents, true), exports.mediaEvents, true), exports.imageEvents, true), exports.animationEvents, true), exports.transitionEvents, true), exports.otherEvents, true);
/**
 * Returns an object with on-event callback props curried with provided args.
 * @param {Object} props Props passed to a component.
 * @param {Function=} getArgs A function that returns argument(s) on-event callbacks
 *   shall be curried with.
 */
function makeEventProps(props, getArgs) {
    var eventProps = {};
    exports.allEvents.forEach(function (eventName) {
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
exports.default = makeEventProps;
