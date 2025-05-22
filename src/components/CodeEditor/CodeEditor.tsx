import { useContext, useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import useCodeRunner from 'hooks/useCodeRunner';

const CodeEditor: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorRef = useRef(null);
  const { runCode } = useCodeRunner();

  const initEditor = () => {
    const editorConfig = {
      value: '',
      language: 'typescript',
      fontSize: 20,
      theme: 'vs-dark',
      minimap: {
        enabled: false,
      },
    };

    const editorInstance = monaco.editor.create(
      editorRef.current!,
      editorConfig,
    );

    monaco.editor.setModelLanguage(editorInstance.getModel()!, 'typescript');

    editorInstance.layout();

    editorInstance.addAction({
      id: 'run-code',
      label: 'Run The Code',
      keybindings: [monaco.KeyMod.CtrlCmd + monaco.KeyCode.KeyK],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => runCode(editorInstance.getValue()),
    });

    editorInstance.addAction({
      id: 'clear-result',
      label: 'Clear Result',
      keybindings: [monaco.KeyMod.CtrlCmd + monaco.KeyCode.KeyL],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1,
      run: () => dispatch({ type: AppActions.CLEAR_RESULT }),
    });

    editorInstance.onDidChangeModelContent(() => {
      dispatch({
        type: AppActions.UPDATE_CODE,
        payload: editorInstance.getValue(),
      });
    });

    editorInstance.setValue(state.code);
    setEditor(editorInstance);
  };

  useEffect(() => {
    if (editorRef && !editor) {
      initEditor();
    }

    return () => editor?.dispose();
  }, [editorRef.current]);

  useEffect(() => {
    editor?.setValue(state.codeSample);
  }, [state.codeSample]);

  return <div ref={editorRef} style={{ width: '100%', height: '100%' }} />;
};

export default CodeEditor;
