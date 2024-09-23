import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import TabBar from "../posts/TabBar";
import axiosInstance from "../../utils/axiosInstance";
import ToastNotification from "../common/ToastNotification";
import ProfileSection from "../MyInfo/ProfileSection";
import NicknameSection from "../MyInfo/NicknameSection";
import PasswordSection from "../MyInfo/PasswordSection";
import DeleteModal from "../common/DeleteModal";
import StudyTimeChart from "../MyInfo/StudyTimeChart";
import RecentAndMyStudyRooms from "../MyInfo/RecentStudyRooms";
import {
  validateProfileImage,
  validateNickname,
  validateUserPassword,
  validatePasswordMatch,
} from "../../utils/validation";
import { useLoginedUserStore } from "../../store/store";

const tabData = [
  {
    name: "나의 정보",
    icon: `${process.env.PUBLIC_URL}/assets/images/info-icon.png`,
  },
  {
    name: "나의 스터디",
    icon: `${process.env.PUBLIC_URL}/assets/images/timer-icon.png`,
  },
];

function getErrorMessage(error: unknown): string {
  try {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  } catch (e) {
    return "Unknown error";
  }
}

const MyInfoContainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  ); // 프로필 이미지 미리보기 상태
  const [nicknameHelperText, setNicknameHelperText] = useState<string>("");
  const [nicknameHelperTextColor, setNicknameHelperTextColor] =
    useState<string>("text-red-500");
  const [showNicknameSuccessToast, setShowNicknameSuccessToast] =
    useState(false);
  const [showNicknameErrorToast, setShowNicknameErrorToast] = useState(false);
  const [showProfileUpdateSuccessToast, setShowProfileUpdateSuccessToast] =
    useState(false);
  const [profileImageError, setProfileImageError] = useState("");
  const [nicknameError, setNicknameError] = useState(
    "* 닉네임 중복 검사를 진행해주세요."
  );
  const [passwordError, setPasswordError] = useState("* 헬퍼텍스트");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("* 헬퍼텍스트");
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isValidProfileImage, setIsValidProfileImage] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showDeleteModal, setShowWithdrawModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    nickname: userNickname,
    setUserId,
    setNickname: setUserNickname,
    setProfileImage: setUserProfileImage,
  } = useLoginedUserStore();

  const defaultProfileImage = `${process.env.PUBLIC_URL}/assets/images/gunssakdo.png`; // 기본 프로필 이미지 URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/api/v1/users/whoami`
        );
        setCurrentUser(response.data.data);
        setNickname(response.data.data.nickname);
        setProfileImagePreview(response.data.data.profileImage); // 초기 프로필 이미지 설정
      } catch (error: unknown) {
        console.error(
          "사용자 정보를 가져오는 데 실패했습니다:",
          getErrorMessage(error)
        );
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (profileImage) {
      const validationError = validateProfileImage(profileImage); // 유효성 검사
      setProfileImageError(validationError);
      setIsValidProfileImage(validationError === "통과"); // 유효성 검사 통과 여부 업데이트

      if (validationError === "통과") {
        // 유효성 검사를 통과한 경우 이미지를 미리보기로 업데이트
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImagePreview(reader.result as string); // 이미지를 미리보기로 업데이트
        };
        reader.readAsDataURL(profileImage); // 파일을 읽어서 base64 URL로 변환
      } else {
        // 유효성 검사를 통과하지 못한 경우 기존 프로필 이미지로 되돌림
        setProfileImagePreview(
          currentUser?.profileImage || defaultProfileImage
        );
      }
    } else {
      // 파일이 선택되지 않았을 경우 기본 이미지로 설정
      setProfileImagePreview(currentUser?.profileImage || defaultProfileImage);
      setProfileImageError(""); // 파일이 없을 때 기본 헬퍼 텍스트로 설정
      setIsValidProfileImage(true); // 유효성 검사 실패
    }
  }, [profileImage]);

  useEffect(() => {
    const isFormValidNow =
      isValidNickname &&
      isValidPassword &&
      isPasswordMatch &&
      isValidProfileImage;
    setIsFormValid(isFormValidNow); // 유효성 검사 통과 여부 업데이트
  }, [isValidNickname, isValidPassword, isPasswordMatch, isValidProfileImage]); // 의존성 배열에 유효성 검사 상태 추가

  // 닉네임 중복 검사 함수
  const sendNickname = async (trimmedNickname: string) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/nickname?nickname=${trimmedNickname}`
      );

      if (response.status === 200) {
        setIsValidNickname(true); // 중복 검사에 통과했을 때 유효성 검사 통과
        setNicknameError("사용 가능한 닉네임입니다.");
        setShowNicknameSuccessToast(true);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.message);
        setIsValidNickname(false); // 중복 검사에 실패했을 때 유효성 검사 실패
        setNicknameError("사용할 수 없는 닉네임입니다.");
        setShowNicknameErrorToast(true);
      }
    }
  };

  const handleIsNicknameAvailableButtonClick = async () => {
    const trimmedNickname = nickname.trim();

    if (trimmedNickname === currentUser.nickname) {
      setIsValidNickname(true); // 중복 검사에 통과했을 때 유효성 검사 통과
      setNicknameError("사용 가능한 닉네임입니다.");
      setShowNicknameSuccessToast(true);
      return;
    }

    if (trimmedNickname) {
      sendNickname(trimmedNickname);
    }
  };

  const handleCloseNicknameSuccessToast = () => {
    setShowNicknameSuccessToast(false);
  };

  const handleCloseNicknameErrorToast = () => {
    setShowNicknameErrorToast(false);
  };

  const handleCloseProfileUpdateSuccessToast = () => {
    setIsEditing(false); // 편집 모드 종료
    setShowProfileUpdateSuccessToast(false);
  };

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드로 전환
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameError("* 닉네임 중복 검사를 진행해주세요.");
    const newNickname = e.target.value;
    setNickname(newNickname);
    const validationMessage = validateNickname(newNickname);
    if (validationMessage === "사용 가능한 닉네임입니다.") {
      // setNicknameError("");
    } else {
      setNicknameError(validationMessage);
    }
    setIsValidNickname(false); // 닉네임을 수정하면 중복 검사를 다시 해야 하므로 false로 설정
  };

  const handleCancelClick = () => {
    // 변경 내용 취소 시 초기 상태로 되돌리기
    setIsEditing(false);
    setNickname(currentUser.nickname);
    setPassword("");
    setConfirmPassword("");
    setProfileImagePreview(currentUser.profileImage); // 원래 프로필 이미지로 돌아감
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword === "") {
      setPasswordError("");
      setIsValidPassword(true);
    } else {
      const validationMessage = validateUserPassword(newPassword);
      setPasswordError(validationMessage);
      setIsValidPassword(validationMessage === "");
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    const validationMessage = validatePasswordMatch(
      password,
      newConfirmPassword
    );
    setConfirmPasswordError(validationMessage);
    setIsPasswordMatch(validationMessage === ""); // 비밀번호 일치 여부가 없을 경우 true
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    } else {
      setProfileImage(null);
    }
  };

  const handleSaveClick = () => {
    if (isFormValid) {
      setShowProfileUpdateSuccessToast(true); // 수정 완료 토스트 메시지 띄우기

      // 3초 뒤에 편집 모드를 종료
      setTimeout(() => {
        setIsEditing(false); // 편집 모드 종료
        setShowProfileUpdateSuccessToast(false); // 토스트 메시지 종료
      }, 3000);

      // 실제 유저 정보 수정 로직이 들어갈 자리
    }
  };

  const patchUser = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const formData = new FormData(); // Boolean 값도 문자열로 변환
      if (password) {
        formData.append("password", password);
      }
      if (nickname) {
        formData.append("nickname", nickname);
      }
      if (profileImage && profileImage !== undefined) {
        formData.append("profileImage", profileImage); // 파일이 있는 경우에만 추가
      }

      const response = await axiosInstance.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${currentUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // FormData 전송을 위한 Content-Type 설정
          },
        }
      );
      if (response.status === 204) {
        console.log("204: No Content, 수정 완료");
        setShowProfileUpdateSuccessToast(true);
        navigate(0);
      }
    } catch (error) {
      console.log(error);
      alert("유저데이터 수정 실패");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handleWithdraw = async () => {
    try {
      // 회원 탈퇴 요청
      const response = await axiosInstance.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/users/${currentUser.id}`
      );

      if (response.status === 204) {
        console.log("회원 탈퇴 성공!");

        // 로그아웃 처리를 통해 세션이나 토큰 정리
        await axiosInstance.post(
          `${process.env.REACT_APP_API_URL}/api/v1/auth/logout`
        );

        // 로컬 상태 및 스토어에서 사용자 정보 초기화
        setUserId(0);
        setUserNickname("Guest");
        setUserProfileImage("");

        // 로그인 페이지로 이동
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error("404: ", `A user with ${currentUser.id} not found`);
        } else if (error.response.status === 500) {
          console.error("500: ", "서버 에러");
        }
      } else {
        console.error("회원 탈퇴 실패:", error.message);
      }
      console.error(error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto flex flex-col items-center mt-24 w-full max-w-[1024px] bg-transparent">
      <div className="w-full max-w-[75%]">
        <TabBar
          activeIndex={activeTab}
          setActiveIndex={setActiveTab}
          tabs={tabData}
          pageType="myInfo"
        />
      </div>

      {activeTab === 0 ? (
        // "나의 정보" 화면
        <div className="w-full max-w-3xl p-8 rounded-full flex flex-col items-center justify-center">
          <div className="w-[50%] flex flex-col items-center">
            {/* 프로필 사진 */}
            <div className="container mx-auto flex flex-col items-center">
              <ProfileSection
                profileImagePreview={profileImagePreview}
                handleFileChange={handleFileChange}
                profileImageError={profileImageError}
                currentUser={currentUser}
                defaultProfileImage={defaultProfileImage}
                isEditing={isEditing}
              />
            </div>

            {/* 닉네임 섹션 */}
            <NicknameSection
              nickname={nickname}
              handleNicknameChange={handleNicknameChange}
              nicknameError={nicknameError}
              nicknameHelperTextColor={nicknameHelperTextColor}
              nicknameHelperText={nicknameHelperText}
              handleIsNicknameAvailableButtonClick={
                handleIsNicknameAvailableButtonClick
              }
              isEditing={isEditing}
              currentUser={currentUser}
            />

            {/* 이메일 */}
            {!isEditing ? (
              <div className="mb-8 w-full">
                <div className="w-full text-left mb-2">
                  <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-full shadow-md">
                    이메일
                  </span>
                </div>
                <span className="text-black underline">
                  {currentUser.email.split("@").length - 1 > 1
                    ? currentUser.email.slice(
                        0,
                        currentUser.email.lastIndexOf("@")
                      )
                    : currentUser.email}
                </span>
              </div>
            ) : (
              <span></span>
            )}

            {/* 스터디 누적 시간 */}
            {!isEditing ? (
              <div className="w-full mb-[50px]">
                <div className="w-full text-left mb-2">
                  <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-full shadow-md">
                    스터디 누적 시간
                  </span>
                </div>
                <span className="text-black">24시간 53분</span>
              </div>
            ) : (
              <span></span>
            )}

            {/* 비밀번호 섹션 */}
            <PasswordSection
              password={password}
              confirmPassword={confirmPassword}
              handlePasswordChange={handlePasswordChange}
              handleConfirmPasswordChange={handleConfirmPasswordChange}
              passwordError={passwordError}
              confirmPasswordError={confirmPasswordError}
              isEditing={isEditing}
            />

            {/* 버튼 섹션 */}
            <div className="flex space-x-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancelClick}
                    className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-red-600 mt-8"
                  >
                    취소
                  </button>
                  <button
                    onClick={patchUser}
                    disabled={!isFormValid && !isLoading} // 폼이 유효하지 않으면 버튼 비활성화
                    className={`px-6 py-2 mt-8 rounded-full shadow-lg font-semibold ${
                      isFormValid || isLoading
                        ? "bg-[#4659AA] text-white hover:bg-[#3b4a99]"
                        : "bg-gray-400 text-gray-300 cursor-not-allowed"
                    }`}
                  >
                    수정완료
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-red-600"
                  >
                    회원 탈퇴
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="bg-[#4659AA] text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-[#3b4a99]"
                  >
                    정보 수정
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        // "나의 스터디" 빈 화면
        <div className="w-full max-w-[1024px] p-8 rounded-full flex flex-col items-center justify-center">
          <div className="w-[100%] flex flex-col items-center">
            <StudyTimeChart /> {/* Mock 데이터로 구현한 차트 */}
            <hr />
            <RecentAndMyStudyRooms />{" "}
            {/* 우선은 현재 생성된 스터디룸을 불러오는 방식으로 구현. 실제로는 최근 참여한 스터디룸이 불러와져야 함 */}
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      {showNicknameSuccessToast && (
        <ToastNotification
          message="사용 가능한 닉네임"
          isSuccess={true}
          onClose={handleCloseNicknameSuccessToast}
        />
      )}
      {showNicknameErrorToast && (
        <ToastNotification
          message="사용 불가능한 닉네임"
          isSuccess={false}
          onClose={handleCloseNicknameErrorToast}
        />
      )}
      {showProfileUpdateSuccessToast && (
        <ToastNotification
          message="수정 완료!"
          isSuccess={true}
          onClose={handleCloseProfileUpdateSuccessToast}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          title="탈퇴하시겠습니까?"
          description="탈퇴 후 복구할 수 없습니다."
          onConfirm={handleWithdraw}
          onCancel={() => setShowWithdrawModal(false)}
        />
      )}
    </div>
  );
};

export default MyInfoContainer;
