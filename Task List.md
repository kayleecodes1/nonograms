Task List

FEATURES

[ ] Add mobile vs. desktop UI / ensure touch is handled correctly

REFACTOR

[ ] Refactor PuzzleContainer to use child slots
[ ] Refactor label calculation to abstract forward backward logic
[ ] Implement cell component
[ ] Separate Grid component and InteractiveGrid logic ?? maybe

BUGS

[ ] Refactor Cell to distinguish between guess and display state
        currently shows red guess, but should be red solution
        also prevents IsCorrect from working correctly, even if its error it should be correct with current rules
        don't forget to consider label calculation, which uses IsCorrect
[ ] Fix console errors (mostly attribute names and React keys)
...

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

// how to ensure naming doesn't conflict between models and components?