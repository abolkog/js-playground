import { clearLocalStorage, STORAGE } from '../../helpers/storage';
import { commonTypes } from '../types';

const clearHistory = (withCode = false) => {
  const actionType = withCode ? commonTypes.CLEAR_ALL : commonTypes.CLEAR_HISTORY;
  if (withCode) clearLocalStorage(STORAGE.CODE);
  return { type: actionType };
};

const toggleModal = () => ({ type: commonTypes.TOGGLE_MODAL });

const toggleJsonView = () => ({ type: commonTypes.TOGGLE_JSON_VIEW });

export const commonActions = {
  clearHistory,
  toggleModal,
  toggleJsonView,
};
