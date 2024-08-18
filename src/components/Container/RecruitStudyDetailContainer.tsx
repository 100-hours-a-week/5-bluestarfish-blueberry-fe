import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import studyRecruitData from '../../data/studyRecruitData';
import studyRooms from '../../data/studyRooms';
import StudyroomTN from '../StudyroomTN';

const StudyroomContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{ id: number, text: string, author: string }[]>([]);

  if (!id) {
    return <div>유효한 ID를 제공해 주세요.</div>;
  }

  const studyId = parseInt(id, 10);
  const study = studyRecruitData.find((item) => item.id === studyId);
  const studyRoom = studyRooms.find((item) => item.id === 1);

  if (!study) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: comment, author: '현재 사용자' }]);
      setComment('');
    }
  };

  const handleNavigateToRoom = () => {
    navigate(`/study-room/${study.roomId}`);
  };

  const handleEditPost = () => {
    // 게시글 수정 로직
  };

  const handleDeletePost = () => {
    // 게시글 삭제 로직
  };

  // 작성일 포맷팅
  const formattedDate = new Date(study.createdAt * 1000).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedTime = new Date(study.createdAt * 1000).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="container mx-auto mt-8 p-4 mt-[100px] w-[1000px] h-full">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold mb-4 text-black">{study.title}</h1>
        <div className={`px-4 py-2 rounded-full ${study.isRecruited ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
          {study.isRecruited ? '모집 중' : '모집 완료'}
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
          <button
            onClick={handleEditPost}
            className="bg-[#4659AA] text-white py-2 px-4 rounded-full shadow-md hover:bg-[#1A349D]"
          >
            수정
          </button>
          <button
            onClick={handleDeletePost}
            className="bg-red-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-[#C12E44]"
          >
            삭제
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        작성일: {formattedDate} {formattedTime}
      </div>

      <div className="mt-8 mb-8">
        <p className="p-4 bg-white border-t border-b text-black">{study.content}</p>
      </div>

      <div className="mb-8">
        <div className="text-black font-bold mb-3">스터디 룸 바로가기</div>
        {studyRoom ? (
          <StudyroomTN
            title={studyRoom.title}
            camEnabled={studyRoom.camEnabled}
            currentUsers={studyRoom.users.length}
            maxUsers={studyRoom.maxUsers}
            thumbnail={studyRoom.thumbnail}
            isSelected={false}
          />
        ) : (
          <div>스터디 룸 정보를 찾을 수 없습니다.</div>
        )}
      </div>

      {/* 댓글 입력 및 버튼 영역 */}
      <div className="mb-6">
        <section className="relative w-full mb-20">
          <textarea
            className="w-full p-2 border-2 border-[#E0E7FF] rounded-lg bg-white resize-none focus:outline-none text-black"
            rows={3}
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
          />

          <button
            className="absolute -bottom-10 right-2 bg-[#E0E7FF] text-[#4659AA] py-1 px-3 rounded-full shadow-md hover:bg-[#6D81D5] hover:text-white"
            onClick={handleCommentSubmit}
          >
            댓글 등록
          </button>
        </section>
      </div>

      {/* 댓글 목록 */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white border border-gray-300 p-4 rounded-lg mb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="font-bold text-sm">{comment.author}</div>
                  <div className="text-xs text-gray-500">방금 전</div>
                </div>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
              // onClick={() => handleDeleteComment(comment.id)}
              >
                삭제
              </button>
            </div>
            <div className="text-sm text-gray-800">{comment.text}</div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default StudyroomContainer;
