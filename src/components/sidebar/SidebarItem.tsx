import { useState, useEffect } from 'react';
import { SidebarItemProps } from '../../typings/sidebar/sidebarPropTypes';
import "./Sidebar.css"

export function SidebarItem ({ icon: Icon, text, className = '', onClick, selected }:SidebarItemProps) {
    
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        setIsActive(selected);
    }, [selected]);

    const handleClick = () => {
        setIsActive(!isActive);
        if (onClick) {
            onClick();
        }
    };

    return (
        <li className={`cursor-pointer flex md:gap-2 md:pl-10 ${className} ${isActive ? 'active' : ''}` } onClick={handleClick}>
            <Icon className="md:text-[20px] text-[40px]" />
            <p className="text-[15px] hidden md:block">{text}</p>
        </li>
    );
}
