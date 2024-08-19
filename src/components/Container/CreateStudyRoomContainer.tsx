import React, { useState } from 'react';

const CreateStudyRoomPage: React.FC = () => {
  const [studyRoomName, setStudyRoomName] = useState('');
  const [maxUsers, setMaxUsers] = useState<number | null>(null);
  const [category, setCategory] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 유효성 검사 함수들
  const validateStudyRoomName = () => {
    if (!studyRoomName) {
      setErrors(prev => ({ ...prev, studyRoomName: '스터디룸 이름을 입력해주세요.' }));
      return false;
    } else if (studyRoomName.length < 2 || studyRoomName.length > 15) {
      setErrors(prev => ({ ...prev, studyRoomName: '스터디룸 이름은 2자 이상, 15자 이하여야 합니다.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, studyRoomName: '' }));
    return true;
  };

  const validateMaxUsers = () => {
    if (!maxUsers) {
      setErrors(prev => ({ ...prev, maxUsers: '최대 인원을 선택해주세요.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, maxUsers: '' }));
    return true;
  };

  const validateThumbnail = () => {
    if (thumbnail && !['image/jpeg', 'image/png'].includes(thumbnail.type)) {
      setErrors(prev => ({ ...prev, thumbnail: '이미지 파일은 JPG, JPEG, PNG 형식이어야 합니다.' }));
      return false;
    } else if (thumbnail && thumbnail.size > 3 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, thumbnail: '이미지 파일 크기는 최대 5MB입니다.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, thumbnail: '' }));
    return true;
  };

  const validatePassword = () => {
    const passwordRegex = /^[a-zA-Z0-9]*$/; // 영문과 숫자만 허용하는 정규식
    if (password && (password.length < 4 || password.length > 20)) {
      setErrors(prev => ({ ...prev, password: '암호는 4자 이상, 20자 이하여야 합니다.' }));
      return false;
    } else if (password && !passwordRegex.test(password)) {
      setErrors(prev => ({ ...prev, password: '영문 혹은 숫자만 입력해주세요.' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '' }));
    return true;
  };

  const validateForm = () => {
    return (
      validateStudyRoomName() &&
      validateMaxUsers() &&
      validateThumbnail() &&
      validatePassword()
    );
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // 스터디룸 생성 로직
      console.log('스터디룸 생성 성공');
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center bg-white mt-[100px] mb-[30px]">
      <h1 className="text-2xl font-bold mb-8 text-black">📚 스터디룸 만들기 📚</h1>
      <div className="w-full max-w-3xl">

        {/* 스터디룸 이름 입력 필드 */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="studyRoomName">
            스터디룸 이름 <img src={`${process.env.PUBLIC_URL}/assets/images/blueberry-icon.png`} className='w-[25px] h-[25px]'/><span className="text-gray-400 text-xs pl-1">({studyRoomName.length} / 15)</span>
          </label>
          <input
            id="studyRoomName"
            type="text"
            maxLength={15}
            value={studyRoomName}
            onChange={(e) => setStudyRoomName(e.target.value)}
            onBlur={validateStudyRoomName}
            placeholder="스터디룸 이름을 입력해주세요."
            className="input peer input-alt w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 pb-3 mb-3"
          />
          <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-3"></span>
          {errors.studyRoomName && <p className="text-red-500 text-xs italic">{errors.studyRoomName}</p>}
        </div>

        {/* 최대 인원 설정 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-m font-bold mb-2">최대 인원 설정 *</label>
          <div className="flex space-x-2">
            {[2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => setMaxUsers(num)}
                className={`py-2 px-4 rounded border ${maxUsers === num ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {num}명
              </button>
            ))}
          </div>
          {errors.maxUsers && <p className="text-red-500 text-xs italic">{errors.maxUsers}</p>}
        </div>

        {/* 카테고리 선택 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-m font-bold mb-2">카테고리</label>
          <div className="flex space-x-2">
            {['캠켜공', '캠끄공'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory([...category, cat])}
                className={`py-2 px-4 rounded border ${category.includes(cat) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 대표 이미지 업로드 */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="thumbnail">
            대표 이미지
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files ? e.target.files[0] : null)}
            onBlur={validateThumbnail}
            className="input peer input-alt w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 pb-3 mb-3"
          />
          <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-3"></span>
          {errors.thumbnail && <p className="text-red-500 text-xs italic">{errors.thumbnail}</p>}
        </div>

        {/* 암호 설정 */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="password">
            암호 설정 <span className="text-gray-400 text-xs pl-1">(선택 사항)</span>
          </label>
          <input
            id="password"
            type="text"
            maxLength={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            placeholder="스터디룸 암호를 입력해주세요."
            className="input peer input-alt w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 pb-3 mb-3"
          />
          <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-3"></span>
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

        {/* 스터디 소개 */}
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-m font-bold mb-2" htmlFor="description">
            스터디 소개 <span className="text-gray-400 text-xs pl-1">({description.length} / 100)</span>
          </label>
          <textarea
            id="description"
            maxLength={100}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="스터디룸을 소개해주세요."
            rows={5}
            className="input peer input-alt h-full w-full border-b-[1px] border-none bg-transparent focus:outline-none focus:ring-0 resize-none"
          />
          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#A98BFF] transition-all duration-700 ease-in-out peer-focus:w-full mb-6"></span>
        </div>

        {/* 스터디룸 생성 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded shadow"
        >
          스터디룸 생성
        </button>
      </div>
    </div>
  );
};

export default CreateStudyRoomPage;
