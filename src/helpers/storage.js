export const STORAGE = {
  CODE: '@abolkog/jscode',
};

export const getLocalStorage = (key, defaultValue = '') => {
  return localStorage.getItem(key) || defaultValue;
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const clearLocalStorage = key => {
  localStorage.removeItem(key);
};
