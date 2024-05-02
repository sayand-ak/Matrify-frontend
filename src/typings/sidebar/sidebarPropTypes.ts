import { IconType } from 'react-icons';

export interface SidebarItemProps {
    icon: IconType;
    text: string;
    className?: string;
    onClick?: () => void;
    selected: boolean;
}
