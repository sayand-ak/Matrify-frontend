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

export const SocketContext = createContext<SocketContextType>({} as SocketContextType);


// SocketProvider component
export function SocketProvider({ children }: { children: ReactNode }) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [usersOnline, setUsersOnline] = useState<SocketUserType[]>([]);

    const userId = useAppSelector(state => state.user.user?._id);

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