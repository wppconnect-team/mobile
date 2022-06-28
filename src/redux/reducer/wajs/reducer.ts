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

import {eventsType as WBViewEventsTp} from 'components/WhatsApp/consts';
import {AuthCode} from 'types/wajs/conn';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface WaJSConfig {
  deviceName: string;
  liveLocationLimit: number;
  disableGoogleAnalytics: boolean;
  googleAnalyticsId: string | null;
}

export interface WaJSMobileServerConfig {
  uri: string;

  // Events that will be listened to and sent to the server
  // Currently using "onAny" to capture events, in the future will this be a problem?
  listenWa: Array<'chat.new_message'> | null;

  // Events provided by WebView
  listenInstance: Array<WBViewEventsTp> | null;
  enableAPI: boolean;
}

export interface WaJSMobileConfig {
  server: WaJSMobileServerConfig;
}

export interface WaJsState {
  isAuthenticted: boolean;
  isMainReady: boolean;
  isWaJsReady: boolean;
  authcode?: AuthCode | null;
  webpack: {
    ready: boolean;
  };
  config: {
    wajs: WaJSConfig;
    mobile: WaJSMobileConfig;
  };
}

const initialState = {
  isAuthenticted: false,
  isMainReady: false,
  isWaJsReady: false,
  authcode: null,
  webpack: {ready: false},
  config: {
    wajs: {
      deviceName: 'WPPConnect',
      disableGoogleAnalytics: false,
      googleAnalyticsId: null,
      liveLocationLimit: 10,
    },
    mobile: {
      server: {
        uri: '',
        enableAPI: false,
        listenInstance: [
          'whatsapp.message',
          'whatsapp.error',
          'whatsapp.contentprocessdidterminate',
          'whatsapp.contentsizechange',
          'whatsapp.custommenuselection',
          'whatsapp.onfiledownload',
          'whatsapp.httperror',
          'whatsapp.load',
          'whatsapp.loadend',
          'whatsapp.loadprogress',
          'whatsapp.loadstart',
          'whatsapp.renderprocessgone',
          'whatsapp.scroll',
        ],
        listenWa: ['chat.new_message'],
      },
    },
  },
} as WaJsState;

const WaJsAppSlice = createSlice({
  name: 'wajs',
  initialState,
  reducers: {
    setMainReady(state, action: PayloadAction<boolean>) {
      state.isMainReady = action.payload;
    },
    setWaJsReady(state, action: PayloadAction<boolean>) {
      state.isWaJsReady = action.payload;
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticted = action.payload;
    },
    setAuthCode(state, action: PayloadAction<AuthCode>) {
      state.authcode = action.payload;
    },
    setWebpackReady(state, action: PayloadAction<boolean>) {
      state.webpack.ready = action.payload;
    },
    setWaJsConfig(state, action: PayloadAction<Partial<WaJSConfig>>) {
      state.config.wajs = Object.assign(state.config.wajs, action.payload);
    },
    setMobileServerConfig(
      state,
      action: PayloadAction<Partial<WaJSMobileServerConfig>>,
    ) {
      state.config.mobile.server = Object.assign(
        state.config.mobile.server,
        action.payload,
      );
    },
  },
});

export const {
  setAuthenticated,
  setAuthCode,
  setWebpackReady,
  setMainReady,
  setWaJsReady,
  setWaJsConfig,
  setMobileServerConfig,
} = WaJsAppSlice.actions;
export default WaJsAppSlice.reducer;
