import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { useState, useEffect, useCallback } from "react";
import { likeUser, userProfile } from "../../../services/userAPI";
import { UserData } from "../../../typings/user/userTypes";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

export function LikedUsers() {
    const curUser = useAppSelector(state => state.user.user);
    const [likedUserData, setLikedUserData] = useState<UserData[]>([]);
    const dispatch = useAppDispatch();

    const fetchLikedUserData = useCallback(async() => {
        if (curUser?.likedProfiles && curUser?.likedProfiles.length > 0) {
            curUser.likedProfiles.map(async (user) => {
                const userData = await dispatch(userProfile(user));
                if(userData.payload.data){
                    setLikedUserData(prev => [...prev, userData.payload.data[0]]);
                }
            });
       }
    }, [curUser])

    useEffect(() => {
        fetchLikedUserData();
    }, [fetchLikedUserData]);

    const unlikeUser = async (userId: string) => {
        const res = await dispatch(likeUser(userId));
        if(res.payload.data){
            const user = localStorage.getItem('user');
            if(user) {
                const parsedData = JSON.parse(user);

                if (parsedData) {
                    parsedData.likedProfiles = res.payload.data; 
                }
                
                localStorage.setItem('user', JSON.stringify(parsedData));
            }   
            setLikedUserData(prev => prev.filter(user => user._id !== userId));

        }

    }


    return (
        <div className="w-full max-h-[85vh] overflow-y-scroll no-scrollbar">
            {likedUserData.length > 0 ? (
                <div className="w-full flex flex-col items-center justify-center pt-10">
                    {likedUserData.map((user) => (
                        <div 
                            key={user._id} className="flex items-center justify-between gap-10 p-2 border-b px-14 w-3/4 hover:bg-gray-200"
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

                            <MdOutlineRemoveCircleOutline 
                                className="text-red-500 text-[24px]" 
                                onClick={() => unlikeUser(user._id)}
                            /> {/* Block icon at the end */}
                        </div>
                    ))}
                </div>
            ) : (
                <div 
                    className="h-full bg-gray-500 w-full opacity-60 text-[30px] font-gillroy flex justify-center items-end font-semibold text-[#a18356]"
                    style={{backgroundImage: "url('/src/assets/images/28530.jpg')", backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
                >
                    No Likes yet
                </div>
            )}
        </div>
    );
}
