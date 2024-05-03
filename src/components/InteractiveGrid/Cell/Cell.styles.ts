import styled from 'styled-components';

export const CELL_SIZE = 48;

export const Background = styled.rect<{
    isFilled: boolean;
}>(({ isFilled }) => ({
    fill: isFilled ? '#344861' : '#FFF',
    stroke: isFilled ? '#18283F' : '#BDC6D5',
    strokeWidth: 2,
    strokeLinecap: 'square',
}));
