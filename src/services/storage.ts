export const STORAGE = {
  CODE: '@abolkog/jscode',
};

export const getLocalStorage = (key: string, defaultValue = '') => {
  return localStorage.getItem(key) || defaultValue;
};

export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
