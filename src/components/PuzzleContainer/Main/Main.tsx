import React from 'react';
import { Root } from './Main.styles';

const ColumnLabels: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <Root>{children}</Root>;
};

export default ColumnLabels;
