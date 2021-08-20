import { clearLocalStorage, STORAGE } from '../../helpers/storage';
import { commonTypes } from '../types';

const clearHistory = () => {
  clearLocalStorage(STORAGE.CODE);
  return { type: commonTypes.CLEAR_HISTORY };
};

const toggleModal = () => ({ type: commonTypes.TOGGLE_MODAL });

export const commonActions = {
  clearHistory,
  toggleModal,
};
