import puzzle1 from './puzzle1.json';
import puzzle2 from './puzzle2.json';

const readPuzzle = (data: string[]): boolean[][] => {
    return data.map((s) => s.split('').map((c) => Boolean(parseInt(c))));
};

const puzzles = [puzzle1, puzzle2].map(({ data }) => readPuzzle(data));

export default puzzles;
