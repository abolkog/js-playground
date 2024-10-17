import _ from 'lodash';
import * as Redux from 'redux';
import axios from 'axios';
import * as luxon from 'luxon';
import * as dfn from 'date-fns';

_.extend(window, {
  _,
  axios,
  luxon,
  dfn,
  Redux,
});
