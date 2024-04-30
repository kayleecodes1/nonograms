const countAdjacent = (iterable: Iterable<boolean>): number[] => {
    const result = [];
    let lastBit = false;
    for (const bit of iterable) {
        if (bit) {
            if (lastBit) {
                result[result.length - 1]++;
            } else {
                result.push(1);
            }
        }
        lastBit = bit;
    }
    return result;
};

export default countAdjacent;
