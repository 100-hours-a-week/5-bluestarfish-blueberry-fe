import React from "react";
import BasicHeader from "../components/common/BasicHeader";
import SignupForm from "../components/users/SignupForm";

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BasicHeader />
      {/* 페이지의 나머지 부분을 중앙에 배치하고, flex-grow를 사용하여 남은 공간을 차지 */}
      <div className="flex-grow flex items-center justify-center">
        {/* 로그인 폼과 이미지를 담는 컨테이너, 최대 너비 4xl, 고정된 너비와 높이 지정 */}
        <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-[500px] h-[900px] p-10">
          {/* 큰 화면(md 이상)에서는 flexbox로 자식 요소 배치 (반응형 디자인. SignupForm과 이미지를 나란히 배치하기 위해 필요) */}
          <SignupForm /> {/* 로그인 폼 컴포넌트 삽입 */}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
