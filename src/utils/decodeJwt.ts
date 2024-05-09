import {  jwtDecode } from "jwt-decode";
import { UserGoogleAuthData } from "../typings/user/userTypes";


export function decodeJwt(token: string): UserGoogleAuthData | null {
    const data = jwtDecode(token);
    if (data) {
        const userData: UserGoogleAuthData = {
            data: data,
            phone: '',
        };
        return userData;
    }
    return null;
}
