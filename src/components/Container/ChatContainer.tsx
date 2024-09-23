import React, { useState, useRef, useEffect } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom"; // useParams를 사용하여 URL 파라미터를 가져옴
import ChatStartMessage from "../rooms/ChatStartMessage";
import ChatEndMessage from "../rooms/ChatEndMessage";
import axiosInstance from "../../utils/axiosInstance";
import { useLoginedUserStore } from "../../store/store";

type ChatContainerProps = {};

interface Message {
  id: string;
  roomId: string;
  message: string;
  senderId: number;
  senderNickname: string;
  senderProfileImage: string;
  createdAt: string;
}

const ChatContainer: React.FC<ChatContainerProps> = () => {
  const { roomId } = useParams<{ roomId: string }>(); // URL에서 roomId를 가져옴
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const clientRef = useRef<Client | null>(null);
  const { userId, nickname, profileImage } = useLoginedUserStore();

  const getPreviousMessages = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms/${roomId}/chats`
      );

      if (response.status === 200) {
        console.log("200 OK");
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error("채팅 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    getPreviousMessages();
    const socket = new SockJS(`${process.env.REACT_APP_SOCKET_URL}`);
    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        if (!client || !roomId) return;
        client.subscribe(`/topic/rooms/${roomId}`, (message: IMessage) => {
          const body: any = JSON.parse(message.body);
          if (body.id) setMessages((prevMessages) => [...prevMessages, body]);
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
  }, []);

  const sendMessage = () => {
    if (content.trim() && clientRef.current?.connected) {
      // const hours = String(currentTime.getHours()).padStart(2, "0");
      // const minutes = String(currentTime.getMinutes()).padStart(2, "0");

      clientRef.current.publish({
        destination: `/rooms/${roomId}/chats`,
        body: JSON.stringify({
          message: content, // 실제 입력된 content를 message로 변경
          senderId: userId, // 실제 senderId를 함께 보냅니다.
          senderNickname: nickname,
          senderProfileImage: "",
        }),
      });
      setContent("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 기본 동작을 막음
    sendMessage();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <div className="m-2 flex flex-col h-full">
      <div
        className="flex flex-col grow overflow-y-auto p-2"
        style={{ height: "calc(100vh - 220px)" }}
      >
        {Array.isArray(messages) &&
          messages
            .filter((msg) => msg.senderId)
            .map((msg, index) =>
              msg.senderId === userId ? (
                <ChatEndMessage
                  key={index} // 배열의 각 항목에 고유한 key 값 설정
                  senderNickname={msg.senderNickname}
                  createdAt={msg.createdAt}
                  message={msg.message}
                  senderProfileImage={msg.senderProfileImage}
                  // senderProfileImage=""
                />
              ) : (
                <ChatStartMessage
                  key={index} // 배열의 각 항목에 고유한 key 값 설정
                  senderNickname={msg.senderNickname}
                  createdAt={msg.createdAt}
                  message={msg.message}
                  senderProfileImage={msg.senderProfileImage}
                  // senderProfileImage=""
                />
              )
            )}
        <div ref={messagesEndRef}></div>
        <form
          className="flex flex-row gap-1 fixed bottom-3 right-3"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="채팅을 입력해주세요."
            className="w-[300px] border-2 rounded-[10px] text-black p-1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={300}
          ></input>
          <button
            type="submit"
            className="flex flex-rowflex items-center justify-center bg-[#4659aa] gap-2 w-[65px] h-[35px] rounded-[15px]"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/paper-plane.png`}
              alt="Paper-plane"
              className="h-[20px]"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
