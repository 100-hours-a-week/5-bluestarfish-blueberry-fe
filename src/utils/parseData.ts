export function parseDate(dateString: string): string {
  const targetDate = new Date(dateString);
  const now = new Date();

  // 오늘 날짜와 비교하기 위한 날짜 설정 (시간을 00:00:00으로 초기화)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const targetDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  // 날짜를 밀리초로 변환하여 비교
  const diffTime = today.getTime() - targetDay.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 오늘이면 "HH:MM" 형식으로 반환
  if (diffDays === 0) {
    const hours = String(targetDate.getHours()).padStart(2, "0");
    const minutes = String(targetDate.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  // 오늘이 아니면 "N일 전 HH:MM" 형식으로 반환
  const hours = String(targetDate.getHours()).padStart(2, "0");
  const minutes = String(targetDate.getMinutes()).padStart(2, "0");
  return `${diffDays}일 전 ${hours}:${minutes}`;
}

// 예시 사용법
const date = "2024-09-25 11:48:42";
console.log(parseDate(date)); // 결과 예시: "11:48" 또는 "1일 전 11:48"
