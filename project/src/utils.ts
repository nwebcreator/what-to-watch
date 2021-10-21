const getHoursAndMinutes = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return { hours, minutes };
};

const getFormatedDuration = (duration: number): string => {
  const { hours, minutes } = getHoursAndMinutes(duration);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export { getFormatedDuration };
