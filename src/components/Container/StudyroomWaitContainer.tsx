import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LargeUserDisplay from "../rooms/LargeUserDisplay";
import axiosInstance from "../../utils/axiosInstance";
import { useDeviceStore, useLoginedUserStore } from "../../store/store";
import { checkMediaPermissions } from "../../utils/checkMediaPermission";

const StudyroomWaitContainer: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>(); // URL에서 roomId를 가져옴
  const { userId } = useLoginedUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cameraEnabled, setCameraEnabled] = useState<boolean>(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState<boolean>(true);
  const [permissionsChecked, setPermissionsChecked] = useState<boolean>(true);
  const {
    camEnabled,
    micEnabled,
    speakerEnabled,
    toggleCam,
    toggleMic,
    toggleSpeaker,
  } = useDeviceStore();

  useEffect(() => {
    const checkPermissions = async () => {
      const { camera, microphone } = await checkMediaPermissions();
      setCameraEnabled(camera);
      setMicrophoneEnabled(microphone);
      setPermissionsChecked(true);
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    console.log(cameraEnabled, microphoneEnabled, permissionsChecked);
  }, [cameraEnabled, microphoneEnabled, permissionsChecked]);

  const handleClick = () => {
    enterStudyRoom();
    navigate(`/studyroom/${roomId}`);
  };

  const enterStudyRoom = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_API_URL}/api/v1/rooms/${roomId}/users/${userId}`,
        {
          host: false,
          active: true,
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
        console.error("스터디룸 입장 중 오류 발생:", error.message);
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-[25px] font-bold text-shadow-sm text-black mb-3">
        스터디 룸 대기실
      </p>
      <LargeUserDisplay
        backgroundImage={`${process.env.PUBLIC_URL}/assets/images/user-display-default.png`}
      />
      <div className="w-[800px] mt-2 ml-12">
        <p className="text-[14px]">현재 영상은 다른 사람이 볼 수 없습니다.</p>
      </div>
      <div className="mt-10 flex flex-row gap-5">
        <button onClick={toggleCam}>
          <img
            src={
              camEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/wait-camera-on.png`
                : `${process.env.PUBLIC_URL}/assets/images/wait-camera-off.png`
            }
            alt="camera"
            className="h-[23px]"
          />
        </button>
        <button onClick={toggleMic}>
          <img
            src={
              micEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/wait-mic-on.png`
                : `${process.env.PUBLIC_URL}/assets/images/wait-mic-off.png`
            }
            alt="mic"
            className="h-[28px]"
          />
        </button>
        <button onClick={toggleSpeaker}>
          <img
            src={
              speakerEnabled
                ? `${process.env.PUBLIC_URL}/assets/images/wait-speaker-on.png`
                : `${process.env.PUBLIC_URL}/assets/images/wait-speaker-off.png`
            }
            alt="speaker"
            className="h-[26px]"
          />
        </button>
      </div>
      <p className="mt-4 text-gray-500 text-[14px]">
        스터디 룸에 입장하기 전에 필요한 설정을 확인하세요 !
      </p>
      <button
        className={`mt-10 rounded-[20px] w-[86px] h-[46px] 
        text-[20px] shadow-2xl bg-[#4659aa] text-white`}
        // ${
        //   cameraEnabled && microphoneEnabled
        //     ? "bg-[#4659aa] text-white"
        //     : "bg-gray-400 text-gray-700 cursor-not-allowed"
        // }
        // onClick={cameraEnabled && microphoneEnabled ? handleClick : undefined}
        // disabled={!cameraEnabled || !microphoneEnabled}
        onClick={handleClick}
      >
        입장
      </button>
      {(!cameraEnabled || !microphoneEnabled) && permissionsChecked && (
        <p className="text-red-500 text-[14px] mt-2">
          카메라 및 마이크 권한을 허용해주세요. 페이지 새로고침 시 설정이
          반영됩니다.
        </p>
      )}
    </div>
  );
};

export default StudyroomWaitContainer;
