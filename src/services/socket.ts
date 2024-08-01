// "use client";

// import socket from "@/utils/constants"; // Ensure socket is correctly initialized
// import { useEffect } from "react";

// const Socket = () => {
//   useEffect(() => {
//     if (socket && !socket.connected) {
//       console.log("Attempting to connect socket...");
//       socket.connect();

//       const handleConnect = () => console.log("Socket connected:", socket?.id);
//       const handleDisconnect = () => console.log("Socket disconnected");
//       const handleError = (error: any) => console.error("Socket connection error:", error);

//       socket.on("connect", handleConnect);
//       socket.on("disconnect", handleDisconnect);
//       socket.on("connect_error", handleError);

//       // Cleanup listeners on component unmount
//       return () => {
//         socket?.off("connect", handleConnect);
//         socket?.off("disconnect", handleDisconnect);
//         socket?.off("connect_error", handleError);
//       };
//     }
//   }, []);

//   return null;
// };

// export default Socket;