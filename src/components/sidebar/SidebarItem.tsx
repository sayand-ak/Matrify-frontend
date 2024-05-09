import { useState, useEffect } from 'react';
import { SidebarItemProps } from '../../typings/sidebar/sidebarPropTypes';
import "./Sidebar.css"

export function SidebarItem ({ icon: Icon, text, className = '', onClick, selected }:SidebarItemProps) {
    
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        setIsActive(selected);
    }, [selected]);

    const handleClick = () => {
        setIsActive(isActive);
        if (onClick) {
            onClick();
        }
    };

    return (
        <li className={`cursor-pointer pl-4 flex gap-3 md:gap-2 md:pl-10 ${className} ${isActive ? 'active' : ''}` } onClick={handleClick}>
            <Icon className="text-[30px] md:text-[20px]" />
            <p className="text-[15px] flex items-center">{text}</p>
        </li>
    );
}
