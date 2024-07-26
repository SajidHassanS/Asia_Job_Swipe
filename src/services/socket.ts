import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ajs-server.hostdonor.com/api/v1';

let userId: string | null = null;
if (typeof window !== "undefined") {
  userId = localStorage.getItem('_id'); // Ensure the _id is stored in localStorage
}

const socket = io(SOCKET_URL, {
  query: {
    userId: userId || '',
  },
});

export default socket;