import { useContext } from 'react';
import ReactJsonView from 'react-json-view';
import { AppContext } from 'context/AppContext';
import { AppAactions } from 'context/Reducer';

const JsonView: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="modal fade show" style={{ display: state.jsonView }}>
      <div className="modal-dialog" style={{ maxWidth: 1200 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">JSON View</h4>
          </div>
          <div className="modal-body">
            <div style={{ height: 600, overflow: 'scroll' }}>
              <ReactJsonView
                src={state.result.filter(item => item)}
                theme="monokai"
                name={false}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                dispatch({
                  type: AppAactions.TOGGLE_JSON_VIEW,
                  payload: 'none',
                })
              }
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JsonView;
