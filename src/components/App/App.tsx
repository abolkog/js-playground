import Split from 'react-split';
import Editor from '../CodeEditor/CodeEditor';
import Console from 'components/Console';
import { useContext, useEffect } from 'react';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import History from 'components/History';
import About from 'components/About';
import ShareCode from 'components/ShareCode';
import { decompressFromEncodedURIComponent } from 'lz-string';

const App: React.FC = () => {
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    const consoleProxy = console.log;
    console.log = msg => {
      dispatch({ type: AppActions.CODE_RUN_SUCCESS, payload: msg });
      consoleProxy(msg);
    };

    try {
      const params = new URLSearchParams(window.location.search);
      const codeParam = params.get('code');
      if (codeParam) {
        const payload = {
          codeSample: decompressFromEncodedURIComponent(codeParam),
          codeSampleName: 'URL Code',
        };
        dispatch({ type: AppActions.LOAD_CODE_SAMPLE, payload });
      }
    } catch (_) {
      // Ignore errors in URL parsing or decompression
    }
  }, []);

  return (
    <div className="flex flex-col h-screen font-sans scheme-light">
      <Split
        className="flex flex-1 flex-col overflow-hidden"
        sizes={[75, 25]}
        minSize={0}
        expandToMin={true}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
      >
        <div className="bg-[#1e1e1e] border-r border-zinc-700 overflow-hidden">
          <Editor />
        </div>

        <Console />
      </Split>

      <History />
      <About />
      <ShareCode />
    </div>
  );
};

export default App;
