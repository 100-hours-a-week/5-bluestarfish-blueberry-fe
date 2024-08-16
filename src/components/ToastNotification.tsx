import React, { useEffect, useState } from 'react';

interface ToastNotificationProps {
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer);
          onClose();
          return 0;
        }
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-white shadow-lg rounded-lg flex items-center p-4 w-72">
      <div className="flex items-center">
        <div className="rounded-full w-8 h-8 flex items-center justify-center mr-3">
          <img src={`${process.env.PUBLIC_URL}/assets/images/check-icon.png`} alt="check" className="w-7 h-7" />
        </div>
        <span className="text-black font-medium">{message}</span>
      </div>
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={onClose}
      >
        &#x2715;
      </button>
      <div className="absolute bottom-0 left-0 w-full h-1 rounded-b-lg overflow-hidden">
        <div
          className="bg-[#BDBDFF] h-full"
          style={{ width: `${progress}%`, transition: `width 0.03s linear` }}
        />
      </div>
    </div>
  );
};

export default ToastNotification;
