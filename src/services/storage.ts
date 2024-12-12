import { compress, decompress } from 'lz-string';

const MAX_HISTORY_SIZE = 20;

export const STORAGE = {
  CODE: '@abolkog/jscode',
  HISTORY: 'abolkog/jscode-history',
  THEME: 'abolkog/jscode-theme',
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

export const saveToHistory = (code: string) => {
  const history: HistoryItem[] = JSON.parse(
    localStorage.getItem(STORAGE.HISTORY) || '[]'
  );

  // Compress the code before saving
  const compressedCode = compress(code);

  // Check if the code already exists in the history
  if (!history.some(item => item.code === compressedCode)) {
    const formattedDate = new Date().toISOString().split('T')[0];
    history.push({ code: compressedCode, date: formattedDate });

    if (history.length > MAX_HISTORY_SIZE) {
      history.shift();
    }
    localStorage.setItem(STORAGE.HISTORY, JSON.stringify(history));
  }
};

export const getHistory = (): HistoryItem[] => {
  const history = JSON.parse(localStorage.getItem(STORAGE.HISTORY) || '[]');
  return history.map((item: HistoryItem) => ({
    ...item,
    code: decompress(item.code),
  }));
};
