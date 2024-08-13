import React from 'react';
import BasicHeader from '../components/BasicHeader';
import LoginForm from '../components/LoginForm';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BasicHeader /> {/* 헤더 */}
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full w-[800px] h-[590px]">
          <div className="md:flex">
            <LoginForm /> {/* 로그인 폼 */}
            <div className="md:w-1/2 hidden md:block h-full">
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/bg-sign-in.png`}
                alt="Login Image"
                className="object-cover w-full h-full p-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
