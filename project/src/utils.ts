import { AuthorizationStatus } from './const';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const getHoursAndMinutes = (duration: number) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return { hours, minutes };
};

export const getFormatedDuration = (duration: number): string => {
  const { hours, minutes } = getHoursAndMinutes(duration);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

export const formatStarring = (starring: string[]): string => {
  if (starring.length > 4) {
    return `${starring.slice(0, 4).join(', ')} and other`;
  }

  return starring.join(', ');
};

export const formatReviewDate = (date: Date | string): string => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();

  return `${months[month]} ${day}, ${year}`;
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
