/*
 * Copyright 2022 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
