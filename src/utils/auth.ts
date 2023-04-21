import { User } from 'src/types/user.type';

export const LocalStorageEventTarget = new EventTarget();

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || '';
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || '';

export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token);
};

export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token);
};

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('profile');
  const eventClearLS = new Event('clearLS');
  LocalStorageEventTarget.dispatchEvent(eventClearLS);
};

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile');
  return !result ? null : JSON.parse(result);
};

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile));
};
