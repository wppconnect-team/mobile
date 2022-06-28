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

import {connect, ConnectedProps} from 'react-redux';
import {RootState} from 'redux/store/store';
import {
  setAuthenticated,
  setAuthCode,
  setWebpackReady,
  setMainReady,
  setWaJsReady,
} from 'redux/reducer/wajs/reducer';

const mapState = (state: RootState) => ({
  isAuthenticted: state.wajs.isAuthenticted,
  isMainReady: state.wajs.isMainReady,
  isWaJsReady: state.wajs.isWaJsReady,
  authcode: state.wajs.authcode,
  webpack: state.wajs.webpack,
  config: state.wajs.config,
});

const mapDispatch = {
  setAuthenticated: setAuthenticated,
  setAuthCode: setAuthCode,
  setWebpackReady: setWebpackReady,
  setMainReady: setMainReady,
  setWaJsReady: setWaJsReady,
};

export const connector = connect(mapState, mapDispatch);
export type PropsFromRedux = ConnectedProps<typeof connector>;
