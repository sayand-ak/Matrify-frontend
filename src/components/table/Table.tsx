import "./Table.css";
import { CiCircleMore } from "react-icons/ci";
import { Users } from "../../typings/user/userTypes";


export function Table({userData, userHeader}: {userData: Users[], userHeader:string[]}) {
    return (
        <table className="flex-col w-full">
            <thead>
                <tr className="text-center h-[50px]">
                {userHeader.map((header, index) => (
                            <th key={index}>{header}</th>
                ))}
                </tr>
            </thead>
            
            <tbody>
                { userData.length > 0 && userData.map((user, index) => (
                    < tr className="text-center h-[50px]">
                        <td key={index}>{index}</td>
                        <td>{user.username}</td>
                        <th className="flex justify-center">
                            <img src="../../src/assets/images/profile.png" alt="" className="h-10 w-10"/>
                        </th>
                        <td>{user.phone? user.phone : "nill"}</td>
                        <td>{user.email? user.email : "nill"}</td>
                        <td>{new Date(user.createdAt).toISOString().split('T')[0]}</td>
                        <td>{user.otpVerified? "verified": "not verified"}</td>
                        <td><button><CiCircleMore className="text-2xl"/></button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
