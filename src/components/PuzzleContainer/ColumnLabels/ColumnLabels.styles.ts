import styled from 'styled-components';
import { PuzzleContainerTemplateArea } from '../PuzzleContainer.styles';

export const Root = styled.div({
    gridArea: PuzzleContainerTemplateArea.ColumnLabels,
    display: 'grid',
    gridAutoFlow: 'column',
    width: '100%',
    height: '100%',
});
