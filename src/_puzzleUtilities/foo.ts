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

const calculateRowGroups = (puzzle: Puzzle, rowIndex: number): number[] => {
    return countAdjacent(getRow(puzzle, rowIndex));
};

const calculateColumnGroups = (
    puzzle: Puzzle,
    columnIndex: number
): number[] => {
    return countAdjacent(getColumn(puzzle, columnIndex));
};




interface Label {
    count: number;
    solved: boolean;
};

const calculateRowLabel = (state: (boolean | null)[], solution: boolean[]): Label[] => {
    const labels = countAdjacent(solution).map((count) => ({
        count,
        solved: false
    }));

    let labelIndex = 0;
    let labelCount = 0;
    let i = 0;
    for (i; i < state.length; i++) {
        if (state[i] === null || state[i] !== solution[i]) {
            break;
        }
        labelCount++;
        if (labelCount === labels[labelIndex].count) {
            labels[labelIndex].solved = true;
            labelIndex++;
            labelCount = 0;
        }
    }

    labelIndex = labels.length - 1;
    labelCount = 0;
    for (let j = state.length - 1; j > i; j--) {
        if (state[j] === null || state[j] !== solution[j]) {
            break;
        }
        labelCount++;
        if (labelCount === labels[labelIndex].count) {
            labels[labelIndex].solved = true;
            labelIndex--;
            labelCount = 0;
        }
    }

    return labels;
};

// use this in GameState and connect to UI
export const _calculateRowLabels = (state: (boolean | null)[], solution: boolean[][]) => {
    return Array.from(getRows(solution)).map(countAdjacent);
};


export const calculateRowLabels = (puzzle: Puzzle) => {
    return Array.from(getRows(puzzle)).map(countAdjacent);
};

export const calculateColumnLabels = (puzzle: Puzzle) => {
    return Array.from(getColumns(puzzle)).map(countAdjacent);
};
