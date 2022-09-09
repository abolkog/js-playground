import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
import * as luxon from 'luxon';

_.extend(window, {
  _,
  axios,
  luxon,
  Redux: { createStore, combineReducers },
});
