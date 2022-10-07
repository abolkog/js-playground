import { createRef, useContext, useEffect, useState } from 'react';
import Header from 'components/Header';
import useResizer from 'hooks/useResizer';
import About from 'components/About';
import Tab from 'components/Tab';
import { editorTab, consoleTab } from 'components/App/tabs';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';
import ContextMenu from 'components/ContextMenu';
import JsonView from 'components/JsonView';

const App: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const resizerRef = createRef<HTMLDivElement>();
  const { width } = useResizer(resizerRef);

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
          <Tab tab={editorTab} />
        </div>

        <div className="resizer" ref={resizerRef} />

        <div style={{ width: window.innerWidth - width - 20 }}>
          <div style={{ height: '100%' }} onContextMenu={handleContextMenu}>
            <Tab tab={consoleTab} />
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
