import React from 'react';

const StudyHeader: React.FC<{
  study: any;
  isRecruited: boolean;
  isAuthor: boolean;
  onCompleteRecruitment: () => void;
  onEditPost: () => void;
  onDeletePost: () => void;
}> = ({ study, isRecruited, isAuthor, onCompleteRecruitment, onEditPost, onDeletePost }) => {
  const formattedDate = study?.createdAt
    ? new Date(study.createdAt * 1000).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';

  const formattedTime = study?.createdAt
    ? new Date(study.createdAt * 1000).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-4 text-black">{study.title}</h1>
        <div className={`px-4 py-2 rounded-full ${isRecruited ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
          {isRecruited ? '모집 중' : '모집 완료'}
        </div>
      </div>

      <div className="flex justify-between items-center mb-2 text-gray-600">
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 rounded-full ${study.type === 'FINDING_MEMBERS' ? 'bg-purple-200' : 'bg-blue-200'}`}>
            {study.type === 'FINDING_MEMBERS' ? '멤버 찾기' : '룸 찾기'}
          </span>
          <div className="flex items-center space-x-1">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/${study.isCamOn ? 'cam-on-icon-blue.png' : 'cam-off-icon-blue.png'}`}
              alt={study.isCamOn ? '캠켜공' : '캠끄공'}
              className="h-5 w-5"
            />
            <span>{study.isCamOn ? '캠켜공' : '캠끄공'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <img src={study.user.profileImage} alt={study.user.nickname} className="h-5 w-5 rounded-full" />
            <span>{study.user.nickname}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          {isRecruited && isAuthor && (
            <button
              onClick={onCompleteRecruitment}
              className="bg-[#4659AA] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#1A349D]"
            >
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
                  수정
                </button>
              ) : (
                <div></div>
              )}
              <button
                onClick={onDeletePost}
                className="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-[#C12E44]"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-500">
        작성일: {formattedDate} {formattedTime}
      </div>
    </>
  );
};

export default StudyHeader;
