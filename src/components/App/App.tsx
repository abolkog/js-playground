import { useContext, useEffect, useState } from 'react';
import Header from 'components/Header';
import About from 'components/About';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';
import ContextMenu from 'components/ContextMenu';
import JsonView from 'components/JsonView';
import CodeEditor from 'components/CodeEditor';
import Console from 'components/Console';

const width = 1400;

const App: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const [position, setPosition] = useState<MenuPosition | null>(null);

  useEffect(() => {
    const consoleProxy = console.log;
    console.log = msg => {
      dispatch({ type: AppAactions.CODE_RUN_SUCCESS, payload: msg });
      consoleProxy(msg);
    };
  }, []);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { pageX, pageY } = event;
    setPosition({ top: pageY, left: pageX });
  };

  return (
    <div className="mainContainer">
      <Header />

      <div className="appConainer">
        <div style={{ width }}>
          <CodeEditor />
        </div>

        <div style={{ width: window.innerWidth - width - 20 }}>
          <div style={{ height: '100%' }} onContextMenu={handleContextMenu}>
            <Console />
          </div>
        </div>
      </div>

      <About />

      <JsonView />

      <ContextMenu
        position={position}
        onClose={() => setPosition(null)}
        onClick={() => {
          dispatch({ type: AppAactions.TOGGLE_JSON_VIEW, payload: 'block' });
          setPosition(null);
        }}
      />
    </div>
  );
};

export default App;
