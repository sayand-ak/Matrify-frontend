import React from 'react';

interface ProfileTabsProps {
    selectedTab: string;
    handleTabSelect: (tab: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ selectedTab, handleTabSelect }) => {
    return (
        <div className="w-full flex justify-center border-b-[2px]">
            <ul className="flex justify-between font-semibold text-[16px] w-full px-5 md:px-16 py-1">
                <li>
                    <a
                        href="#"
                        className={`${selectedTab === "profile" ? "border-b-[5px] border-[#E8C68F]" : ""} cursor-pointer`}
                        onClick={(e) => handleTabSelect("profile", e)}
                    >
                        About
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className={`${selectedTab === "profession" ? "border-b-[5px] border-[#E8C68F]" : ""} cursor-pointer`}
                        onClick={(e) => handleTabSelect("profession", e)}
                    >
                        Profession
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className={`${selectedTab === "family" ? "border-b-[5px] border-[#E8C68F]" : ""} cursor-pointer`}
                        onClick={(e) => handleTabSelect("family", e)}
                    >
                        Family
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        className={`${selectedTab === "preferences" ? "border-b-[5px] border-[#E8C68F]" : ""} cursor-pointer`}
                        onClick={(e) => handleTabSelect("preferences", e)}
                    >
                        Preferences
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ProfileTabs;
