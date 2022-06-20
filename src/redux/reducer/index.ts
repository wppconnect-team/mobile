import {combineReducers} from 'redux';
import global from './global';
import wajs from 'redux/reducer/wajs';
import {PayloadAction} from '@reduxjs/toolkit';

const allReducers = combineReducers({
  global: global,
  wajs: wajs,
});

const rootReducer = (state: any, action: PayloadAction<any>) => {
  return allReducers(state, action);
};

export default rootReducer;
