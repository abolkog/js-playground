import * as StorageService from 'services/storage';

describe('Storage tests', () => {
  const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

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
});
