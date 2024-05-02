Task List

FEATURES

[ ] Add mobile vs. desktop UI / ensure touch is handled correctly

REFACTOR

[ ] Refactor label calculation to abstract forward backward logic
[ ] Implement cell component
[ ] Separate Grid component and InteractiveGrid logic ?? maybe

BUGS

// consider integrating individual components with GameState / MobX more tightly
//  but can still maintain display components, like Grid



[X] Rename @stores to @models
[X] UI for Label solved state
[X] Add event system to Puzzle to handle sound effects and visual effects
[X] Cancel drag on error (use event listener)
[X] Add support for arbitrary dimensions
[X] Move solving / guessing logic into Puzzle (from GameState)
[X] Move UI audio logic to GameState
[X] Fix drag error when starting drag on a non-empty cell
[X] Change entire label container state if full row/column is solved
[X] Add animation for row/column complete
[X] Fix linting errors
[X] Fix console errors (mostly attribute names and React keys)
[X] Refactor Cell to distinguish between guess and display state
[ ] Refactor PuzzleContainer to use child slots
[ ] Change global styles to use Styled Components, and implement Theme


// how to ensure naming doesn't conflict between models and components?
