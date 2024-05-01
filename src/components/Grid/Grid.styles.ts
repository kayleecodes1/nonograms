import styled from 'styled-components';

export const Root = styled.svg({
    shapeRendering: 'crispEdges',
    vectorEffect: 'non-scaling-stroke',
});

export const Cell = styled.rect<{
    isFilled: boolean;
    isCorrect: boolean;
}>(({ isFilled, isCorrect }) => ({
    fill: isFilled ? (isCorrect ? '#344861' : '#F65C5C') : '#FFF',
    stroke: isFilled ? (isCorrect ? '#18283F' : '#BA474A') : '#BDC6D5',
    strokeWidth: 2,
    strokeLinecap: 'square',
}));

export const SectionLine = styled.line({
    stroke: '#000',
    strokeLinecap: 'square',
});
