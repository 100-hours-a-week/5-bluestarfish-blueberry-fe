import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import DeletePostModal from '../common/DeletePostModal';

// Comment 인터페이스: 각 댓글의 구조를 정의
interface Comment {
  id: number;
  text: string;
  author: string;
  userId: number;
  createdAt: number | null;
  profileImage: string | null;
  mentionedUser: { id: number; nickname: string } | null;
}

// CommentSection 컴포넌트의 props 타입 정의
interface CommentSectionProps {
  comments: Comment[]; // 댓글 배열
  isRecruited: boolean; // 모집 중인지 여부
  onSubmitComment: (comment: string) => void; // 댓글 제출 함수
  onMention: (authorId: number | null) => void; // 멘션 처리 함수
  currentUser: any; // 현재 로그인된 사용자 정보
  postId: number; // 게시글 ID
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  isRecruited,
  onSubmitComment,
  onMention,
  currentUser,
  postId,
}) => {
  const [comment, setComment] = useState(''); // 입력된 댓글 텍스트 상태
  const [visibleComments, setVisibleComments] = useState<number>(10); // 현재 화면에 보이는 댓글 수
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false); // 삭제 모달 표시 여부
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null); // 삭제할 댓글 ID
  const [mention, setMention] = useState<string | null>(null); // 멘션된 사용자 이름

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // 댓글 입력 시 호출되는 함수
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);

    // @를 입력하면 멘션을 자동으로 인식하여 설정
    const mentionPattern = /@([\w가-힣]+)/;
    const match = mentionPattern.exec(value);

    if (match) {
      const username = match[1];
      const mentionedComment = comments.find(
        (comment) => comment.author === username && comment.userId !== currentUser?.id
      );

      if (mentionedComment) {
        setMention(username);
        onMention(mentionedComment.userId); // 상위 컴포넌트에 멘션된 사용자 ID 전달
        setComment(value.replace(mentionPattern, '').trim());
      }
    }
  };

  // 댓글 제출 시 호출되는 함수
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onSubmitComment(comment.trim()); // 상위 컴포넌트에 댓글을 전달
      setComment(''); // 댓글 입력란 초기화
      setMention(null); // 멘션 초기화
    }
  };

  // 댓글을 클릭할 때 멘션을 처리하는 함수
  const handleMentionClick = (comment: Comment) => {
    if (isRecruited && comment.userId !== currentUser?.id) {
      setMention(comment.author); // 자신이 아닌 경우에만 멘션
      onMention(comment.userId); // 멘션된 사용자 ID를 상위 컴포넌트에 전달
    }
  };

  // 멘션 취소를 처리하는 함수
  const handleCancelMention = () => {
    setMention(null);
    onMention(null); // 상위 컴포넌트의 멘션 ID도 초기화
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteClick = (commentId: number) => {
    setSelectedCommentId(commentId);
    setShowDeleteModal(true);
  };

  // 댓글 삭제를 확정하는 함수 (모달에서 확인 버튼 클릭 시)
  const handleDeleteConfirm = async () => {
    if (selectedCommentId !== null) {
      try {
        await axiosInstance.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/posts/comments/${postId}/${selectedCommentId}`
        );
        console.log(`댓글 ID ${selectedCommentId}가 삭제되었습니다.`);
        window.location.reload();
      } catch (error) {
        console.error('댓글 삭제 실패:', error);
        alert('댓글 삭제에 실패했습니다.');
      } finally {
        setShowDeleteModal(false);
        setSelectedCommentId(null);
      }
    }
  };

  // 스크롤 이벤트를 감지하여 화면에 보이는 댓글 수를 증가시키는 함수
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setVisibleComments((prev) => prev + 10); // 스크롤이 끝에 가까워지면 10개의 댓글을 추가로 표시
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="mb-6">
      <section className="relative w-full mb-20">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          내용 <span className="text-gray-400 text-xs pl-1">({comment.length} / 20)</span>
        </label>

        <div className="relative">
          <textarea
            className="w-full p-2 border-2 border-[#E0E7FF] rounded-lg bg-white resize-none focus:outline-none text-black"
            rows={3}
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요."
            maxLength={20} // 최대 20자
            disabled={!isRecruited} // 모집이 완료된 경우 댓글 입력 불가
            ref={textAreaRef}
            style={{ paddingBottom: '2rem', paddingLeft: '0.5rem' }}
          />

          {/* 멘션 표시 섹션 */}
          {mention && (
            <div className="absolute bottom-3 left-2 bg-[#EEEEFF] text-[#A36DDA] px-2 py-1 rounded flex items-center">
              <span>@{mention}</span>
              <button
                className="ml-2 text-[#A36DDA] hover:text-[#7B46A5]"
                onClick={handleCancelMention}
              >
                x
              </button>
            </div>
          )}
        </div>

        {/* 댓글 등록 버튼 */}
        <button
          className={`absolute -bottom-10 right-2 py-1 px-3 rounded-full shadow-md ${isRecruited
              ? 'bg-[#E0E7FF] text-[#4659AA] hover:bg-[#6D81D5] hover:text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          onClick={handleCommentSubmit}
          disabled={!isRecruited} // 모집이 완료된 경우 버튼 비활성화
        >
          댓글 등록
        </button>
      </section>

      {/* 댓글 목록 섹션 */}
      <div>
        {comments.slice(0, visibleComments).map((comment, index) => (
          <div
            key={`${comment.id}-${index}`} // id와 index를 결합하여 고유한 키 생성
            className="bg-white border border-gray-300 p-4 rounded-lg mb-2"
            onClick={() => handleMentionClick(comment)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={comment.profileImage || `${process.env.PUBLIC_URL}/assets/images/default-profile.png`} alt={comment.author} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="font-bold text-sm">{comment.author}</div>
                  <div className="text-xs text-gray-500">
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }) : '방금'}
                  </div>
                </div>
              </div>
              {currentUser?.id === comment.userId && (
                <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(comment.id)}>
                  삭제
                </button>
              )}
            </div>
            <div className="text-sm text-gray-800">
              {comment.mentionedUser && (
                <span className="bg-[#EEEEFF] text-[#A36DDA] px-1 py-0.5 rounded inline-block">
                  @{comment.mentionedUser.nickname}
                </span>
              )}{' '}
              {comment.text}
            </div>
          </div>
        ))}
      </div>


      {/* 삭제 확인 모달 */}
      {showDeleteModal && (
        <DeletePostModal
          title="댓글을 삭제하시겠습니까?"
          description="삭제된 댓글은 복구할 수 없습니다."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default CommentSection;