import React, { Component } from 'react';
import { connect } from 'react-redux';
import { transform } from 'babel-standalone';
import _ from 'lodash';


class Console extends Component {
    
    _renderResult() {
        if (this.props.error) {
            return (
                <div className='error'>{this.props.error}</div>
            );
        }

        return <div>{this._evalResult()}</div>;
    }

    _evalResult() {
        let result;
        try {
            result = eval(this.props.expressions);
            if (_.isFunction(result) && result.name) {
                return <i>Function {result.name}</i>;
            } else if (_.isBoolean(result)) {
                return result ? 'True' : 'False';
            } else if (_.isObject(result) || _.isArray(result)) {
                return JSON.stringify(result);
            }

        } catch (e) {
            result = 'Error while parsing the code: ' + e.toString();
        }

        return result;
    }

    render() {
        const { width } = this.props;
        const windowWith = window.innerWidth - 100;
        const consoleWidth = windowWith - width;
        return (
            <div style={{ width: consoleWidth }} className='console'>{this._renderResult()}</div>
        );
    }
}

const mapStateToProps = state => {
    let expressions, error;

    try {
        const transformed = transform(state.code, { presets: ['react'] }).code;
        expressions = eval(transformed);
    } catch (e) {
        error = e.toString();
    }

    return { expressions, error };
}

export default connect(mapStateToProps)(Console);