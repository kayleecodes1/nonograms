import FitText from '@components/FitText';
import Puzzle from '@models/Puzzle';
import { Root, RowLabels, ColumnLabels, Main, LabelContainer, Label, LabelItem } from './PuzzleContainer.styles';

interface PuzzleContainerProps {
    children?: React.ReactNode;
    columnLabels: Puzzle.Label[];
    rowLabels: Puzzle.Label[];
}

const PuzzleContainer: React.FC<PuzzleContainerProps> = ({ children, columnLabels, rowLabels }) => {
    return (
        <Root>
            <RowLabels size={rowLabels.length}>
                {rowLabels.map((label) => (
                    <LabelContainer isSolved={label.every(({ isSolved }) => isSolved)} orientation="horizontal">
                        <FitText maxFontSize={12}>
                            <Label orientation="horizontal">
                                {label.map(({ count, isSolved }) => (
                                    <LabelItem isSolved={isSolved}>{count}</LabelItem>
                                ))}
                            </Label>
                        </FitText>
                    </LabelContainer>
                ))}
            </RowLabels>
            <ColumnLabels size={columnLabels.length}>
                {columnLabels.map((label) => (
                    <LabelContainer isSolved={label.every(({ isSolved }) => isSolved)} orientation="vertical">
                        <FitText maxFontSize={12}>
                            <Label orientation="vertical">
                                {label.map(({ count, isSolved }) => (
                                    <LabelItem isSolved={isSolved}>{count}</LabelItem>
                                ))}
                            </Label>
                        </FitText>
                    </LabelContainer>
                ))}
            </ColumnLabels>
            <Main>{children}</Main>
        </Root>
    );
};

export default PuzzleContainer;
