export interface IconProps {
    size?: number;
}

interface BaseIconProps {
    path: string;
    size?: number;
}

const BaseIcon: React.FC<BaseIconProps> = ({ path, size = 24 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentcolor"
    >
        <path d={path} />
    </svg>
);

export default BaseIcon;
