import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import SmallUserDisplay from "../rooms/SmallUserDisplay";
import { useDeviceStore, useLoginedUserStore } from "../../store/store";
import { useUserStore } from "../../store/userStore";
import axiosInstance from "../../utils/axiosInstance";

interface User {
  id: number;
  nickname: string;
  profileImage: string;
  camEnabled: boolean;
  micEnabled: boolean;
  speakerEnabled: boolean;
}

interface StudyRoom {
  id: number;
  title: string;
  camEnabled: boolean;
  maxUsers: number;
  thumbnail: string;
  users: { id: number; name: string }[];
}

const StudyroomContainer: React.FC = () => {
  const [studyRoom, setStudyRoom] = useState<StudyRoom>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { roomId } = useParams<{ roomId: string }>();
  const clientRef = useRef<Client | null>(null);
  const navigate = useNavigate();
  const {
    camEnabled,
    micEnabled,
    speakerEnabled,
    toggleCam,
    toggleMic,
    toggleSpeaker,
  } = useDeviceStore();
  const { userId, nickname, profileImage } = useLoginedUserStore();

  const { users, setUsers } = useUserStore();

  useEffect(() => {
    console.log(`${process.env.REACT_APP_SOCKET_URL}`);
    fetchStudyRoom();
  }, []);

  useEffect(() => {
    console.log(studyRoom);
    console.log(users);
  }, [users]);

  const exitStudyRoom = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms/${roomId}/users/${userId}`,
        {
          host: false,
          active: false,
          camEnabled: camEnabled,
          micEnabled: micEnabled,
          speakerEnabled: speakerEnabled,
          goalTime: "14:30:30",
          dayTime: "15:30:30",
        }
      );
      if (response.status === 204) {
        console.log("204 No Content");
        navigate(`/studyroom/${roomId}`);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("404: ", "Not Found");
        } else {
          console.error(
            `오류 발생 (${error.response.status}):`,
            error.response.data.message || "서버 오류가 발생했습니다."
          );
        }
      } else {
        console.error("스터디룸 퇴장 중 오류 발생:", error.message);
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const fetchStudyRoom = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms/${roomId}`
      );
      if (response.status === 200) {
        setStudyRoom(response.data);
        setUsers(response.data.data.maxUsers);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error(
            "404 오류: ",
            error.response.data.message || "스터디룸을 찾을 수 없습니다."
          );
        } else {
          console.error(
            `오류 발생 (${error.response.status}):`,
            error.response.data.message || "서버 오류가 발생했습니다."
          );
        }
      } else {
        console.error("스터디룸 정보를 가져오는 중 오류 발생:", error.message);
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };
  useEffect(() => {
    const socket = new SockJS(`${process.env.REACT_APP_SOCKET_STUDY_URL}`);
    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      onConnect: () => {
        if (!client || !roomId) return;
        client.subscribe(`/rooms/${roomId}`, (message: IMessage) => {
          const body = JSON.parse(message.body);
          const users: User[] = body.map(
            (user: any): User => ({
              id: user.id,
              nickname: user.nickname,
              profileImage: user.profileImage,
              camEnabled: user.camEnabled,
              micEnabled: user.micEnabled,
              speakerEnabled: user.speakerEnabled,
            })
          );
          // 상태 업데이트
          setUsers(users);
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
  }, []);

  const sendRoomControlUpdate = (update: User) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/rooms/${roomId}/management`,
        body: JSON.stringify({ update }),
      });
    }
  };

  const clickCamIcon = () => {
    toggleCam();
    sendRoomControlUpdate({
      id: userId,
      nickname: nickname,
      profileImage: profileImage,
      camEnabled: camEnabled,
      micEnabled,
      speakerEnabled,
    });
  };

  const clickMicIcon = () => {
    toggleMic();
    sendRoomControlUpdate({
      id: userId,
      nickname: nickname,
      profileImage: profileImage,
      camEnabled,
      micEnabled: micEnabled,
      speakerEnabled,
    });
  };

  const clickSpeakerIcon = () => {
    toggleSpeaker();
    sendRoomControlUpdate({
      id: userId,
      nickname: nickname,
      profileImage: profileImage,
      camEnabled,
      micEnabled,
      speakerEnabled: speakerEnabled,
    });
  };

  const handleExitButton = async () => {
    await exitStudyRoom();
    navigate(`/wait/${roomId}`);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="my-12  flex flex-wrap gap-8 justify-center">
        {Array.isArray(users) &&
          users
            .filter((user) => user.id !== userId) // nowUserId와 다른 userStatus만 필터링
            .map((user) => (
              <SmallUserDisplay
                userStatus={user} // 필터링된 userStatus 전달
              />
            ))}
      </div>
      <div className="mt-10 flex flex-row gap-5 justify-center items-center">
        <button onClick={clickCamIcon}>
          <img
            src={
              camEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/camera-on.png`
                : `${process.env.PUBLIC_URL}/assets/images/room-cam-off.png`
            }
            alt="camera"
            className="h-[20px] mb-2"
          />
        </button>
        <button onClick={clickMicIcon}>
          <img
            src={
              micEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/room-mic-on.png`
                : `${process.env.PUBLIC_URL}/assets/images/room-mic-off.png`
            }
            alt="mic"
            className="h-[28px]"
          />
        </button>
        <button onClick={clickSpeakerIcon}>
          <img
            src={
              speakerEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/room-speaker-on.png`
                : `${process.env.PUBLIC_URL}/assets/images/room-speaker-off.png`
            }
            alt="speaker"
            className="w-[27px] h-[26px] mb-[2px]"
          />
        </button>
        <button onClick={handleExitButton}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/exit-white.png`}
            alt="exit"
            className="h-[26px] mb-[1px]"
          />
        </button>
      </div>
    </div>
  );
};

export default StudyroomContainer;
