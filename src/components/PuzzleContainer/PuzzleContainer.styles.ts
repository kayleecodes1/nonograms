import styled from 'styled-components';

const LABEL_SIZE = 80;

type Orientation = 'horizontal' | 'vertical';

export const Root = styled.div({
    display: 'grid',
    gridTemplateColumns: `${LABEL_SIZE}px auto`,
    gridTemplateRows: `${LABEL_SIZE}px auto`,
    gridTemplateAreas: '". column-labels" "row-labels main"',
    gridGap: 4,
});

export const RowLabels = styled.div<{ size: number }>(({ size }) => ({
    gridArea: 'row-labels',
    display: 'grid',
    gridTemplateRows: `repeat(${size}, 1fr)`,
    height: '100%',
}));

export const ColumnLabels = styled.div<{ size: number }>(({ size }) => ({
    gridArea: 'column-labels',
    display: 'grid',
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    height: '100%',
}));

export const Main = styled.div({
    gridArea: 'main',
    display: 'flex',
});

export const Label = styled.div<{
    orientation: Orientation;
}>(({ orientation }) => ({
    boxSizing: 'border-box',
    fontFamily: '"Roboto Mono", monospace',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: 1,
    letterSpacing: '-1px',
    color: '#292059',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    textRendering: 'optimizeLegibility',
    background: '#EAEEF9',
    borderRadius: 2,
    border: '1px solid #DDE4EA',
    overflow: 'hidden',
    ...(orientation === 'horizontal'
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

export const LabelInner = styled.div<{
    orientation: Orientation;
}>(({ orientation }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    boxSizing: 'border-box',
    ...(orientation === 'horizontal'
        ? {
              flexFlow: 'row nowrap',
              gap: 4,
              minWidth: '100%',
              height: '100%'
          }
        : {
              flexFlow: 'column nowrap',
              gap: 2,
              width: '100%',
              minHeight: '100%'
          }),
}));
