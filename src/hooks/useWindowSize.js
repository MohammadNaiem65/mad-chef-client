import { useCallback, useEffect, useState } from 'react';
import { debounce } from '../helpers';

/**
 * useWindowSize
 *
 * A custom React hook that returns the current window size.
 *
 * @returns {{width: number | undefined, height: number | undefined}}
 */
export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    const handleResize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {
        // Handler to call on window resize
        const debouncedHandleResize = debounce(handleResize, 250);

        // Add event listener
        window.addEventListener('resize', debouncedHandleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () =>
            window.removeEventListener('resize', debouncedHandleResize);
    }, [handleResize]);

    return windowSize;
}
