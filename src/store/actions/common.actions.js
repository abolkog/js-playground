import { commonTypes } from '../types';

const clearHistory = () => ({ type: commonTypes.CLEAR_HISTORY });

const toggleModal = () => ({ type: commonTypes.TOGGLE_MODAL });

export const commonActions = {
  clearHistory,
  toggleModal
};
