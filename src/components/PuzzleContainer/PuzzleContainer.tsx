import FitText from '@components/FitText';
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
    columnLabels: number[][];
    rowLabels: number[][];
}

const TEST_COUNT = 7;

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
                                {label.map((n) => (
                                    <div>{n}</div>
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
                                {label.map((n) => (
                                    <div>{n}</div>
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
