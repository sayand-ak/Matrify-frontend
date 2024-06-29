import { IconType } from 'react-icons';

export interface SidebarItemProps {
    icon: IconType;
    text: string;
    className?: string;
    onClick?: () => void;
    selected: boolean;
    notification?: boolean; 
    notificationCount?: number
}

export interface SidebarProps {
    role: string
    items: {
        name: string;
        icon: IconType;
        notificationCount?: number
    }[];
    onClickItem: (itemName: string) => void;
}