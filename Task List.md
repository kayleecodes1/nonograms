Task List

FEATURES

[ ] Add mobile vs. desktop UI / ensure touch is handled correctly

REFACTOR

cancelDrag
animateLineComplete

[ ] Refactor label calculation to abstract forward backward logic

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
[X] Refactor PuzzleContainer to use child slots
[X] Change global styles to use Styled Components, and implement Theme
[X] Add puzzle complete event and audio
[X] Implement Cell component
[X] Refactor Grid component to focus solely on UI and interaction
[ ] Move App to components folder
[ ] Fix ref/child component typing on InteractiveGrid


// how to ensure naming doesn't conflict between models and components?
