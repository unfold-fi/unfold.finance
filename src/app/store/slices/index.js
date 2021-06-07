import { combineReducers } from '@reduxjs/toolkit';

import web3 from './web3';
import alert from './alert';
import modal from './modal';
import connection from './connection';

const reducer = combineReducers({ web3, alert, modal, connection });

export default reducer;
