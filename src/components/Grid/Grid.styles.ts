import styled from 'styled-components';
import { CellState } from '@stores/GameState';

export const Root = styled.svg({
    shapeRendering: 'crispEdges',
    vectorEffect: 'non-scaling-stroke',
});

export const Cell = styled.rect<{
    cellState: CellState;
}>(({ cellState }) => ({
    ...{
        [CellState.Empty]: {
            fill: '#FFF',
            stroke: '#BDC6D5',
        },
        [CellState.Filled]: {
            fill: '#344861',
            stroke: '#18283F',
        },
        [CellState.Flagged]: {
            fill: '#FFF',
            stroke: '#BDC6D5',
        },
    }[cellState],
    strokeWidth: 2,
    strokeLinecap: 'square',
}));

export const SectionLine = styled.line({
    stroke: '#000',
    strokeWidth: 4,
    strokeLinecap: 'square',
});
