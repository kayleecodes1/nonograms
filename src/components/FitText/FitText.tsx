import { useLayoutEffect, useRef, useState } from 'react';

interface FitTextProps {
    children?: React.ReactElement;
    maxFontSize: number;
}

const FitText: React.FC<FitTextProps> = ({ children, maxFontSize }) => {
    const [fontSize, setFontSize] = useState(maxFontSize);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (wrapperRef.current === null) {
            return;
        }
        const element = wrapperRef.current;
        const initialRect = element.getBoundingClientRect();

        const ruler = element.cloneNode(true) as HTMLElement;
        ruler.style.position = 'fixed';
        ruler.style.top = '0';
        ruler.style.left = 'calc(100vw * 2)';
        ruler.style.width = initialRect.width + 'px';
        ruler.style.height = initialRect.height + 'px';
        document.body.appendChild(ruler);

        let fontSize = maxFontSize;
        while (fontSize > 0) {
            ruler.style.fontSize = `${fontSize}px`;
            if (ruler.scrollWidth > ruler.clientWidth || ruler.scrollHeight > ruler.clientHeight) {
                fontSize--;
                continue;
            }
            break;
        }

        document.body.removeChild(ruler);

        element.style.fontSize = fontSize + 'px';
        setFontSize(fontSize);
    }, [children, maxFontSize]);

    return (
        <div ref={wrapperRef} style={{ width: '100%', height: '100%', fontSize }}>
            {children}
        </div>
    );
};

export default FitText;
