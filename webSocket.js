import React, { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import { BASE_URL } from "@constants/urls";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const storeId = useSelector(state => state.auth.storeId);

  useEffect(() => {
    const newSocket = io(BASE_URL, {
      query: { storeId: storeId },
      transports: ["websocket"],
      cors: {
        origin: [
          "http://localhost:5173",
          "http://localhost:3006",
          "http://localhost:3001",
        ],
      },
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, [storeId]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
