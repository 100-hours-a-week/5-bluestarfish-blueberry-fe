import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Client, IMessage } from "@stomp/stompjs";
import kurentoUtils from "kurento-utils";
import Participant from "../../utils/Participant";
import { useDeviceStore, useLoginedUserStore } from "../../store/store";
import { useUserStore } from "../../store/userStore";
import { useRoomStore } from "../../store/roomStore";
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
  const { users, addUser, updateUser, removeUser } = useUserStore();
  const {
    curUsers,
    setRoomId,
    setTitle,
    setMaxUsers,
    setCurUsers,
    setCamEnabled,
  } = useRoomStore();
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState<boolean>(false);
  const [permissionsChecked, setPermissionsChecked] = useState<boolean>(false);

  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const participantsRef = useRef<Record<string, Participant>>({}); // Ref로 관리
  const usersRef = useRef(users); // users 상태를 유지하는 Ref

  useEffect(() => {
    usersRef.current = users; // users 상태가 변경될 때마다 usersRef 업데이트
  }, [users]);
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  useEffect(() => {
    camEnabledRef.current = camEnabled;
  }, [camEnabled]);
  useEffect(() => {
    micEnabledRef.current = micEnabled;
  }, [micEnabled]);
  useEffect(() => {
    speakerEnabledRef.current = speakerEnabled;
  }, [speakerEnabled]);
  const participants: Record<string, Participant> = {};
  const location = useLocation();
=======
>>>>>>> parent of 3bf0be9 (feat: timer)
=======
>>>>>>> parent of 3bf0be9 (feat: timer)
=======
>>>>>>> parent of 3bf0be9 (feat: timer)

  useEffect(() => {
    fetchStudyRoom();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    const checkPermissions = async () => {
      const { camera, microphone } = await checkMediaPermissions();
      setCameraEnabled(camera);
      setMicrophoneEnabled(microphone);
      setPermissionsChecked(true);
    };

    checkPermissions();
  });

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
    if (permissionsChecked && userId) {
      console.log(`UserId is ${userId}`);
      wsRef.current = new WebSocket(`${process.env.REACT_APP_SOCKET_RTC_URL}`);

      wsRef.current.onopen = () => {
        console.log("WebSocket connection established");
        register(); // WebSocket이 OPEN 상태가 된 후 register 호출
      };

      wsRef.current.onerror = (error) => {
        console.error("WebSocket error: ", error);
      };
    }

    // 핑퐁 START ----------------------------------------------------------
    const interval = setInterval(() => {
      const message = {
        id: "pingPong",
        message: "ping",
      };
      sendMessage(message);
    }, 10000);
    // 핑퐁 START ----------------------------------------------------------

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }

      // WebRTC 피어 연결 종료
      for (let key in participants) {
        if (participants[key].rtcPeer) {
          participants[key].rtcPeer.dispose();
          participants[key].rtcPeer = null;
        }
      }

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }

      // 핑퐁 START ----------------------------------------------------------
      if (interval) clearInterval(interval);
      // 핑퐁 END ----------------------------------------------------------
    };
  }, [permissionsChecked, userId]);

  useEffect(() => {
    if (wsRef.current) {
      wsRef.current.onmessage = (message) => {
        const parsedMessage = JSON.parse(message.data);
        // console.info("Received message: " + message.data);

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
          case "isCamOn":
            controlCam(parsedMessage);
            break;
          case "isMicOn":
            controlMic(parsedMessage);
            break;
          // 핑퐁 START ---------------------------------------------------------
          case "pingPong":
            console.log(parsedMessage);
            break;
          // 핑퐁 END ---------------------------------------------------------
          default:
            console.error("Unrecognized message", parsedMessage);
        }
      };
    }
  }, [wsRef.current]);

  // useEffect(() => {
  //   if (location.state && location.state.needPassword) {
  //     setPassword(location.state.password);
  //   }
  // }, [location]);

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
        if (location.state && location.state.needPassword) {
          navigate(`/wait/${roomId}`, {
            state: {
              authorized: true,
              needPassword: true,
              password: location.state.password,
            },
          });
        } else {
          navigate(`/wait/${roomId}`, {
            state: { authorized: true, needPassword: false },
          });
        }
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
        console.log(response.data);
        setRoomId(response.data.data.id);
        setTitle(response.data.data.title);
        setMaxUsers(response.data.data.maxUsers);
        setCamEnabled(response.data.data.camEnabled);
        setStudyRoom(response.data); // userRooms 배열을 User 인터페이스에 맞게 변환
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

  // 추가코드 START -------------------------------------------
  useEffect(() => {
    const message = {
      id: "isCamOn",
      sender: nickname,
      isCamOn: camEnabled,
    };
    sendMessage(message);
    updateUser(userId, { camEnabled: camEnabled });
  }, [camEnabled, userId]);

  useEffect(() => {
    const message = {
      id: "isMicOn",
      sender: nickname,
      isMicOn: micEnabled,
    };
    sendMessage(message);
    updateUser(userId, { micEnabled: micEnabled });
  }, [micEnabled, userId]);
  // 추가코드 END -------------------------------------------

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

  // 추가코드 START ---------------------------------------------------------
  const controlCam = (parsedMessage: any) => {
    const videoElement = document.getElementById(
      `video-${parsedMessage.sender}`
    );

    if (videoElement) {
      if (parsedMessage.isCamOn) {
        videoElement.style.visibility = "visible";
      } else {
        videoElement.style.visibility = "hidden";
      }
    } else {
      console.error(
        `Video element with id video-${parsedMessage.sender} not found`
      );
    }

    // 닉네임을 기준으로 해당 사용자 찾기
    const userToUpdate = users.find(
      (user) => user.nickname === parsedMessage.sender
    );

    // 해당 사용자가 있으면 camEnabled 상태 업데이트
    if (userToUpdate) {
      updateUser(userToUpdate.id, { camEnabled: parsedMessage.isCamOn });
    } else {
      console.error(`User with nickname ${parsedMessage.sender} not found`);
      console.log(users);
    }

    // if (videoElement && videoElement.srcObject) {
    //   const stream = videoElement.srcObject as MediaStream;
    //   const videoTrack = stream.getVideoTracks()[0]; // 비디오 트랙 가져오기

    //   if (videoTrack) {
    //     videoTrack.enabled = parsedMessage.isCamOn; // 카메라 켜기/끄기
    //   }
    // } else {
    //   console.error(
    //     `Video element with id video-${parsedMessage.sender} not found`
    //   );
    // }
  };

  const controlMic = (parsedMessage: any) => {
    const videoElement = document.getElementById(
      `video-${parsedMessage.sender}`
    ) as HTMLVideoElement | null;

    if (videoElement) {
      if (parsedMessage.isMicOn) {
        videoElement.muted = false;
      } else {
        videoElement.muted = true;
      }
    } else {
      console.error(
        `Video element with id video-${parsedMessage.sender} not found`
      );
    }
    // 닉네임을 기준으로 해당 사용자 찾기
    const userToUpdate = users.find(
      (user) => user.nickname === parsedMessage.sender
    );

    // 해당 사용자가 있으면 camEnabled 상태 업데이트
    if (userToUpdate) {
      updateUser(userToUpdate.id, { micEnabled: parsedMessage.isMicOn });
    } else {
      console.error(`User with nickname ${parsedMessage.sender} not found`);
      console.log(users);
    }
  };

  // 추가코드 END ---------------------------------------------------------

  const sendMessage = (message: any) => {
    const jsonMessage = JSON.stringify(message);
    // console.log("Sending message: " + jsonMessage);
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
      userId: userId,
      name: nickname,
      room: roomId,
      camEnabled: camEnabled,
      micEnabled: micEnabled,
      speakerEnabled: speakerEnabled,
    };
    sendMessage(message);
  };

  const onNewParticipant = (request: {
    userId: number;
    profileImage: string;
    name: string;
    camEnabled: boolean;
    micEnabled: boolean;
    speakerEnabled: boolean;
  }) => {
    // WebRTC 비디오 수신 처리
    receiveVideo(request.name);

    // 새로운 참가자를 상태에 추가
    addUser({
      id: request.userId,
      nickname: request.name,
      profileImage: request.profileImage,
      camEnabled: request.camEnabled,
      micEnabled: request.micEnabled,
      speakerEnabled: request.speakerEnabled,
    });

    console.log(`New participant added: ${request.name}`);
  };

  const receiveVideoResponse = (result: {
    userId: number;
    profileImage: string;
    name: string;
    camEnabled: boolean;
    micEnabled: boolean;
    speakerEnabled: boolean;
    sdpAnswer: any;
  }) => {
    // WebRTC SDP 응답 처리
    if (participants[result.name]) {
      participants[result.name].rtcPeer.processAnswer(
        result.sdpAnswer,
        (error: any) => {
          if (error) {
            console.error("Error processing SDP answer:", error);
          }
        }
      );
    }

    const existingUser = users.find((user) => user.id === result.userId);

    if (existingUser) {
      // 이미 있는 유저라면 updateUser 호출
      updateUser(result.userId, {
        profileImage: result.profileImage,
        nickname: result.name,
        camEnabled: result.camEnabled,
        micEnabled: result.micEnabled,
        speakerEnabled: result.speakerEnabled,
      });
    } else {
      // 없는 유저라면 addUser 호출
      addUser({
        id: result.userId,
        profileImage: result.profileImage,
        nickname: result.name,
        camEnabled: result.camEnabled,
        micEnabled: result.micEnabled,
        speakerEnabled: result.speakerEnabled,
      });
    }

    console.log(`Received video answer for: ${result.name}`);
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
    const participant = new Participant(nickname, nickname, sendMessage);
    participants[nickname] = participant;
    //useState로 값을 업데이트하면 에러가 발생
    setCurUsers(Object.keys(participants).length);
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
    setCurUsers(Object.keys(participants).length);
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
    var participant = participants[request.name];

    // 추가 코드
    if (participant !== undefined) {
      participant.dispose();
      delete participants[request.name];
    }

    // Zustand에서 해당 닉네임의 유저 삭제
    const userToRemove = users.find((user) => user.nickname === request.name);

    if (userToRemove) {
      removeUser(userToRemove.id); // 상태에서 해당 유저 삭제
    }

    setCurUsers(Object.keys(participants).length);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <span id="numUsers" className="text-white">
        {curUsers}
      </span>
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
