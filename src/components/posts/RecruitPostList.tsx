import React from 'react';

interface Post {
  id: number;
  title: string;
  type: string;
  user: {
    nickname: string;
    profileImage?: string | null;
  };
  postCamEnabled: boolean;
  room?: number | null;
  recruited: boolean;
}

interface RecruitPostListProps {
  posts: Post[];
  onPostClick: (postId: number) => void;
}

const RecruitPostList: React.FC<RecruitPostListProps> = ({ posts, onPostClick }) => {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div
          key={post.id}
          onClick={() => onPostClick(post.id)}  // Post 클릭 시 상세 페이지로 이동
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
                  src={post.user.profileImage || `${process.env.PUBLIC_URL}/assets/images/real_ian.png`}
                  alt={post.user.nickname}
                  className="h-5 w-5 rounded-full"
                />
                <span>{post.user.nickname}</span>
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-white ${post.recruited ? 'bg-green-500' : 'bg-gray-400'}`}>
            {post.recruited ? '모집 중' : '모집 완료'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecruitPostList;
