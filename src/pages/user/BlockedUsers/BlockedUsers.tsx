import { useAppDispatch, useAppSelector } from "../../../hooks/useTypedSelectors";
import { useState, useEffect } from "react";
import { userProfile } from "../../../services/userAPI";
import { UserData } from "../../../typings/user/userTypes";
import { formatDate } from "../../../utils/formateDate";
import { MdBlock } from "react-icons/md"; // Import block icon
import { useNavigate } from "react-router-dom";

export function BlockedUsers() {
    const curUser = useAppSelector(state => state.user.user);
    const [blockedUserDetails, setBlockedUserDetails] = useState<UserData[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchBlockedUsers() {
            try {
                if (curUser?.blockedUsers && curUser.blockedUsers.length > 0) {
                    const userDetails = await Promise.all(
                        curUser.blockedUsers.map(async (blockedUser) => {
                            const response = await dispatch(userProfile(blockedUser.user));
                            return response.payload.data[0];
                        })
                    );
                    setBlockedUserDetails(userDetails);
                }
            } catch (error) {
                navigate("/500")
            }
        }

        fetchBlockedUsers();
    }, [curUser, dispatch]);

    function navigateToUserProfile(userId: string) {
        window.location.href = `/profile/${userId}`
    }

    return (
        <div className="w-full max-h-[85vh] overflow-y-scroll no-scrollbar">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                <p className="font-bold">Warning</p>
                <p>The users listed below have been blocked by you. Blocking a user prevents them from contacting you or seeing your profile.</p>
            </div>

            {blockedUserDetails.length > 0 ? (
                <div className="w-full flex flex-col items-center justify-center pt-10">
                    {blockedUserDetails.map((user) => (
                        <div 
                            key={user._id} className="flex items-center justify-between gap-10 p-2 border-b px-14 w-3/4 hover:bg-gray-200"
                            onClick={() => navigateToUserProfile(user._id)}
                        >
                           <div className="flex gap-5">
                                <div 
                                    className="h-16 w-16 rounded-full overflow-hidden mb-2"
                                    style={{backgroundImage: `url(${user.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                                ></div>

                                <div>
                                    <h1 className="text-[16px] font-semibold">{user.username}</h1>
                                    <p className="text-[14px] text-gray-500">Blocked At: {formatDate(curUser?.blockedUsers?.find((blockedUser) => blockedUser.user === user._id)?.blockedAt.toString() || "") || ""}</p>
                                </div>
                           </div>

                            <MdBlock className="text-red-500 text-[24px]" /> {/* Block icon at the end */}
                        </div>
                    ))}
                </div>
            ) : (
                <div 
                    className="h-full w-full opacity-60 text-[30px] font-gillroy flex justify-center items-end pb-[80px] font-semibold text-[#a18356]"
                    style={{backgroundImage: "url('/src/assets/images/no-block.jpg')", backgroundSize: 'contain', backgroundPosition: 'center -50px', backgroundRepeat: 'no-repeat'}}
                >
                    No blocked users
                </div>
            )}
        </div>
    );
}
