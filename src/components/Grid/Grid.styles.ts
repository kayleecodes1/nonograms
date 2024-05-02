import styled, { css, keyframes } from 'styled-components';

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

const completeAnimation = (orientation: 'horizontal' | 'vertical') =>
    keyframes({
        '0%': {
            transform: `${orientation === 'horizontal' ? 'scaleX' : 'scaleY'}(0)`,
            opacity: 1,
        },
        '100%': {
            transform: `${orientation === 'horizontal' ? 'scaleX' : 'scaleY'}(3)`,
            opacity: 0,
        },
    });

export const LineComplete = styled.rect<{ orientation: 'horizontal' | 'vertical' }>(
    ({ orientation }) => ({
        transform: orientation === 'horizontal' ? 'scaleX(1)' : 'scaleY(1)',
        opacity: 1,
    }),
    css`
        animation: ${({ orientation }) => completeAnimation(orientation)} 0.8s forwards;
    `,
);
