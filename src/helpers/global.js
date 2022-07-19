import _ from 'lodash';
import { createStore, combineReducers } from 'redux';
import axios from 'axios';
import * as luxon from 'luxon';
import faker from 'faker';

_.extend(window, { _, axios, luxon, faker, Redux: { createStore, combineReducers } });
