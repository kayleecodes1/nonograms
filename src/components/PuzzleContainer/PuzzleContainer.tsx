import FitText from '@components/FitText';
import Puzzle from '@models/Puzzle';
import {
    Root,
    RowLabels,
    ColumnLabels,
    Main,
    Label,
    LabelInner,
} from './PuzzleContainer.styles';

interface PuzzleContainerProps {
    children?: React.ReactNode;
    columnLabels: Puzzle.Label[];
    rowLabels: Puzzle.Label[];
}

const PuzzleContainer: React.FC<PuzzleContainerProps> = ({
    children,
    columnLabels,
    rowLabels,
}) => {
    return (
        <Root>
            <RowLabels size={rowLabels.length}>
                {rowLabels.map((label) => (
                    <Label orientation="horizontal">
                        <FitText maxFontSize={12}>
                            <LabelInner orientation="horizontal">
                                {label.map(({ count, solved }) => (
                                    <div>{count}</div>
                                ))}
                            </LabelInner>
                        </FitText>
                    </Label>
                ))}
            </RowLabels>
            <ColumnLabels size={columnLabels.length}>
                {columnLabels.map((label) => (
                    <Label orientation="vertical">
                        <FitText maxFontSize={12}>
                            <LabelInner orientation="vertical">
                                {label.map(({ count, solved }) => (
                                    <div>{count}</div>
                                ))}
                            </LabelInner>
                        </FitText>
                    </Label>
                ))}
            </ColumnLabels>
            <Main>{children}</Main>
        </Root>
    );
};

export default PuzzleContainer;
