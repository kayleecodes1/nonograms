import countAdjacent from '@utilities/countAdjacent';

// can be used for answers and game state
type Puzzle = boolean[][];

const getCell = (puzzle: Puzzle, x: number, y: number) => {
    return puzzle[y][x];
};

const getRow = function* (
    puzzle: Puzzle,
    rowIndex: number
): Generator<boolean> {
    for (let i = 0; i < puzzle.length; i++) {
        yield puzzle[rowIndex][i];
    }
};

const getRows = function* (puzzle: Puzzle): Generator<Generator<boolean>> {
    for (let i = 0; i < puzzle.length; i++) {
        yield getRow(puzzle, i);
    }
};

const getColumn = function* (
    puzzle: Puzzle,
    columnIndex: number
): Generator<boolean> {
    for (let i = 0; i < puzzle.length; i++) {
        yield puzzle[i][columnIndex];
    }
};

const getColumns = function* (puzzle: Puzzle): Generator<Generator<boolean>> {
    for (let i = 0; i < puzzle.length; i++) {
        yield getColumn(puzzle, i);
    }
};

const calculateRowLabel = (puzzle: Puzzle, rowIndex: number): number[] => {
    return countAdjacent(getRow(puzzle, rowIndex));
};

export const calculateRowLabels = (puzzle: Puzzle) => {
    return Array.from(getRows(puzzle)).map(countAdjacent);
};

const calculateColumnLabel = (
    puzzle: Puzzle,
    columnIndex: number
): number[] => {
    return countAdjacent(getColumn(puzzle, columnIndex));
};

export const calculateColumnLabels = (puzzle: Puzzle) => {
    return Array.from(getColumns(puzzle)).map(countAdjacent);
};
