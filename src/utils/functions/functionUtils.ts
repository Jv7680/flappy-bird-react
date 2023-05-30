const requestAnimationFrame: Function =
    (window as any).requestAnimationFrame.bind(window) ||
    (window as any).webkitRequestAnimationFrame.bind(window) ||
    (window as any).mozRequestAnimationFrame.bind(window) ||
    (window as any).oRequestAnimationFrame.bind(window) ||
    (window as any).msRequestAnimationFrame.bind(window) ||
    function (callback: FrameRequestCallback) {
        return window.setTimeout(callback, 1000 / 60);
    };

export const FunctionUtils = {
    requestAnimationFrame
};