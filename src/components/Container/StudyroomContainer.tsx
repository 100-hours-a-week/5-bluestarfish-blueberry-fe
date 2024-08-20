import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import SmallUserDisplay from "../rooms/SmallUserDisplay";

type StudyroomContainerProps = {};

interface UserStatus {
  id: number;
  nickname: string;
  profileImage: string;
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
}

const StudyroomContainer: React.FC = () => {
  const [userStatuses, setUserStatuses] = useState<UserStatus[]>([]);
  const { roomId } = useParams<{ roomId: string }>();
  const [camEnabled, setCamEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const clientRef = useRef<Client | null>(null);
  const navigate = useNavigate();
  const myUserId = 1;

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws-study");
    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        if (!client || !roomId) return;
        client.subscribe(`/rooms/${roomId}/management`, (message: IMessage) => {
          const body = JSON.parse(message.body);
          const users: UserStatus[] = body.map(
            (user: any): UserStatus => ({
              id: user.id,
              nickname: user.nickname,
              profileImage: user.profileImage,
              camEnabled: user.camEnabled,
              micEnabled: user.micEnabled,
              speakerEnabled: user.speakerEnabled,
            })
          );
          // 상태 업데이트
          setUserStatuses(users);
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

  const sendRoomControlUpdate = (update: UserStatus) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/rooms/${roomId}/management`,
        body: JSON.stringify({ update }),
      });
    }
  };

  const toggleCam = () => {
    const newCamEnabled = !camEnabled;
    setCamEnabled(newCamEnabled);
    sendRoomControlUpdate({
      id: myUserId,
      nickname: "Andy",
      profileImage: "string",
      camEnabled: newCamEnabled,
      micEnabled,
      speakerEnabled,
    });
  };

  const toggleMic = () => {
    const newMicEnabled = !micEnabled;
    setMicEnabled(newMicEnabled);
    sendRoomControlUpdate({
      id: myUserId,
      nickname: "Andy",
      profileImage: "string",
      camEnabled,
      micEnabled: newMicEnabled,
      speakerEnabled,
    });
  };

  const toggleSpeaker = () => {
    const newSpeakerEnabled = !speakerEnabled;
    setSpeakerEnabled(newSpeakerEnabled);
    sendRoomControlUpdate({
      id: myUserId,
      nickname: "Andy",
      profileImage: "string",
      camEnabled,
      micEnabled,
      speakerEnabled: newSpeakerEnabled,
    });
  };

  const handleExitButton = () => {
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="my-12  flex flex-wrap gap-8 justify-center">
        {userStatuses
          .filter((userStatus) => userStatus.id !== myUserId) // nowUserId와 다른 userStatus만 필터링
          .map((userStatus) => (
            <SmallUserDisplay
              userStatus={userStatus} // 필터링된 userStatus 전달
            />
          ))}
      </div>
      <div className="mt-10 flex flex-row gap-5">
        <button onClick={toggleCam}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/camera-white.png`}
            alt="camera"
            className="h-[32px]"
          />
        </button>
        <button onClick={toggleMic}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/mic-white.png`}
            alt="mic"
            className="h-[28px]"
          />
        </button>
        <button onClick={toggleSpeaker}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/speaker-white.png`}
            alt="speaker"
            className="h-[26px]"
          />
        </button>
        <button onClick={handleExitButton}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/exit-white.png`}
            alt="exit"
            className="h-[26px]"
          />
        </button>
      </div>
    </div>
  );
};

export default StudyroomContainer;
