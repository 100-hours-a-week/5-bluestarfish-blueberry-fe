import React, { useState, useRef, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useParams } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [camEnabled, setCamEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const clientRef = useRef(null);

  const senderId = 1; // Mock senderId for the demonstration.

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws-study");
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe(`/rooms/${roomId}/chats`, (message) => {
          const body = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, body]);
        });

        client.subscribe(`/rooms/${roomId}/management`, (message) => {
          const body = JSON.parse(message.body);
          setCamEnabled(body.camEnabled);
          setMicEnabled(body.micEnabled);
          setSpeakerEnabled(body.speakerEnabled);
        });
      },
      onStompError: (error) => {
        console.error("Error: ", error);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [roomId]);

  const sendMessage = () => {
    if (content.trim() && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/rooms/${roomId}/chats`,
        body: JSON.stringify({
          senderId: senderId,
          message: content,
        }),
      });
      setContent("");
    }
  };

  const sendRoomControlUpdate = (update) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/rooms/${roomId}/management`,
        body: JSON.stringify({
          userId: senderId, // userId를 추가
          ...update,
        }),
      });
    }
  };

  const toggleCam = () => {
    const newCamEnabled = !camEnabled;
    setCamEnabled(newCamEnabled);
    sendRoomControlUpdate({
      camEnabled: newCamEnabled,
      micEnabled,
      speakerEnabled,
    });
  };

  const toggleMic = () => {
    const newMicEnabled = !micEnabled;
    setMicEnabled(newMicEnabled);
    sendRoomControlUpdate({
      camEnabled,
      micEnabled: newMicEnabled,
      speakerEnabled,
    });
  };

  const toggleSpeaker = () => {
    const newSpeakerEnabled = !speakerEnabled;
    setSpeakerEnabled(newSpeakerEnabled);
    sendRoomControlUpdate({
      camEnabled,
      micEnabled,
      speakerEnabled: newSpeakerEnabled,
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.chatMessage}>
            <strong>{msg.senderNickname}: </strong> {/* 닉네임 표시 */}
            {msg.message} {/* 메시지 내용 */}
            <span className={styles.messageTimestamp}>
              {new Date(msg.createdAt).toLocaleString()} {/* 생성일 표시 */}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className={styles.controls}>
        <button onClick={toggleCam}>
          {camEnabled ? "캠 끄기" : "캠 켜기"}
        </button>
        <button onClick={toggleMic}>
          {micEnabled ? "마이크 끄기" : "마이크 켜기"}
        </button>
        <button onClick={toggleSpeaker}>
          {speakerEnabled ? "스피커 끄기" : "스피커 켜기"}
        </button>
      </div>
      <div className={styles.chatInputBox}>
        <input
          className={styles.chatInput}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={sendMessage}>보내기</button>
      </div>
    </>
  );
};

export default Home;
