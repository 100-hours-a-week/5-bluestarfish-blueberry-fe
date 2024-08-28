import React from 'react';

const StudyHeader: React.FC<{
  study: any;
  isRecruited: boolean;
  isAuthor: boolean;
  onCompleteRecruitment: () => void;
  onEditPost: () => void;
  onDeletePost: () => void;
}> = ({ study, isRecruited, isAuthor, onCompleteRecruitment, onEditPost, onDeletePost }) => {
  // 작성일을 포맷팅하여 'YYYY.MM.DD' 형식의 날짜 문자열로 변환
  const formattedDate = study?.createdAt
    ? new Date(study.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    : '';

  // 작성 시간을 포맷팅하여 'HH:MM' 형식의 시간 문자열로 변환
  const formattedTime = study?.createdAt
    ? new Date(study.createdAt).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    })
    : '';

    console.log("study.createdAt:", study.createdAt);



  return (
    <>
      {/* 게시글 제목과 모집 상태를 표시하는 헤더 부분 */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-4 text-black">{study.title}</h1>
        <div className={`px-4 py-2 rounded-full ${isRecruited ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
          {/* 모집 상태에 따라 '모집 중' 또는 '모집 완료'를 표시 */}
          {isRecruited ? '모집 중' : '모집 완료'}
        </div>
      </div>

      {/* 작성자 정보와 캠 상태, 게시글 유형을 표시하는 부분 */}
      <div className="flex justify-between items-center mb-2 text-gray-600">
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 rounded-full ${study.type === 'FINDING_MEMBERS' ? 'bg-purple-200' : 'bg-blue-200'}`}>
            {/* 게시글 유형에 따라 '멤버 찾기' 또는 '룸 찾기'를 표시 */}
            {study.type === 'FINDING_MEMBERS' ? '멤버 찾기' : '룸 찾기'}
          </span>
          <div className="flex items-center space-x-1">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/${study.postCamEnabled ? 'cam-on-icon-blue.png' : 'cam-off-icon-blue.png'}`}
              alt={study.postCamEnabled ? '캠켜공' : '캠끄공'}
              className="h-5 w-5"
            />
            {/* 캠 상태에 따라 '캠켜공' 또는 '캠끄공'을 표시 */}
            <span>{study.postCamEnabled ? '캠켜공' : '캠끄공'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <img src={study.user.profileImage || `${process.env.PUBLIC_URL}/assets/images/real_ian.png`} alt={study.user.nickname} className="h-5 w-5 rounded-full" />
            {/* 작성자의 프로필 이미지와 닉네임을 표시 */}
            <span>{study.user.nickname}</span>
          </div>
        </div>

        {/* 수정, 삭제, 모집 완료 버튼을 표시하는 부분 */}
        <div className="flex space-x-2">
          {isRecruited && isAuthor && (
            <button
              onClick={onCompleteRecruitment}
              className="bg-[#4659AA] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#1A349D]"
            >
              {/* '모집완료로 변경' 버튼은 작성자가 모집 중일 때만 표시 */}
              모집완료로 변경
            </button>
          )}
          {isAuthor && (
            <>
              {isRecruited ? (
                <button
                  onClick={onEditPost}
                  className="bg-[#4659AA] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#1A349D]"
                >
                  {/* '수정' 버튼은 작성자가 모집 중일 때만 표시 */}
                  수정
                </button>
              ) : (
                <div></div> // 모집 완료 상태에서는 빈 div가 렌더링
              )}
              <button
                onClick={onDeletePost}
                className="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-[#C12E44]"
              >
                {/* '삭제' 버튼은 작성자에게 항상 표시 */}
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-500">
        {/* 작성일과 작성 시간을 표시 */}
        작성일: {formattedDate} {formattedTime}
      </div>
    </>
  );
};

export default StudyHeader;
