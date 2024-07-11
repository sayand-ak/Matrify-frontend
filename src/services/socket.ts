import { io, Socket } from 'socket.io-client';

const URL = "https://bigbag.site";

export const socket: Socket = io(URL, {
  withCredentials: true,
  transports: ['websocket'],
});
