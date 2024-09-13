export const addOneSecondToTime = (prevTime: string): string => {
  const [hours, minutes, seconds] = prevTime.split(":").map(Number);

  let newSeconds = seconds + 1;
  let newMinutes = minutes;
  let newHours = hours;

  if (newSeconds === 60) {
    newSeconds = 0;
    newMinutes += 1;
  }

  if (newMinutes === 60) {
    newMinutes = 0;
    newHours += 1;
  }

  return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
    2,
    "0"
  )}:${String(newSeconds).padStart(2, "0")}`;
};
