import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
import * as luxon from 'luxon';
import * as dfn from 'date-fns';

_.extend(window, {
  _,
  axios,
  luxon,
  dfn,
  Redux: { createStore, combineReducers },
});
