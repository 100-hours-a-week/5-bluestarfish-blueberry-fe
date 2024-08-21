import React, { useState, useRef, useEffect } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom"; // useParams를 사용하여 URL 파라미터를 가져옴
import ChatStartMessage from "../rooms/ChatStartMessage";
import ChatEndMessage from "../rooms/ChatEndMessage";
import axiosInstance from "../../utils/axiosInstance";

type ChatContainerProps = {};

interface Message {
  message: string;
  senderId: number;
  roomId: string;
  time: string;
}

const ChatContainer: React.FC<ChatContainerProps> = () => {
  const { roomId } = useParams<{ roomId: string }>(); // URL에서 roomId를 가져옴
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<Client | null>(null);

  const senderId = 1;

  const getPreviousMessages = async () => {
    try {
      const response = await axiosInstance.get(`/api/vi/rooms/${roomId}/chat`);

      if (response.status === 200) {
        console.log("200 OK");
        setMessages(response.data);
      }
    } catch (error) {
      console.error("채팅 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getPreviousMessages();
    const socket = new SockJS("http://localhost:8080/ws-chat");
    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        if (!client || !roomId) return;
        client.subscribe(`/rooms/${roomId}/chats`, (message: IMessage) => {
          const body: Message = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, body]);
        });
      },
      onStompError: (error) => {
        console.error("Error: ", error);
      },
    });

    client.activate();
    clientRef.current = client;

    // 컴포넌트가 언마운트될 때 WebSocket 연결 해제
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [roomId]);

  const sendMessage = () => {
    if (content.trim() && clientRef.current?.connected) {
      const currentTime = new Date();
      const hours = String(currentTime.getHours()).padStart(2, "0");
      const minutes = String(currentTime.getMinutes()).padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;

      const message: Message = {
        message: content,
        senderId: 1,
        roomId: roomId || "",
        time: formattedTime,
      };
      clientRef.current.publish({
        destination: `/rooms/${roomId}/chats`,
        body: JSON.stringify({
          message: content, // 실제 입력된 content를 message로 변경
          senderId: senderId, // 실제 senderId를 함께 보냅니다.
        }),
      });
    }
    setContent("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="m-2 flex flex-col h-full">
      <div className="flex-grow overflow-y-auto max-h-[530px] p-2">
        {messages.map((msg, index) =>
          msg.senderId === 1 ? (
            <ChatStartMessage
              key={index} // 배열의 각 항목에 고유한 key 값 설정
              nickname="You"
              time={msg.time}
              message={msg.message}
            />
          ) : (
            <ChatEndMessage
              key={index} // 배열의 각 항목에 고유한 key 값 설정
              nickname="You"
              time={msg.time}
              message={msg.message}
            />
          )
        )}
        <div ref={messagesEndRef}></div>
        <div className="flex flex-row gap-1 fixed bottom-3 right-3">
          <input
            placeholder="채팅을 입력해주세요."
            className="w-[300px] border-2 rounded-[10px] text-black"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <button
            className="flex flex-rowflex items-center justify-center bg-[#4659aa] gap-2 w-[65px] h-[35px] rounded-[15px]"
            onClick={sendMessage}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/paper-plane.png`}
              alt="Paper-plane"
              className="h-[20px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
