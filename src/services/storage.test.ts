import { compress } from 'lz-string';
import { STORAGE } from 'helpers/const';
import * as StorageService from 'services/storage';

jest.mock('../helpers/const', () => {
  const actual = jest.requireActual('../helpers/const');
  return {
    ...actual,
    MAX_HISTORY_SIZE: 2,
  };
});

describe('Storage tests', () => {
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  const today = '2025-05-26';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date(today));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Save value to locale storage', () => {
    StorageService.setLocalStorage('mock', 'value');
    expect(setItemSpy).toHaveBeenCalledWith('mock', 'value');
  });

  it('Get value from locale storage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    StorageService.getLocalStorage('value');
    expect(getItemSpy).toHaveBeenCalledWith('value');
  });

  it('use fallback/default value when nothing found in localstorage', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
    const defaultValue = 'default';
    const result = StorageService.getLocalStorage('value', defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('Remove value from locale storage', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    StorageService.clearLocalStorage('value');
    expect(removeItemSpy).toHaveBeenCalledWith('value');
  });

  describe('getHistory', () => {
    const mockCode = 'console.log(1)';
    beforeEach(jest.clearAllMocks);

    it('return empty array when no history found', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);
      const result = StorageService.getHistory();
      expect(result).toEqual([]);
    });

    it('return history result', () => {
      const mockHistory = [
        { code: 'test', date: today },
        { code: 'test2', date: today },
      ];
      jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValueOnce(JSON.stringify(mockHistory));
      const result = StorageService.getHistory();
      expect(result.length).toEqual(mockHistory.length);
    });

    it('save code to history', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

      StorageService.saveToHistory(mockCode);
      expect(setItemSpy).toHaveBeenCalledWith(
        STORAGE.HISTORY,
        JSON.stringify([{ code: compress(mockCode), date: today }]),
      );
    });

    it('remove oldest item in history if max reached', () => {
      jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(
        JSON.stringify([
          { code: compress('console.log(2)'), date: today },
          { code: compress('console.log(3)'), date: today },
          { code: compress('console.log(4)'), date: today },
        ]),
      );

      StorageService.saveToHistory(mockCode);
      expect(setItemSpy).toHaveBeenCalledWith(
        STORAGE.HISTORY,
        JSON.stringify([
          { code: compress('console.log(3)'), date: today },
          { code: compress('console.log(4)'), date: today },
          { code: compress(mockCode), date: today },
        ]),
      );
    });

    it('does not save code to history if it already exist', () => {
      const mockCode = 'console.log(1)';
      jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValueOnce(
          JSON.stringify([{ code: compress(mockCode), date: today }]),
        );

      StorageService.saveToHistory(mockCode);
      expect(setItemSpy).not.toHaveBeenCalled();
    });
  });
});
