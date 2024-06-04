import { createContext, useEffect, useState, ReactNode } from 'react';
import { Socket} from 'socket.io-client';
import { socket } from '../services/socket';

// Define the type for the context value
interface SocketContextType {
  socket: Socket;
  isConnected: boolean;

}

// Create the SocketContext with a default value of undefined
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SocketContext = createContext<SocketContextType | undefined>(undefined);


// SocketProvider component
export function SocketProvider({ children }: {children : ReactNode}) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
      setIsConnected(false);
    });
    
    return () => {
        socket.off('connect');
        socket.off('disconnect');
    };
}, []);


return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}
