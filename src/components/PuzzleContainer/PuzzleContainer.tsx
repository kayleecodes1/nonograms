import React from 'react';
import ColumnLabels from './ColumnLabels';
import Label from './Label';
import Main from './Main';
import RowLabels from './RowLabels';
import { Root } from './PuzzleContainer.styles';

interface PuzzleContainerProps {
    children?: React.ReactNode;
}

interface PuzzleContainerChildComponents {
    ColumnLabels: typeof ColumnLabels;
    Label: typeof Label;
    Main: typeof Main;
    RowLabels: typeof RowLabels;
}

const PuzzleContainer: React.FC<PuzzleContainerProps> & PuzzleContainerChildComponents = ({ children }) => {
    let rowLabels: React.ReactElement | null = null;
    let columnLabels: React.ReactElement | null = null;
    let main: React.ReactElement | null = null;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
            return;
        }
        switch (child.type) {
            case RowLabels:
                rowLabels = rowLabels || child;
                break;
            case ColumnLabels:
                columnLabels = columnLabels || child;
                break;
            case Main:
                main = main || child;
                break;
        }
    });

    return (
        <Root>
            {rowLabels}
            {columnLabels}
            {main}
        </Root>
    );
};

PuzzleContainer.ColumnLabels = ColumnLabels;
PuzzleContainer.Label = Label;
PuzzleContainer.Main = Main;
PuzzleContainer.RowLabels = RowLabels;

export default PuzzleContainer;
