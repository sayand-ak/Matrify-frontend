import { IconType } from 'react-icons';

export interface SidebarItemProps {
    icon: IconType;
    text: string;
    className?: string;
    onClick?: () => void;
    selected: boolean;
}

export interface SidebarProps {
    role: string
    items: {
        name: string;
        icon: IconType;
    }[];
    onClickItem: (itemName: string) => void;
}