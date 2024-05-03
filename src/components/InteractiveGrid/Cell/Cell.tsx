import { CELL_SIZE, Background } from './Cell.styles';

interface CellProps {
    x: number;
    y: number;
    variant: 'empty' | 'filled' | 'flagged' | 'flaggedError';
}

const Cell: React.FC<CellProps> = ({ x, y, variant }) => {
    return (
        <g transform={`translate(${CELL_SIZE * x}, ${CELL_SIZE * y})`} clipPath="url(#cellClip)">
            <Background isFilled={variant === 'filled'} width={CELL_SIZE} height={CELL_SIZE} overflow="hidden" />
            {(variant === 'flagged' || variant === 'flaggedError') && (
                <use
                    href="#flagIcon"
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    fill={variant === 'flagged' ? '#344861' : '#F65C5C'}
                />
            )}
        </g>
    );
};

export default Cell;
