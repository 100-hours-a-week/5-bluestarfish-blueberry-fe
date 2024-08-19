// 이메일 유효성 검사
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// 비밀번호 유효성 검사
export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
};

// 게시글 작성 폼의 각 필드에 대한 유효성 검사
export const validateStudyFormInputs = (
    selectedCategory: string, 
    title: string, 
    content: string, 
    selectedStudy: number | null
): { categoryHelperText: string; titleHelperText: string; contentHelperText: string; studyHelperText: string } => {
    
    let categoryHelperText = '* 통과';
    let titleHelperText = '* 통과';
    let contentHelperText = '* 통과';
    let studyHelperText = '* 통과';

    if (!selectedCategory) {
        categoryHelperText = '스터디 카테고리를 선택하세요.';
    }
    if (!title) {
        titleHelperText = '제목을 입력하세요.';
    }
    if (!content) {
        contentHelperText = '내용을 입력하세요.';
    }
    if (selectedStudy === null) {
        studyHelperText = '나의 스터디를 선택하세요.';
    }

    return { categoryHelperText, titleHelperText, contentHelperText, studyHelperText };
};

// 이메일과 비밀번호를 모두 검증하는 함수
export const validateInputs = (email: string, password: string): string => {
    if (!email && !password) {
        return '이메일과 비밀번호를 입력해주세요.';
    } else if (!email) {
        return '이메일을 입력해주세요.';
    } else if (!password) {
        return '비밀번호를 입력해주세요.';
    }
    if (email.length < 5 && password.length < 5) {
        return '이메일과 비밀번호는 최소 5자리 이상이어야 합니다.';
    } else if (email.length < 5) {
        return '이메일은 최소 5자리 이상이어야 합니다.';
    } else if (password.length < 5) {
        return '비밀번호는 최소 5자리 이상이어야 합니다.';
    }
    if (!isValidEmail(email)) {
        return '유효하지 않은 이메일 형식입니다.';
    }
    if (!isValidPassword(password)) {
        return '유효하지 않은 비밀번호 형식입니다.';
    }
    return '';
};
