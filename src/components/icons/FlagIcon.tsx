import BaseIcon, { IconProps } from './BaseIcon';

const FillIcon: React.FC<IconProps> = ({ size = 24 }) => (
    <BaseIcon
        path="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        size={size}
    />
);

export default FillIcon;
