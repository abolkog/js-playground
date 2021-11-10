import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
import moment from 'moment-timezone';
import * as luxon from 'luxon';
import faker from 'faker';

_.extend(window, { _, axios, moment, luxon, faker, Redux: { createStore, combineReducers } });
