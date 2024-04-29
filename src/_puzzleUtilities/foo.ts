// can be used for answers and game state
type Puzzle = boolean[][];

const getCell = (puzzle: Puzzle, x: number, y: number) => {
    return puzzle[y][x];
};

const getRow = function*(puzzle: Puzzle, rowIndex: number): Generator<boolean> {
    for (let i = 0; i < puzzle.length; i++) {
        yield puzzle[rowIndex][i];
    }
};

const getColumn = function*(puzzle: Puzzle, columnIndex: number): Generator<boolean> {
    for (let i = 0; i < puzzle.length; i++) {
        yield puzzle[i][columnIndex];
    }
};

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
}

const calculateRowLabel = (puzzle: Puzzle, rowIndex: number): number[] => {
    return countAdjacent(getRow(puzzle, rowIndex));
};

const calculateColumnLabel = (puzzle: Puzzle, columnIndex: number): number[] => {
    return countAdjacent(getColumn(puzzle, columnIndex));
};

// TODO
