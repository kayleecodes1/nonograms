import styled from 'styled-components';
import { PuzzleContainerTemplateArea } from '../PuzzleContainer.styles';

export const Root = styled.div({
    gridArea: PuzzleContainerTemplateArea.RowLabels,
    display: 'grid',
    gridAutoFlow: 'row',
    gridAutoRows: '1fr',
    width: '100%',
    height: '100%',
});
