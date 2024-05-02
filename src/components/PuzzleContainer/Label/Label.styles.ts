import styled from 'styled-components';
import { Orientation } from '@constants/index';

export const Root = styled.div<{
    isSolved: boolean;
    orientation: Orientation;
}>(({ isSolved, orientation, theme }) => ({
    boxSizing: 'border-box',
    fontFamily: theme.typefaces.label,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1,
    letterSpacing: '-1px',
    color: '#292059',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    background: isSolved ? '#FFF' : '#EAEEF9',
    borderRadius: 2,
    border: '1px solid #DDE4EA',
    overflow: 'hidden',
    ...(orientation === Orientation.Horizontal
        ? {
              width: '100%',
              maxWidth: '100%',
              paddingRight: 4,
              margin: '1px 0',
          }
        : {
              height: '100%',
              maxHeight: '100%',
              paddingBottom: 4,
              margin: '0 1px',
          }),
}));

export const List = styled.div<{
    orientation: Orientation;
}>(({ orientation }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    boxSizing: 'border-box',
    ...(orientation === Orientation.Horizontal
        ? {
              flexFlow: 'row nowrap',
              gap: 4,
              minWidth: '100%',
              height: '100%',
          }
        : {
              flexFlow: 'column nowrap',
              gap: 2,
              width: '100%',
              minHeight: '100%',
          }),
}));

export const Item = styled.div<{ isSolved: boolean }>(({ isSolved }) => ({
    opacity: isSolved ? 0.5 : 1,
}));
