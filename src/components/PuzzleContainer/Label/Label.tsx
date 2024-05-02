import FitText from '@components/FitText';
import type Puzzle from '@models/Puzzle';
import { Root, List, Item } from './Label.styles';

interface LabelProps {
    label: Puzzle.Label;
    /** @private */
    orientation?: Orientation;
}

const Label: React.FC<LabelProps> = ({ label, orientation = Orientation.Horizontal }) => {
    return (
        <Root isSolved={label.every(({ isSolved }) => isSolved)} orientation={orientation}>
            <FitText maxFontSize={12}>
                <List orientation={orientation}>
                    {label.map(({ count, isSolved }, index) => (
                        <Item key={index} isSolved={isSolved}>
                            {count}
                        </Item>
                    ))}
                </List>
            </FitText>
        </Root>
    );
};

export default Label;
