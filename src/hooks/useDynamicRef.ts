import { type MutableRefObject, useRef, useEffect } from 'react';

const useDynamicRef = <T>(value: T): MutableRefObject<T> => {
    const ref = useRef(value);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref;
};

export default useDynamicRef;
