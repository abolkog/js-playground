import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactJsonView from 'react-json-view';
import { commonActions } from '../../store/actions';

const JsonView = ({ jsonView, dispatch, history }) => {
  const close = () => {
    dispatch(commonActions.toggleJsonView());
  };

  return (
    <div>
      <div className="modal fade show" style={{ display: jsonView }}>
        <div className="modal-dialog" style={{ maxWidth: 1200 }}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">JSON View</h4>
            </div>
            <div className="modal-body">
              <div style={{ height: 600, overflow: 'scroll' }}>
                <ReactJsonView src={history} theme="monokai" name={false} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={close}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

JsonView.propTypes = {
  jsonView: PropTypes.string.isRequired,
  history: PropTypes.arrayOf(PropTypes.any),
};

JsonView.defaultProps = {
  history: [],
};

const mapStateToProps = ({ common }) => ({
  jsonView: common.jsonView,
  history: common.history.map(item => item),
});

export default connect(mapStateToProps)(JsonView);
