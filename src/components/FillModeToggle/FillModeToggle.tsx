import { FillIcon, FlagIcon } from '../icons';
import toggleWav from '@assets/audio/toggle.wav';
import { FillMode } from '@models/GameState';
import { ToggleContainer, ToggleButton } from './FillModeToggle.styles';

interface FillModeToggleProps {
    fillMode: FillMode;
    onToggle: () => void;
}

const toggleAudio = new Audio(toggleWav);

const FillModeToggle: React.FC<FillModeToggleProps> = ({ fillMode, onToggle }) => {
    const handleToggle = () => {
        onToggle();
        toggleAudio.currentTime = 0;
        toggleAudio.play();
    };

    return (
        <ToggleContainer onClick={handleToggle}>
            <ToggleButton active={fillMode === FillMode.Fill}>
                <FillIcon />
            </ToggleButton>
            <ToggleButton active={fillMode === FillMode.Flag}>
                <FlagIcon />
            </ToggleButton>
        </ToggleContainer>
    );
};

export default FillModeToggle;
