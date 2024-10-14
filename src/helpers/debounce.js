/**
 * debounce
 *
 * A utility function to debounce a function call.
 *
 * @param {function} fn The function to debounce.
 * @param {number} ms The number of milliseconds to debounce.
 * @returns {function}
 */
export default function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}
