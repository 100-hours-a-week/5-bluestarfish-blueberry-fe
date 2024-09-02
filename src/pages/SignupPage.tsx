import React from "react";
import BasicHeader from "../components/common/BasicHeader";
import SignupForm from "../components/users/SignupForm";

type SignupPageProps = {};

const SignupPage: React.FC<SignupPageProps> = () => {
  return (
    // 페이지 전체를 flexbox로 구성하여 세로 방향으로 요소를 배치
    <div className="flex flex-col min-h-screen bg-white">
      <BasicHeader /> {/* 헤더 컴포넌트 삽입 */}
      {/* 페이지의 나머지 부분을 중앙에 배치하고, flex-grow를 사용하여 남은 공간을 차지 */}
      <div className="flex-grow flex items-center justify-center">
        {/* 회원가입 폼과 이미지를 담는 컨테이너, 최대 너비 4xl, 고정된 너비와 높이 지정 */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full w-[800px] h-[600px]">
          {/* 큰 화면(md 이상)에서는 flexbox로 자식 요소 배치 (반응형 디자인. SignupForm과 이미지를 나란히 배치하기 위해 필요) */}
          <div className="md:flex">

            {/* md 크기 이상에서만 표시되는 이미지 영역 (회원가입 폼 옆에 배치) */}
            <div className="md:w-1/2 hidden md:block h-full">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/bg-sign-up.png`}
                alt="Signup Image"
                className="object-cover object-center w-full h-full p-0 opacity-75"
              />
            </div>

            <SignupForm /> {/* 회원가입 폼 컴포넌트 삽입 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
