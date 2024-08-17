import React, { useState, useEffect, useRef } from 'react';

interface PostListProps {
  posts: Array<any>;  // 게시글 목록 배열
  handlePostClick: () => void;  // 게시글 클릭 시 호출될 함수
}

const RecruitPostList: React.FC<PostListProps> = ({ posts, handlePostClick }) => {
  const [displayedPosts, setDisplayedPosts] = useState<Array<any>>([]);  // 현재 화면에 표시된 게시글
  const [page, setPage] = useState(1);  // 현재 페이지 번호
  const [loading, setLoading] = useState(false);  // 로딩 상태 관리
  const observer = useRef<IntersectionObserver | null>(null);  // IntersectionObserver를 저장할 ref
  const lastPostElementRef = useRef<HTMLDivElement | null>(null);  // 마지막 게시글 요소를 참조할 ref

  const postsPerPage = 10;  // 한 페이지당 보여줄 게시글 수

  // 페이지 번호나 posts가 변경될 때마다 호출
  useEffect(() => {
    setLoading(true);  // 로딩 상태를 true로 설정
    setTimeout(() => {  // 0.5초 지연 후 실행
      const newPosts = posts.slice(0, page * postsPerPage);  // 현재 페이지에 해당하는 게시글 슬라이스
      setDisplayedPosts(newPosts);  // 화면에 표시될 게시글 업데이트
      setLoading(false);  // 로딩 상태를 false로 설정
    }, 500);  // 0.5초 지연
  }, [page, posts]);  // 페이지나 posts가 변경될 때마다 실행

  // 무한 스크롤을 구현하기 위한 IntersectionObserver 설정
  useEffect(() => {
    if (observer.current) observer.current.disconnect();  // 기존에 연결된 observer 해제

    observer.current = new IntersectionObserver((entries) => {  // 새 IntersectionObserver 생성
      if (entries[0].isIntersecting && displayedPosts.length < posts.length) {  // 마지막 요소가 화면에 보이고 아직 로드할 게시글이 남아있다면
        setLoading(true);  // 로딩 상태를 true로 설정
        setPage((prevPage) => prevPage + 1);  // 페이지 번호 증가
      }
    });

    if (lastPostElementRef.current) {  // 마지막 게시글 요소가 존재하면
      observer.current.observe(lastPostElementRef.current);  // 해당 요소에 observer를 연결
    }

    return () => {  // 컴포넌트가 언마운트될 때 observer 해제
      if (observer.current) observer.current.disconnect();
    };
  }, [displayedPosts, posts]);  // displayedPosts나 posts가 변경될 때마다 실행

  return (
    <div className="space-y-4">
      {displayedPosts.map((post, index) => (
        <div
          key={post.id}  // 각 게시글에 고유한 key 할당
          className="flex justify-between items-center p-4 bg-[#FAFAFF] rounded-lg shadow-sm cursor-pointer hover:bg-[#EEEEFF]"
          onClick={handlePostClick}  // 게시글 클릭 시 handlePostClick 함수 호출
          ref={index === displayedPosts.length - 1 ? lastPostElementRef : null}  // 마지막 게시글 요소에 ref 할당
        >
          <div>
            <h3 className="text-xl font-bold truncate max-w-full">
              {post.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <span className={`px-2 py-1 rounded-full ${post.type === 'FINDING_MEMBERS' ? 'bg-purple-200' : 'bg-blue-200'}`}>
                {post.type === 'FINDING_MEMBERS' ? '멤버 찾기' : '룸 찾기'}  {/* 게시글 타입에 따라 배경색 및 텍스트 결정 */}
              </span>
              <div className="flex items-center space-x-1">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/${post.isCamOn ? 'cam-on-icon-blue.png' : 'cam-off-icon-blue.png'}`}
                  alt={post.isCamOn ? '캠켜공' : '캠끄공'}
                  className="h-5 w-5"
                />
                <span>{post.isCamOn ? '캠켜공' : '캠끄공'}</span>  {/* 캠 상태에 따른 텍스트 표시 */}
              </div>
              <div className="flex items-center space-x-1">
                <img src={post.user.profileImage} alt={post.user.nickname} className="h-5 w-5 rounded-full" />
                <span>{post.user.nickname}</span>  {/* 작성자 프로필 이미지와 닉네임 */}
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-white ${post.isRecruited ? 'bg-green-500' : 'bg-gray-400'}`}>
            {post.isRecruited ? '모집 중' : '모집 완료'}  {/* 모집 상태에 따른 배경색 및 텍스트 */}
          </span>
        </div>
      ))}
      
      {loading && (  // 로딩 중일 때 로딩 표시
        <div className="flex justify-center items-center mt-4">
          <span>Loading more posts...</span>
        </div>
      )}
    </div>
  );
};

export default RecruitPostList;  // 컴포넌트를 기본 내보내기로 설정
