import React from 'react';
import Label from '@components/PuzzleContainer/Label';
import { Orientation } from '@constants/index';
import { Root } from './RowLabels.styles';

const RowLabels: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Root>
            {React.Children.map(children, (child) => {
                if (!React.isValidElement(child) || child.type !== Label) {
                    return null;
                }
                return React.cloneElement(child, { ...child.props, orientation: Orientation.Horizontal });
            })}
        </Root>
    );
};

export default RowLabels;
