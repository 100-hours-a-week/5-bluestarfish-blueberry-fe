export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
};

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
