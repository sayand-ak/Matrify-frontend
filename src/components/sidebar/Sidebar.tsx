import { SidebarItem } from './SidebarItem';
import "./Sidebar.css";
import { MdOutlineDelete } from 'react-icons/md';
import { IoLogOutOutline } from 'react-icons/io5';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useTypedSelectors';
import { adminLogout } from '../../redux/slices/adminSlices';
import { useNavigate } from 'react-router-dom';
import { SidebarProps } from '../../typings/sidebar/sidebarPropTypes';

export default function Sidebar({ role, items, onClickItem }: SidebarProps) {
    const [selected, setSelected] = useState<string>(items[0].name);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const handleItemClick = async(itemName:string, role: string) => {
        setSelected(itemName === selected ? items[0].name : itemName); 
        onClickItem(itemName); 
        if(itemName === "Logout" && role === "admin"){
            dispatch(adminLogout());
            navigate("/admin/login");
        }
    };

    return (
        <div className={`sidebar block bg-[#fff] min-w-[5rem] md:w-[7rem] lg:w-[24rem] min-h-[100vh] z-0`}>

            {role != "user"  && <div className="heading flex items-center justify-center lg:justify-start lg:pl-7 h-40 gap-2">
                <img src="/src/assets/images/logo.png" className="h-14 w-14 xl:h-20 xl:w-20" alt="" />
                <h1 className="font-custom font-semibold text-[20px] lg:text-[30px] xl:text-[40px] hidden lg:block text-[#b28849]">Matrify</h1>
            </div>}

            <div className="options">
                <ul className={`flex flex-col gap-4 pt-${role === 'user' ? 10 : 0}`}>
                    {items.map((item, index) => (

                        <span key={index}>
                            <SidebarItem
                                icon={item.icon}
                                text={item.name}
                                className={undefined}
                                onClick={() => handleItemClick(item.name, "admin")}
                                selected={selected === item.name}
                            />
                        </span>
                    ))}

                    <li className="lg:px-10">
                        <hr />
                    </li>
                    
                    {role == "admin" &&
                        <SidebarItem
                            icon={MdOutlineDelete}
                            text="Delete Account"
                            className="text-red-700 flex"
                            onClick={() => handleItemClick("Delete Account", "admin")}
                            selected={selected === "Delete Account"} 
                        />
                    }
                    <SidebarItem
                        icon={IoLogOutOutline}
                        text="Logout"
                        className="text-red-700 flex"
                        onClick={() => handleItemClick("Logout", role)}
                        selected={selected === "Logout"} 
                    />
                </ul>
            </div>
        </div>
    );
}
