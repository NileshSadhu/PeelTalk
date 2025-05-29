import { io } from "socket.io-client";

const socket = io("http://localhost:3000",{
    withCredentials: true,
    transports: ['websocket'],
    autoConnect: false
});

// const socket = io("https://0756-59-153-3-37.ngrok-free.app",{
//     withCredentials: true,
//     transports: ['websocket'],
//     autoConnect: false
// });

export default socket;
