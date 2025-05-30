import { io } from 'socket.io-client';

// Create a socket instance
export const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001', {
    autoConnect: false,
    transports: ['websocket'],
});

// Add connection event handlers
socket.on('connect', () => {
    console.log('Socket connected');
});

socket.on('disconnect', () => {
    console.log('Socket disconnected');
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
}); 