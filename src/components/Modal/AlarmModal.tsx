// type AlarmModalProps = {
//   closeModal: () => void;
// };

// const AlarmModal: React.FC<AlarmModalProps> = ({ closeModal }) => {
//   const handleModalClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // 모달 안쪽 클릭 시 이벤트 전파 막기
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50"
//       onClick={closeModal} // 모달 밖 클릭 시 닫기
//     >
//       <div
//         className="absolute right-32 mt-[75px] w-[250px] h-[270px] bg-white text-black text-[8px] rounded-[20px] shadow-lg p-2 space-y-1"
//         onClick={handleModalClick}
//       >
//         <div className="flex items-center m-1 space-x-1">
//           <img
//             src={`${process.env.PUBLIC_URL}/assets/images/bell.png`}
//             alt="Profile"
//             className="h-[10px] rounded-full cursor-pointer"
//           />
//           <div className="text-[10px] font-bold">알림</div>
//         </div>
//         <div className="flex w-full h-[42px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2">
//           <div className="flex items-center space-x-1">
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
//               alt="Profile"
//               className="h-[18.41px] rounded-full cursor-pointer"
//             />
//             <div>'에렬' 님이 친구 요청을 보냈습니다.</div>
//           </div>
//           <div className="space-x-1 text-white text-[6px]">
//             <button className="">
//               <img
//                 src={`${process.env.PUBLIC_URL}/assets/images/trash.png`}
//                 alt="Profile"
//                 className="h-[15px] rounded-full cursor-pointer"
//               />
//             </button>
//           </div>
//         </div>
//         <div className="flex w-full h-[42px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2">
//           <div className="flex items-center space-x-1">
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
//               alt="Profile"
//               className="h-[18.41px] rounded-full cursor-pointer"
//             />
//             <div>'에렬' 님이 친구 요청을 보냈습니다.</div>
//           </div>
//           <div className="space-x-1 text-white text-[6px]">
//             <button className="w-[19px] h-[12px] bg-[#6d81d5] rounded-[5px]">
//               수락
//             </button>
//             <button className="w-[19px] h-[12px] bg-[#eb4c64] rounded-[5px]">
//               거절
//             </button>
//           </div>
//         </div>
//         <div className="flex w-full h-[42px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2">
//           <div className="flex items-center space-x-1">
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
//               alt="Profile"
//               className="h-[18.41px] rounded-full cursor-pointer"
//             />
//             <div>'에렬' 님이 친구 요청을 보냈습니다.</div>
//           </div>
//           <div className="space-x-1 text-white text-[6px]">
//             <button className="w-[19px] h-[12px] bg-[#6d81d5] rounded-[5px]">
//               수락
//             </button>
//             <button className="w-[19px] h-[12px] bg-[#eb4c64] rounded-[5px]">
//               거절
//             </button>
//           </div>
//         </div>
//         <div className="flex w-full h-[42px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2">
//           <div className="flex items-center space-x-1">
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
//               alt="Profile"
//               className="h-[18.41px] rounded-full cursor-pointer"
//             />
//             <div>'에렬' 님이 친구 요청을 보냈습니다.</div>
//           </div>
//           <div className="space-x-1 text-white text-[6px]">
//             <button className="">
//               <img
//                 src={`${process.env.PUBLIC_URL}/assets/images/trash.png`}
//                 alt="Profile"
//                 className="h-[15px] rounded-full cursor-pointer"
//               />
//             </button>
//           </div>
//         </div>
//         <div className="flex w-full h-[42px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2">
//           <div className="flex items-center space-x-1">
//             <img
//               src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
//               alt="Profile"
//               className="h-[18.41px] rounded-full cursor-pointer"
//             />
//             <div>'에렬' 님이 친구 요청을 보냈습니다.</div>
//           </div>
//           <div className="space-x-1 text-white text-[6px]">
//             <button className="w-[19px] h-[12px] bg-[#6d81d5] rounded-[5px]">
//               수락
//             </button>
//             <button className="w-[19px] h-[12px] bg-[#eb4c64] rounded-[5px]">
//               거절
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AlarmModal;


import React, { useEffect } from "react";

type AlarmModalProps = {
  closeModal: () => void;
};

interface Notification {
  id: number;
  message: string;
  type: string;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ closeModal }) => {
  const notifications: Notification[] = [
    { id: 1, message: "'에렬' 님이 친구 요청을 보냈습니다.", type: "request" },
    { id: 2, message: "'에렬' 님이 친구 요청을 보냈습니다.", type: "request" },
    { id: 3, message: "'에렬' 님이 친구 요청을 보냈습니다.", type: "request" },
    { id: 4, message: "'에렬' 님이 친구 요청을 보냈습니다.", type: "request" },
    { id: 5, message: "'에렬' 님이 친구 요청을 보냈습니다.", type: "request" },
    { id: 6, message: "'에렬' 님이 친구 요청을 보냈습니다.", type: "request" },
    { id: 7, message: "'에렬' 님이 친구 요청을 보냈습니다.", type: "request" },
  ];

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 안쪽 클릭 시 이벤트 전파 막기
  };

  // ESC 키로 모달 닫기 기능 추가
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={closeModal} // 모달 밖 클릭 시 닫기
    >
      <div
        className="absolute right-32 mt-[75px] w-[250px] h-[270px] bg-white text-black text-[8px] rounded-[20px] shadow-lg p-2 space-y-1 overflow-y-auto"
        onClick={handleModalClick}
      >
        <div className="flex items-center m-1 space-x-1">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/bell.png`}
            alt="알림 벨"
            aria-label="알림 벨 아이콘"
            className="h-[10px] rounded-full cursor-pointer"
          />
          <div className="text-[10px] font-bold">알림</div>
        </div>

        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex w-full h-[42px] items-center justify-between bg-[#ebeeff] rounded-[10px] p-2"
          >
            <div className="flex items-center space-x-1">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
                alt="프로필 이미지"
                aria-label="프로필 이미지"
                className="h-[18.41px] rounded-full cursor-pointer"
              />
              <div>{notification.message}</div>
            </div>
            <div className="space-x-1 text-white text-[6px]">
              <button className="w-[19px] h-[12px] bg-[#6d81d5] rounded-[5px]">
                수락
              </button>
              <button className="w-[19px] h-[12px] bg-[#eb4c64] rounded-[5px]">
                거절
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmModal;
