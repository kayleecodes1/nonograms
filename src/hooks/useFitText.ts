import { useLayoutEffect, useRef, useState } from 'react';

const MAX_FONT_SIZE = 18;

const useFitText = () => {
    const [fontSize, setFontSize] = useState(MAX_FONT_SIZE);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // TODO need to update if child content changes
    useLayoutEffect(() => {
        const handle = requestAnimationFrame(() => {
            if (wrapperRef.current === null) {
                return;
            }
            const element = wrapperRef.current;
            // ruler.style['position'] = 'absolute';
            // ruler.style['top'] = '0';
            // ruler.style['left'] = '0'; // calc(100vw * 2)
            element.style.overflow = 'auto';

            let fontSize = MAX_FONT_SIZE;
            while (true) {
                element.style.fontSize = `${fontSize}px`;
                let { width, height } = element.getBoundingClientRect();
                if (
                    element.scrollWidth > width ||
                    element.scrollHeight > height
                ) {
                    console.log(
                        'height',
                        element.scrollHeight,
                        element.clientHeight,
                        height
                    );
                    fontSize--;
                    continue;
                }
                break;
            }
            // TODO clear font size and set via React
        });
        return () => {
            cancelAnimationFrame(handle);
            // TODO need to clear ruler... if using it
        };
    }, [children]);
};

export default useFitText;
