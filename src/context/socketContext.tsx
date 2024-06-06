import { createContext, useEffect, useState, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { socket } from '../services/socket';
import { useAppSelector } from '../hooks/useTypedSelectors';

// Define the type for the context value
interface SocketContextType {
    socket: Socket;
    isConnected: boolean;
    usersOnline: SocketUserType[];
}


interface SocketUserType {
    userId: string;
    socketId: string;
}


// Create the SocketContext with a default value of undefined
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SocketContext = createContext<SocketContextType>({socket, isConnected: false, usersOnline: []});


// SocketProvider component
export function SocketProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [usersOnline, setUsersOnline] = useState<SocketUserType[]>([]);

    const userId = useAppSelector(state => state.user.user?._id);

    console.log(socket);




    useEffect(() => {

        const handleConnect = () => {
            console.log('Connected to Socket.IO server');
            setIsConnected(true);
            if (userId) {
                socket.emit('addUser', userId);
            }
        };

        const handleDisconnect = () => {
            console.log('Disconnected from Socket.IO server');
            socket.emit('removeUser', userId);
            setIsConnected(false);
        };

        const handleGetUsers = (users: SocketUserType[]) => {
            setUsersOnline(users);
            console.log(users,"weifunewioughfwiouhgiuhrguoherwgtuherdfugheurbngejnrgkjenrjughenrgfojrfhgerfjh");
        };



        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('getUsers', handleGetUsers);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('getUsers', handleGetUsers);
        };
    }, [userId]);


    return (
        <SocketContext.Provider value={{ socket, isConnected, usersOnline }}>
            {children}
        </SocketContext.Provider>
    );
}
