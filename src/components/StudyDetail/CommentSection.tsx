import React, { useState, useEffect } from 'react';

interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: number;
  profileImage: string;
}

interface CommentSectionProps {
  comments: Comment[];
  isRecruited: boolean;
  onSubmitComment: (comment: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, isRecruited, onSubmitComment }) => {
  const [comment, setComment] = useState('');
  const [visibleComments, setVisibleComments] = useState<number>(10); // 현재 화면에 보이는 댓글 수

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 20) {
      setComment(value);
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onSubmitComment(comment);
      setComment('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setVisibleComments(prev => prev + 10);
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
        <textarea
          className="w-full p-2 border-2 border-[#E0E7FF] rounded-lg bg-white resize-none focus:outline-none text-black"
          rows={3}
          value={comment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요."
          maxLength={20}
          disabled={!isRecruited}
        />

        <button
          className={`absolute -bottom-10 right-2 py-1 px-3 rounded-full shadow-md ${isRecruited ? 'bg-[#E0E7FF] text-[#4659AA] hover:bg-[#6D81D5] hover:text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          onClick={handleCommentSubmit}
          disabled={!isRecruited}
        >
          댓글 등록
        </button>
      </section>

      <div>
        {comments.slice(0, visibleComments).map((comment) => (
          <div key={comment.id} className="bg-white border border-gray-300 p-4 rounded-lg mb-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={comment.profileImage} alt={comment.author} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <div className="font-bold text-sm">{comment.author}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(comment.createdAt * 1000).toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-700">삭제</button>
            </div>
            <div className="text-sm text-gray-800">{comment.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
