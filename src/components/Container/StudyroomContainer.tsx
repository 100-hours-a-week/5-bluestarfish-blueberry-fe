import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import kurentoUtils from "kurento-utils";
import Participant from "../../utils/Participant";
import { useDeviceStore, useLoginedUserStore } from "../../store/store";
import { useUserStore } from "../../store/userStore";
import axiosInstance from "../../utils/axiosInstance";
import { checkMediaPermissions } from "../../utils/checkMediaPermission";

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
  const [studyRoom, setStudyRoom] = useState<StudyRoom>(); // 추후에 설정값 반영하기
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
  const { users, addUser, updateUser, setUsers } = useUserStore();
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState<boolean>(true);
  const [permissionsChecked, setPermissionsChecked] = useState<boolean>(true);

  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const participants: Record<string, Participant> = {};

  useEffect(() => {
    fetchStudyRoom();
  }, []);

  useEffect(() => {
    const checkPermissions = async () => {
      const { camera, microphone } = await checkMediaPermissions();
      setCameraEnabled(camera);
      setMicrophoneEnabled(microphone);
      setPermissionsChecked(true);
    };

    // checkPermissions();
  }, []);

  useEffect(() => {
    if (permissionsChecked) {
      if (!cameraEnabled || !microphoneEnabled) {
        navigate(-1);
      }
    }
  }, [cameraEnabled, microphoneEnabled, permissionsChecked]);

  useEffect(() => {
    sendRoomControlUpdate({
      id: userId,
      nickname: nickname,
      profileImage: profileImage,
      camEnabled: camEnabled,
      micEnabled: micEnabled,
      speakerEnabled: speakerEnabled,
    });
  }, [camEnabled, micEnabled, speakerEnabled]);

  useEffect(() => {
    if (permissionsChecked) {
      // if (userId === 0) return;
      wsRef.current = new WebSocket(`${process.env.REACT_APP_SOCKET_RTC_URL}`);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established");
        register(); // WebSocket이 OPEN 상태가 된 후 register 호출
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };

      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [permissionsChecked]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.onmessage = (message) => {
        const parsedMessage = JSON.parse(message.data);
        console.info("Received message: " + message.data);

        switch (parsedMessage.id) {
          case "existingParticipants":
            onExistingParticipants(parsedMessage);
            break;
          case "newParticipantArrived":
            onNewParticipant(parsedMessage);
            break;
          case "participantLeft":
            onParticipantLeft(parsedMessage);
            break;
          case "receiveVideoAnswer":
            receiveVideoResponse(parsedMessage);
            break;
          case "iceCandidate":
            participants[parsedMessage.name].rtcPeer.addIceCandidate(
              parsedMessage.candidate,
              (error: any) => {
                if (error) {
                  console.error("Error adding candidate: " + error);
                  return;
                }
              }
            );
            break;
          default:
            console.error("Unrecognized message", parsedMessage);
        }
      };
    }
  }, [wsRef.current]);

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
        navigate(`/wait/${roomId}`);
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
        setStudyRoom(response.data); // userRooms 배열을 User 인터페이스에 맞게 변환

        const usersArray = response.data.data.userRooms.map(
          (userRoom: any) => ({
            id: userRoom.userId,
            nickname: userRoom.nickname,
            profileImage: userRoom.profileImage || "", // null인 경우 빈 문자열로 대체
            camEnabled: userRoom.camEnabled,
            micEnabled: userRoom.micEnabled,
            speakerEnabled: userRoom.speakerEnabled,
          })
        );

        setUsers(usersArray); // 변환된 배열을 users로 설정
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

        client.subscribe(`/rooms/${roomId}/management`, (message: IMessage) => {
          const body = JSON.parse(message.body);
          console.log(body);
          body.id &&
            updateUser(body.id, {
              camEnabled: body.camEnabled,
              micEnabled: body.micEnabled,
              speakerEnabled: body.speakerEnabled,
            });
        });
        client.subscribe(`/rooms/${roomId}/member`, (message: IMessage) => {
          const body = JSON.parse(message.body);
          console.log(body);
          body.id &&
            addUser({
              id: body.id,
              nickname: body.nickname,
              profileImage: body.profileImage || "",
              camEnabled: body.camEnabled,
              micEnabled: body.micEnabled,
              speakerEnabled: body.speakerEnabled,
            });
        });

        client.publish({
          destination: `/rooms/${roomId}/member`,
          body: JSON.stringify({
            id: userId,
            nickname: nickname,
            profileImage: "",
            camEnabled: camEnabled,
            micEnabled: micEnabled,
            speakerEnabled: speakerEnabled,
          }),
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
        body: JSON.stringify(update),
      });
    }
  };

  const clickCamIcon = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !camEnabled;
      });
      toggleCam();
      // 비디오 요소 업데이트
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
    }
  };

  const clickMicIcon = () => {
    localStreamRef.current
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = !micEnabled));
    toggleMic();
  };

  const clickSpeakerIcon = () => {
    toggleSpeaker();
  };

  const handleExitButton = async () => {
    leaveRoom();
    await exitStudyRoom();
  };

  // WebRTC functions

  const sendMessage = (message: any) => {
    // if (!message.sender) {
    //   console.error("Sender is missing in the message:", message);
    //   return;
    // }
    const jsonMessage = JSON.stringify(message);
    console.log("Sending message: " + jsonMessage);
    wsRef.current?.send(jsonMessage);
  };

  const register = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });

    const message = {
      id: "joinRoom",
      name: nickname,
      room: roomId,
    };
    sendMessage(message);
  };

  const onNewParticipant = (request: { name: string }) => {
    receiveVideo(request.name);
  };

  const receiveVideoResponse = (result: { name: string; sdpAnswer: any }) => {
    participants[result.name].rtcPeer.processAnswer(
      result.sdpAnswer,
      (error: any) => {
        if (error) {
          console.error(error);
        }
      }
    );
  };

  const stop = () => {
    console.log("Stopping WebRTC communication");

    for (const key in participants) {
      if (participants[key].rtcPeer) {
        participants[key].rtcPeer.dispose();
        participants[key].rtcPeer = null;
      }
    }

    wsRef.current?.close();
  };

  const onExistingParticipants = (msg: { data: string[] }) => {
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 400,
          maxFrameRate: 120,
          minFrameRate: 15,
        },
      },
    };
    console.log(`${nickname} registered in room`);

    const participant = new Participant(nickname, nickname, sendMessage);
    participants[nickname] = participant;

    const video = participant.getVideoElement();

    var options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [
          {
            urls: `${process.env.REACT_APP_TURN_URL}`,
            username: "blueberry",
            credential: "1234",
          },
        ],
      },
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      (error: any) => {
        if (error) {
          return console.error(error);
        }
        participant.rtcPeer.generateOffer(
          participant.offerToReceiveVideo.bind(participant)
        );
      }
    );

    participant.rtcPeer.getLocalStream((stream: MediaStream) => {
      localStreamRef.current = stream;
      if (!stream) {
        console.error("Failed to get local stream");
      }
    });

    msg.data.forEach(receiveVideo);
  };

  const leaveRoom = () => {
    sendMessage({ id: "leaveRoom" });

    for (const key in participants) {
      participants[key].dispose();
    }

    navigate("/");

    wsRef.current?.close();
  };

  const receiveVideo = (sender: string) => {
    const participant = new Participant(nickname, sender, sendMessage);
    participants[sender] = participant;
    const video = participant.getVideoElement();

    var options = {
      remoteVideo: video,
      onicecandidate: participant.onIceCandidate.bind(participant),
      configuration: {
        iceServers: [
          {
            urls: `${process.env.REACT_APP_TURN_URL}`,
            username: "blueberry",
            credential: "1234",
          },
        ],
      },
    };

    participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      (error: any) => {
        if (error) {
          return console.error(error);
        }
        participant.rtcPeer.generateOffer(
          participant.offerToReceiveVideo.bind(participant)
        );
      }
    );
  };

  const onParticipantLeft = (request: { name: string }) => {
    console.log("Participant " + request.name + " left");
    var participant = participants[request.name];

    // 추가 코드
    if (participant !== undefined) {
      participant.dispose();
      delete participants[request.name];
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div>
        <div
          id="container"
          className="w-full h-full flex flex-col items-center"
        >
          <h2
            id="room-header"
            className="m-0 w-full h-20 border border-black box-border flex items-center justify-center"
          ></h2>
          <div
            id="participants"
            className="w-full h-[calc(100%-80px)] border border-black flex flex-wrap items-center justify-center gap-8"
          >
            <div
              className="flex flex-col bg-cover justify-center items-center w-[400px] h-[300px] border border-black rounded-lg"
              id={nickname}
            >
              <div
                className={`w-[400x] h-[300px] bg-cover rounded-[20px] shadow-lg  ${
                  !camEnabled ? "hidden" : ""
                }`}
              >
                <video
                  id="video-나"
                  className="w-full h-full transform scale-x-[-1]"
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                />
              </div>
              <span className="text-lg text-white">{nickname}</span>
            </div>
          </div>
        </div>
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
