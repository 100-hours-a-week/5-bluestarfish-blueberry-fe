import React from 'react';

interface PostListProps {
  posts: Array<any>;
  handlePostClick: () => void;
}

const RecruitPostList: React.FC<PostListProps> = ({ posts, handlePostClick }) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
          onClick={handlePostClick}
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
    </div>
  );
};

export default RecruitPostList;
