import { useContext } from 'react';
import { SocketContext } from '../context/socketContext';

// Custom hook to use the SocketContext
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
