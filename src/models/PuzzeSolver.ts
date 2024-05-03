import Puzzle from '@models/Puzzle';
// TODO eventually use PuzzeSolver to notify user that a move they made was a guess and not guaranteed

class PuzzleSolver {
    private _puzzle: Puzzle;

    constructor(puzzle: Puzzle) {
        this._puzzle = puzzle;
    }

    public step(): void {
        // TODO
    }

    private *Foo(): Generator<void> {
        while (!this._puzzle.IsSolved) {
            // Rows
            for (let x = 0; x < this._puzzle.Height; x++) {
                // TODO
            }
            // Columns
            for (let y = 0; y < this._puzzle.Width; y++) {
                // TODO
            }
            // TODO if we went over the whole puzzle and didn't find any, it's not solvable
        }
        yield;
    }
}

export default PuzzleSolver;
