import React, { useState, useEffect, useRef } from 'react';

interface PostListProps {
  posts: Array<any>;
  handlePostClick: () => void;
}

const RecruitPostList: React.FC<PostListProps> = ({ posts, handlePostClick }) => {
  const [displayedPosts, setDisplayedPosts] = useState<Array<any>>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useRef<HTMLDivElement | null>(null);

  const postsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const newPosts = posts.slice(0, page * postsPerPage);
      setDisplayedPosts(newPosts);
      setLoading(false);
    }, 500); // 0.5초 지연
  }, [page, posts]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && displayedPosts.length < posts.length) {
        setLoading(true);
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (lastPostElementRef.current) {
      observer.current.observe(lastPostElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [displayedPosts, posts]);

  return (
    <div className="space-y-4">
      {displayedPosts.map((post, index) => (
        <div
          key={post.id}
          className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
          onClick={handlePostClick}
          ref={index === displayedPosts.length - 1 ? lastPostElementRef : null}
        >
          <div>
            <h3 className="text-xl font-bold truncate max-w-full">
              {post.title.length > 50 ? `${post.title.substring(0, 50)}...` : post.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <span className={`px-2 py-1 rounded-full ${post.type === 'FINDING_MEMBERS' ? 'bg-purple-200' : 'bg-blue-200'}`}>
                {post.type === 'FINDING_MEMBERS' ? '멤버 찾기' : '룸 찾기'}
              </span>
              <div className="flex items-center space-x-1">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/${post.isCamOn ? 'cam-on-icon.png' : 'cam-off-icon.png'}`}
                  alt={post.isCamOn ? '캠켜공' : '캠끄공'}
                  className="h-5 w-5"
                />
                <span>{post.isCamOn ? '캠켜공' : '캠끄공'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <img src={post.user.profileImage} alt={post.user.nickname} className="h-5 w-5 rounded-full" />
                <span>{post.user.nickname}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-white ${post.isRecruited ? 'bg-green-500' : 'bg-gray-400'}`}>
            {post.isRecruited ? '모집 중' : '모집 완료'}
          </span>
        </div>
      ))}
      
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <span>Loading more posts...</span>
        </div>
      )}
    </div>
  );
};

export default RecruitPostList;
