import { combineReducers } from '@reduxjs/toolkit';

import web3 from './web3';
import alert from './alert';

const reducer = combineReducers({ web3, alert });

export default reducer;
