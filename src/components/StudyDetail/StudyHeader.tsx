import React from "react";

const StudyHeader: React.FC<{
  study: any;
  isRecruited: boolean;
  isAuthor: boolean;
  onCompleteRecruitment: () => void;
  onEditPost: () => void;
  onDeletePost: () => void;
}> = ({
  study,
  isRecruited,
  isAuthor,
  onCompleteRecruitment,
  onEditPost,
  onDeletePost,
}) => {
    // 작성일을 포맷팅하여 'YYYY.MM.DD' 형식의 날짜 문자열로 변환
    const formattedDate = study?.createdAt
      ? new Date(study.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      : "";

    // 작성 시간을 포맷팅하여 'HH:MM' 형식의 시간 문자열로 변환
    const formattedTime = study?.createdAt
      ? new Date(study.createdAt).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
      })
      : "";
    return (
      <>

        {/* 게시글 제목과 모집 상태를 표시하는 헤더 부분 */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-black">{study.title}</h1>
          <div
            className={`px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full ${isRecruited ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}
          >
            {isRecruited ? "모집 중" : "모집 완료"}
          </div>
        </div>

        {/* 작성자 정보와 캠 상태, 게시글 유형을 표시하는 부분 */}
        <div className="flex justify-between items-center mb-2 text-gray-600">
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
            <span
              className={`px-1 py-0.5 sm:px-2 sm:py-1 md:px-2 md:py-1 rounded-full ${study.type === "FINDING_MEMBERS" ? "bg-purple-200" : "bg-blue-200"
                }`}
            >
              {study.type === "FINDING_MEMBERS" ? "멤버 찾기" : "룸 찾기"}
            </span>
            <div className="flex items-center space-x-1">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/${study.postCamEnabled ? "cam-on-icon-blue.png" : "cam-off-icon-blue.png"
                  }`}
                alt={study.postCamEnabled ? "캠켜공" : "캠끄공"}
                className="h-4 w-4 sm:h-5 sm:w-5"
              />
              <span className="text-xs sm:text-sm">{study.postCamEnabled ? "캠켜공" : "캠끄공"}</span>
            </div>
            <div className="flex items-center space-x-1">
              <img
                src={
                  study.userResponse.profileImage ||
                  `${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`
                }
                alt={study.userResponse.nickname}
                className="h-4 w-4 sm:h-5 sm:w-5 rounded-full"
              />
              <span className="text-xs sm:text-sm">{study.userResponse.nickname}</span>
            </div>
          </div>

          {/* 수정, 삭제, 모집 완료 버튼을 표시하는 부분 */}
          <div className="flex space-x-1 sm:space-x-2">
            {isRecruited && isAuthor && (
              <button
                onClick={onCompleteRecruitment}
                className="bg-[#4659AA] text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full shadow-md hover:bg-[#1A349D]"
              >
                모집완료로 변경
              </button>
            )}
            {isAuthor && (
              <>
                {isRecruited ? (
                  <button
                    onClick={onEditPost}
                    className="bg-[#4659AA] text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full shadow-md hover:bg-[#1A349D]"
                  >
                    수정
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  onClick={onDeletePost}
                  className="bg-red-500 text-white py-1 px-2 sm:py-2 sm:px-4 rounded-full shadow-md hover:bg-[#C12E44]"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          작성일: {formattedDate} {formattedTime}
        </div>
      </>
    );
  };

export default StudyHeader;
