import { getLocalStorage, STORAGE } from '../../helpers/storage';
import { codeTypes, commonTypes } from '../types';

const INITIAL_STATE = {
  code: getLocalStorage(STORAGE.CODE),
  sample: '',
  sampleName: '',
  result: [],
  error: '',
  loading: false,
  theme: 'vs-dark',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case codeTypes.CODE_RUNNING:
      return { ...state, loading: true };
    case codeTypes.UPDATE_CODE:
      return { ...state, code: action.payload, loading: false };
    case codeTypes.CODE_RUN_SUCCESS:
      const { result } = state;
      result.push(action.payload);
      return { ...state, result, error: '', loading: false };
    case codeTypes.CODE_RUN_ERROR:
      return { ...state, error: action.payload, result: [], loading: false };
    case commonTypes.CLEAR_HISTORY:
      return { ...state, sample: '', sampleName: '', result: [] };
    case commonTypes.CLEAR_ALL:
      return { ...state, code: '', sample: '', sampleName: '', result: [] };
    case codeTypes.UPDATE_EDITOR_THEME:
      return { ...state, theme: action.payload };
    case codeTypes.LOAD_CODE_SAMPLE:
      const { sample, sampleName } = action.payload;
      return { ...state, sample, sampleName };
    default:
      return state;
  }
};
