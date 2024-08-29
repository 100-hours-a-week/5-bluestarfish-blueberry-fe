import { useDeviceStore } from "../../store/store";
import { useRef, useEffect } from "react";

type LargeUserDisplayProps = {
  backgroundImage: string;
};

const LargeUserDisplay: React.FC<LargeUserDisplayProps> = ({
  backgroundImage,
}) => {
  const { camEnabled, speakerEnabled } = useDeviceStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (camEnabled) {
      // 카메라가 켜졌을 때 로컬 비디오 스트림을 가져와서 비디오 요소에 설정
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((error) => {
          console.error("Error accessing camera: ", error);
        });
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          (videoRef.current.srcObject as MediaStream)
            .getTracks()
            .forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
      };
    } else {
      // 카메라가 꺼졌을 때 비디오 스트림을 제거
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [camEnabled]);

  return (
    <div
      className="w-[800px] h-[450px] bg-cover rounded-[20px] shadow-lg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {camEnabled && (
        <video
          className="w-full h-full object-cover rounded-[20px] transform scale-x-[-1]"
          ref={videoRef}
          autoPlay
          muted
        />
      )}
    </div>
  );
};

export default LargeUserDisplay;
