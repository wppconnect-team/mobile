import {PayloadAction} from '@reduxjs/toolkit';

export const IS_FIRST_TIME = 'IS_FIRST_TIME';
export const TOGGLE_FIRST_TIME = 'TOGGLE_FIRST_TIME';

const initialState = {
  isFirstTime: true,
};

export default function (state = initialState, action: PayloadAction<boolean>) {
  switch (action.type) {
    case IS_FIRST_TIME:
      return {
        ...state,
      };
    case TOGGLE_FIRST_TIME:
      return {
        ...state,
        isFirstTime: action.payload,
      };

    default:
      return state;
  }
}

export type UpdateFirstTimeStatusFunction = () => (
  dispatch: (arg0: {type: string; payload: boolean}) => any,
) => any;

export const updateFirstTimeStatus: any =
  () => (dispatch: (arg0: {type: string; payload: boolean}) => any) => {
    dispatch(toggleFirstTime());
  };

const toggleFirstTime = () => ({
  type: TOGGLE_FIRST_TIME,
  payload: false,
});
