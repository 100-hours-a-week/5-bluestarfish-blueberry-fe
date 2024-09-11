import React from "react";
import UserInfo from "../rooms/UserInfo";
import { useUserStore } from "../../store/userStore";

const UserInfoContainer: React.FC = () => {
  const { users } = useUserStore();
  return (
    <div className="flex flex-col items-center gap-2 m-4">
      {/* users 배열을 map으로 순회하면서 각 사용자의 정보를 UserInfo에 전달 */}
      {users.map((user) => (
        <UserInfo
          key={user.id} // 각 UserInfo 컴포넌트에 고유한 key 값 추가
          nickname={user.nickname}
          profileImage={user.profileImage}
          camEnabled={user.camEnabled}
          micEnabled={user.micEnabled}
        />
      ))}
    </div>
  );
};

export default UserInfoContainer;
