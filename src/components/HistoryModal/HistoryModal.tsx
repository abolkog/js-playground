import { useContext, useState } from 'react';
import { AppContext } from 'context/AppContext';
import Modal from 'components/Modal';
import { AppAactions } from 'context/Reducer';
import { getHistory } from 'services/storage';

type HistoryModalProps = {};

const HistoryModal: React.FC<HistoryModalProps> = () => {
  const { state, dispatch } = useContext(AppContext);
  const [activeIndex, setActiveIndex] = useState(-1);

  const history = getHistory();

  const makeKey = (item: HisotryItem, index: number) => `${item.date}_${index}`;

  const handleHeaderButtonClick = (index: number) => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else setActiveIndex(index);
  };

  const handleRestore = (item: HisotryItem) => () => {
    const payload = {
      codeSample: item.code,
      codeSampleName: '',
    };

    dispatch({ type: AppAactions.LOAD_CODE_SAMPLE, payload });
    dispatch({ type: AppAactions.TOGGLE_HISTORY_MODAL });
  };

  return (
    <Modal
      isOpen={state.historyModalShown}
      onClose={() => dispatch({ type: AppAactions.TOGGLE_HISTORY_MODAL })}
      title="Code History"
    >
      <div className="accordion" data-testid="history-accordion">
        {history.reverse().map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div className="accordion-item" key={makeKey(item, index)}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${isActive ? '' : 'collapsed'}`}
                  type="button"
                  onClick={() => handleHeaderButtonClick(index)}
                >
                  ({item.date} #({index + 1})){' - '}
                  {item.code.slice(0, 100)}
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  isActive ? 'show' : ''
                }`}
              >
                <div className="accordion-body">
                  <pre>{item.code}</pre>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleRestore(item)}
                    >
                      Restore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default HistoryModal;
