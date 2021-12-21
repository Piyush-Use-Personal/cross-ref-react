import { combineReducers } from '@reduxjs/toolkit';
import homeReducer from '../../components/Home/reducer';

const reducer = combineReducers({ homeReducer });
export default reducer;
