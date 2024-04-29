interface RangeOptions {
    exclusiveStart?: boolean;
    exclusiveEnd?: boolean;
}

const defaultOptions: RangeOptions = {
    exclusiveStart: false,
    exclusiveEnd: false,
};

const range = function* (start: number, end: number, options?: RangeOptions) {
    const { exclusiveStart, exclusiveEnd } = { ...defaultOptions, ...options };
    for (let delta = exclusiveStart ? 1 : 0; delta <= Math.abs(end - start) - (exclusiveEnd ? 1 : 0); delta++) {
        yield start + Math.sign(end - start) * delta;
    }
};

export default range;
