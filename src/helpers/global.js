import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
import moment from 'moment';

_.extend(window, { axios, moment, Redux: { createStore, combineReducers } });
