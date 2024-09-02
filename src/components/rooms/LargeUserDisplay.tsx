import { useDeviceStore } from "../../store/store";
import { useRef, useEffect, useState } from "react";

type LargeUserDisplayProps = {
  backgroundImage: string;
};

const LargeUserDisplay: React.FC<LargeUserDisplayProps> = ({
  backgroundImage,
}) => {
  const { camEnabled } = useDeviceStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const setupStream = async () => {
      try {
        // 스트림 요청
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);

        // 스트림을 비디오 요소에 설정
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error("Error accessing media devices: ", error);
      }
    };

    setupStream();

    // 컴포넌트 언마운트 시 스트림 종료
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // camEnabled가 변경될 때 비디오 요소의 표시 여부를 업데이트
    if (videoRef.current) {
      if (camEnabled) {
        videoRef.current.style.display = "block";
      } else {
        videoRef.current.style.display = "none";
      }
    }
  }, [camEnabled]);

  return (
    <div
      className="w-[800px] h-[450px] bg-cover rounded-[20px] shadow-lg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <video
        className="w-full h-full object-cover rounded-[20px] transform scale-x-[-1]"
        ref={videoRef}
        autoPlay
        muted
        style={{ display: camEnabled ? "block" : "none" }} // camEnabled가 true일 때만 비디오 표시
      />
    </div>
  );
};

export default LargeUserDisplay;
