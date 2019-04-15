import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';

_.extend(window, { axios, Redux: { createStore, combineReducers } });
