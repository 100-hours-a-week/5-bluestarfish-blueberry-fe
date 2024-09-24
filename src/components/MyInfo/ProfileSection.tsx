import React from "react";

interface ProfileSectionProps {
  profileImagePreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileImageError: string;
  currentUser: any;
  defaultProfileImage: string;
  isEditing: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  profileImagePreview,
  handleFileChange,
  profileImageError,
  defaultProfileImage,
  isEditing,
}) => {
  return (
    <div className="flex flex-col items-center mb-8 w-full relative">
      <div className="w-full text-left mb-2">
        <span className="text-[#4659AA] bg-[#EEEEFF] px-3 py-1 rounded-full shadow-md">
          프로필사진
        </span>
      </div>
      <div className="bg-gray-100 rounded-full shadow-md relative">
        <img
          src={profileImagePreview || defaultProfileImage}
          alt="프로필사진"
          className="w-32 h-32 rounded-full object-cover cursor-pointer"
          onClick={() => document.getElementById("profileImageInput")?.click()}
        />
        {isEditing && (
          <>
            <input
              id="profileImageInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            {profileImageError && (
              <p
                className={`absolute top-full text-xs italic mt-1 ${
                  profileImageError === "통과"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                {profileImageError}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
