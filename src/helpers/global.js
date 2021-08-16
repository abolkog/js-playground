import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
import moment from 'moment-timezone';
import * as luxon from 'luxon';

_.extend(window, { _, axios, moment, luxon, Redux: { createStore, combineReducers } });
