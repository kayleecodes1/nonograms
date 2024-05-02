import styled, { css, keyframes } from 'styled-components';
import { Orientation } from '@constants/index';

export const Root = styled.svg({
    shapeRendering: 'crispEdges',
    vectorEffect: 'non-scaling-stroke',
});

export const Cell = styled.rect<{
    isFilled: boolean;
}>(({ isFilled }) => ({
    fill: isFilled ? '#344861' : '#FFF',
    stroke: isFilled ? '#18283F' : '#BDC6D5',
    strokeWidth: 2,
    strokeLinecap: 'square',
}));

export const SectionLine = styled.line({
    stroke: '#000',
    strokeLinecap: 'square',
});

const completeAnimation = (orientation: Orientation) =>
    keyframes({
        '0%': {
            transform: `${orientation === Orientation.Horizontal ? 'scaleX' : 'scaleY'}(0)`,
            opacity: 1,
        },
        '100%': {
            transform: `${orientation === Orientation.Horizontal ? 'scaleX' : 'scaleY'}(3)`,
            opacity: 0,
        },
    });

export const LineComplete = styled.rect<{ orientation: Orientation }>(
    ({ orientation }) => ({
        transform: orientation === Orientation.Horizontal ? 'scaleX(1)' : 'scaleY(1)',
        opacity: 1,
    }),
    css`
        animation: ${({ orientation }) => completeAnimation(orientation)} 0.8s forwards;
    `,
);
