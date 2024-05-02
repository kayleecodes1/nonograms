import React from 'react';
import Label from '@components/PuzzleContainer/Label';
import { Orientation } from '@constants/index';
import { Root } from './ColumnLabels.styles';

const ColumnLabels: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Root>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child) || child.type !== Label) {
                    return null;
                }
                return React.cloneElement(child, { ...child.props, orientation: Orientation.Vertical });
            })}
        </Root>
    );
};

export default ColumnLabels;
