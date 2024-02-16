export const formatTime = (time: number) => {
  return `${time < 10 ? `0${time}` : time}`;
};

export const printTimes = (time: number) => {
  const isMinus = time < 0;
  if (isMinus)
    return `- ${formatTime(Math.floor((time * -1) / 60))}:${formatTime((time * -1) % 60)}`;
  return `+ ${formatTime(Math.floor(time / 60))}:${formatTime(time % 60)}`;
};
