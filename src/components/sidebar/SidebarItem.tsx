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
        <li className={`cursor-pointer flex justify-start md:justify-center lg:justify-start pl-12 md:pl-0 lg:pl-12 gap-3 md:gap-2 h-12 items-center ${className} ${isActive ? 'active' : ''}` } onClick={handleClick}>
            <Icon className="lg:text-[24px] text-[25px]" />
            <p className="text-[15px] items-center flex md:hidden lg:flex font-semibold">{text}</p>
        </li>
    );
}
