import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useStorage } from "../context/useStorage";

export default function useOrderNotification() {
  const [actualizationCount, setActualizationCount] = useState(0);
  const [orderActualizationMessage, setOrderActualizationMessage] =
    useState("");
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [socket, setSocket] = useState(null);
  const { currentUser, isLogin } = useStorage();

  const closeActualizationNotification = () => {
    setActualizationCount(0);
  };

  const closeNewOrderNotification = () => {
    setNewOrdersCount(0);
  };

  useEffect(() => {
    if (isLogin) {
      const ENDPOINT = "http://127.0.0.1:7000";
      const socket = io.connect(ENDPOINT);
      socket.auth = {
        userId: currentUser._id,
        userRole: currentUser.name,
      };

      socket.on("connect", () => {
        console.log("user connected");
        setSocket(socket);
      });

      return () => socket.disconnect();
    }
  }, [isLogin, currentUser._id, currentUser.name]);

  useEffect(() => {
    if (socket) {
      socket.on("newOrder", () => {
        setNewOrdersCount(newOrdersCount + 1);
      });

      socket.on("orderActualization", (order) => {
        const lastUpdateState = [...order.states]
          .reverse()
          .find((state) => state.confirmed === true);

        if (lastUpdateState) {
          setActualizationCount(actualizationCount + 1);
          setOrderActualizationMessage(`Order ${lastUpdateState.name}`);
        } else {
          console.error("lastUpdateState is undefined");
        }
      });
    }
  }, [socket, actualizationCount, newOrdersCount]);

  return {
    newOrdersCount,
    actualizationCount,
    orderActualizationMessage,
    closeActualizationNotification,
    closeNewOrderNotification,
  };
}
