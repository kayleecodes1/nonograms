import styled from 'styled-components';

const LABEL_SIZE = 80;

export enum PuzzleContainerTemplateArea {
    RowLabels = 'row-labels',
    ColumnLabels = 'column-labels',
    Main = 'main',
}

export const Root = styled.div({
    display: 'grid',
    gridTemplateColumns: `${LABEL_SIZE}px auto`,
    gridTemplateRows: `${LABEL_SIZE}px auto`,
    gridTemplateAreas: `". ${PuzzleContainerTemplateArea.ColumnLabels}" "${PuzzleContainerTemplateArea.RowLabels} ${PuzzleContainerTemplateArea.Main}"`,
    gridGap: 4,
});
