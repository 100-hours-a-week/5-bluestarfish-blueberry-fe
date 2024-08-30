import React, { useEffect, useRef, useState } from 'react';
import { Post } from '../../types'; // 공통 타입 가져오기

interface RecruitPostListProps {
  posts: Post[];
  onPostClick: (postId: number) => void;
  fetchMorePosts: () => Promise<void>; // 추가 데이터를 불러오는 함수
}

const RecruitPostList: React.FC<RecruitPostListProps> = ({ posts, onPostClick, fetchMorePosts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          await fetchMorePosts();
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, fetchMorePosts]);

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div
          key={post.id}
          onClick={() => onPostClick(post.id)} // Post 클릭 시 상세 페이지로 이동
          ref={index === posts.length - 1 ? lastPostElementRef : null} // 마지막 요소에 ref 추가
          className="flex justify-between items-center p-4 bg-[#FAFAFF] rounded-lg shadow-sm cursor-pointer hover:bg-[#EEEEFF]"
        >
          <div>
            <h3 className="text-xl font-bold truncate max-w-full text-black">
              {post.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <span className={`px-2 py-1 rounded-full ${post.type === 'FINDING_MEMBERS' ? 'bg-purple-200' : 'bg-blue-200'}`}>
                {post.type === 'FINDING_MEMBERS' ? '멤버 찾기' : '룸 찾기'}
              </span>
              <div className="flex items-center space-x-1">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/${post.postCamEnabled ? 'cam-on-icon-blue.png' : 'cam-off-icon-blue.png'}`}
                  alt={post.postCamEnabled ? '캠켜공' : '캠끄공'}
                  className="h-5 w-5"
                />
                <span>{post.postCamEnabled ? '캠켜공' : '캠끄공'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <img
                  src={post.userResponse.profileImage ?? `${process.env.PUBLIC_URL}/assets/images/real_ian.png`} // profileImage가 없을 경우 기본 이미지 사용
                  alt={post.userResponse.nickname}
                  className="h-5 w-5 rounded-full"
                />
                <span>{post.userResponse.nickname}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-white ${post.recruited ? 'bg-green-500' : 'bg-gray-400'}`}>
            {post.recruited ? '모집 중' : '모집 완료'}
          </span>
        </div>
      ))}
      {isLoading && <p>Loading more posts...</p>} {/* 로딩 중일 때 표시 */}
    </div>
  );
};

export default RecruitPostList;
