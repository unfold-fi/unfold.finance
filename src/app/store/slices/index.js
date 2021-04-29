import { combineReducers } from '@reduxjs/toolkit';

import web3 from './web3';
import alert from './alert';
import modal from './modal';

const reducer = combineReducers({ web3, alert, modal });

export default reducer;
