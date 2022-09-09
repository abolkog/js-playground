import { AppAactions, reducer } from 'context/Reducer';

describe('Reducer tests', () => {
  const INITIAL_STATE: AppState = {
    code: '',
    codeSample: '',
    codeSampleName: '',
    result: [],
    error: '',
    loading: false,
    theme: 'vs-dark',
    display: 'none',
    position: null,
    jsonView: '',
  };

  it('update and persist code when update code action is dispatched', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.UPDATE_CODE,
      payload: 'some code',
    });
    expect(state.code).toEqual('some code');
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it('update loading flag when code running action is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.CODE_RUNNING,
    });
    expect(state.loading).toEqual(true);
  });

  it('update result array when code run success action is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.CODE_RUN_SUCCESS,
      payload: 'result',
    });
    expect(state.result[0]).toEqual('result');
  });

  it('clear result array when clear result action is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.CLEAR_RESULT,
    });
    expect(state.result.length).toEqual(0);
  });

  it('update error string when code run error action is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.CODE_RUN_ERROR,
      payload: 'error',
    });
    expect(state.error).toEqual('error');
  });

  it('update about modal flag when toggle modal action is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.TOGGLE_ABOUT_MODAL,
      payload: 'block',
    });
    expect(state.display).toEqual('block');
  });

  it('update theme stgate when toggle theme action is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.TOGGLE_THEME,
      payload: 'vs-light',
    });
    expect(state.theme).toEqual('vs-light');
  });

  it('update code sample value when load code sample action is dispatched', () => {
    const payload = {
      codeSample: 'axios code',
      codeSampleName: 'Axios',
    };
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.LOAD_CODE_SAMPLE,
      payload,
    });
    expect(state.codeSample).toEqual(payload.codeSample);
    expect(state.codeSampleName).toEqual(payload.codeSampleName);
  });

  it('reset values when reset all action is dispatched', () => {
    const state = reducer(INITIAL_STATE, {
      type: AppAactions.RESET_ALL,
    });
    expect(state.loading).toEqual(false);
    expect(state.result.length).toEqual(0);
    expect(state.error).toEqual('');
    expect(state.codeSample).toEqual('');
    expect(state.codeSampleName).toEqual('');
  });

  it('return state if action cannot be handled', () => {
    const state = reducer(INITIAL_STATE, {
      type: 'Unhandled',
    });
    expect(state).toEqual(INITIAL_STATE);
  });
});
