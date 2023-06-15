import { customizedNavigate } from "../components/GlobalHistory";
import confetti from "canvas-confetti";

const requestAnimationFrame: Function =
    (window as any).requestAnimationFrame.bind(window) ||
    (window as any).webkitRequestAnimationFrame.bind(window) ||
    (window as any).mozRequestAnimationFrame.bind(window) ||
    (window as any).oRequestAnimationFrame.bind(window) ||
    (window as any).msRequestAnimationFrame.bind(window) ||
    function (callback: FrameRequestCallback) {
        return window.setTimeout(callback, 1000 / 60);
    };

const navigateToLogin = () => {
    localStorage.clear();
    customizedNavigate("/login");
};

// const hashPassword = (password: string) => {
//     try {
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(password, salt);
//         return hashedPassword;
//     } catch (error) {
//         console.log("Error hashing password", error);
//         return false;
//     }
// };

const runConfetti = () => {
    const options = {
        particleCount: 250,
        spread: 360,
        ticks: 500,
    };
    confetti({
        particleCount: options.particleCount,
        spread: options.spread,
        origin: { x: 0.2, y: 0.2 },
        ticks: options.ticks,
    });
    confetti({
        particleCount: options.particleCount,
        spread: options.spread,
        origin: { x: 0.8, y: 0.2 },
        ticks: options.ticks,
    });
    confetti({
        particleCount: options.particleCount,
        spread: options.spread,
        origin: { x: 0.5, y: 0.5 },
        ticks: options.ticks,
    });
    confetti({
        particleCount: options.particleCount,
        spread: options.spread,
        origin: { x: 0.2, y: 0.8 },
        ticks: options.ticks,
    });
    confetti({
        particleCount: options.particleCount,
        spread: options.spread,
        origin: { x: 0.8, y: 0.8 },
        ticks: options.ticks,
    });
};

const trimDataObj = (obj: any) => {
    let newObj = { ...obj };
    for (let key in newObj) {
        if (typeof newObj[key] === 'string') {
            newObj[key] = newObj[key].trim();
        }
    }
    return newObj;
};

export const FunctionUtils = {
    requestAnimationFrame,
    navigateToLogin,
    trimDataObj,
    runConfetti,
};