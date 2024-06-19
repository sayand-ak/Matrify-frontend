import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { useState, useEffect } from "react";
import { userProfile } from "../../../services/userAPI";
import { UserData } from "../../../typings/user/userTypes";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

export function LikedUsers() {
    const curUser = useAppSelector(state => state.user.user);
    const [likedUserData, setLikedUserData] = useState<UserData[]>([]);
    
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        async function likedUserData() {
           if (curUser?.likedProfiles && curUser?.likedProfiles.length > 0) {
                curUser.likedProfiles.map(async (user) => {
                    const userData = await dispatch(userProfile(user));
                    if(userData.payload.data){
                        setLikedUserData(prev => [...prev, userData.payload.data[0]]);
                    }
                });
           }
        }

        likedUserData();
    }, []);

    console.log(likedUserData);
    

    function navigateToUserProfile(userId: string) {
        window.location.href = `/profile/${userId}`
    }

    return (
        <div className="w-full">
            {likedUserData.length > 0 ? (
                <div className="w-full flex flex-col items-center justify-center pt-10">
                    {likedUserData.map((user) => (
                        <div 
                            key={user._id} className="flex items-center justify-between gap-10 p-2 border-b px-14 w-3/4 hover:bg-gray-200"
                            onClick={() => navigateToUserProfile(user._id)}
                        >
                           <div className="flex gap-5 items-center">
                                <div 
                                    className="h-16 w-16 rounded-full overflow-hidden mb-2"
                                    style={{backgroundImage: `url(${user.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                                ></div>

                                <div>
                                    <h1 className="text-[16px] font-semibold">{user.username}</h1>
                                </div>
                           </div>

                            <MdOutlineRemoveCircleOutline className="text-red-500 text-[24px]" /> {/* Block icon at the end */}
                        </div>
                    ))}
                </div>
            ) : (
                <div 
                    className="h-full w-full opacity-60 text-[30px] font-gillroy flex justify-center items-end font-semibold text-[#a18356]"
                    style={{backgroundImage: "url('/src/assets/images/28530.jpg')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
                >
                    No Likes yet
                </div>
            )}
        </div>
    );
}
