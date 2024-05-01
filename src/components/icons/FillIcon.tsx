import BaseIcon, { IconProps } from './BaseIcon';

const FillIcon: React.FC<IconProps> = ({ size = 24 }) => <BaseIcon path="M3,3V21H21V3" size={size} />;

export default FillIcon;
