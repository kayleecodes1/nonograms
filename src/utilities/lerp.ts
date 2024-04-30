export const lerp = (a: number, b: number, t: number): number => {
    return a + (b - a) * t;
};

export const inverseLerp = (a: number, b: number, c: number): number => {
    return (c - a) / (b - a);
};
