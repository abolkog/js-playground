import { useContext, useEffect, useState } from 'react';
import Header from 'components/Header';
import About from 'components/About';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import ContextMenu from 'components/ContextMenu';
import JsonView from 'components/JsonView';
import CodeEditor from 'components/CodeEditor';
import Console from 'components/Console';
import HistoryModal from 'components/HistoryModal';

const App: React.FC = () => {
  const { dispatch } = useContext(AppContext);
  const [position, setPosition] = useState<MenuPosition | null>(null);

  useEffect(() => {
    const consoleProxy = console.log;
    console.log = msg => {
      dispatch({ type: AppActions.CODE_RUN_SUCCESS, payload: msg });
      consoleProxy(msg);
    };
  }, []);

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { pageX, pageY } = event;
    setPosition({ top: pageY, left: pageX });
  };

  return (
    <div className="flex flexColumn">
      <Header />

      <div className="flex flexColumn">
        <div className="editorContainer">
          <CodeEditor />
        </div>

        <div className=" consoleContainer" onContextMenu={handleContextMenu}>
          <Console />
        </div>
      </div>

      <About />

      <JsonView />

      <ContextMenu
        position={position}
        onClose={() => setPosition(null)}
        onClick={() => {
          dispatch({ type: AppActions.TOGGLE_JSON_VIEW, payload: 'block' });
          setPosition(null);
        }}
      />

      <HistoryModal />
    </div>
  );
};

export default App;
