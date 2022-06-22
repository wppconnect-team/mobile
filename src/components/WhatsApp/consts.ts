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

import axios from 'axios';

export const userAgent =
  'Mozilla/5.0 (Linux; Win64; x64; rv:46.0) Gecko/20100101 Firefox/68.0';
export const whatsAppWebURL = 'https://web.whatsapp.com/🌎/en/';
export const waJsURL =
  'https://github.com/wppconnect-team/wa-js/releases/latest/download/wppconnect-wa.js';
export const injectJS = `
(function () {
  // Disable zooming in (textinput focus zoom messes up ux)
  const meta = document.createElement('meta');
  meta.setAttribute(
    'content',
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  );
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
  window.ReactNativeWebView.postMessage(JSON.stringify({message: 'start'}));
})();`;
export const gestureHandlerJS = `
document.querySelector('#main').parentElement.style.display = 'none';
document.querySelector('#side').parentElement.style.display = 'block';`;
export const deviceName = 'WPPConnect';
export const liveLocationLimit = 10;
export const disableGoogleAnalytics = false;

export type eventsType =
  | 'whatsapp.message'
  | 'whatsapp.error'
  | 'whatsapp.contentprocessdidterminate'
  | 'whatsapp.contentsizechange'
  | 'whatsapp.custommenuselection'
  | 'whatsapp.onfiledownload'
  | 'whatsapp.httperror'
  | 'whatsapp.load'
  | 'whatsapp.loadend'
  | 'whatsapp.loadprogress'
  | 'whatsapp.loadstart'
  | 'whatsapp.renderprocessgone'
  | 'whatsapp.scroll';

interface eventsInterface {
  [name: string]: eventsType;
}

export const events: eventsInterface = {
  onMessage: 'whatsapp.message',
  onError: 'whatsapp.error',
  onContentProcessDidTerminate: 'whatsapp.contentprocessdidterminate',
  onContentSizeChange: 'whatsapp.contentsizechange',
  onCustomMenuSelection: 'whatsapp.custommenuselection',
  onFileDownload: 'whatsapp.onfiledownload',
  onHttpError: 'whatsapp.httperror',
  onLoad: 'whatsapp.load',
  onLoadEnd: 'whatsapp.loadend',
  onLoadProgress: 'whatsapp.loadprogress',
  onLoadStart: 'whatsapp.loadstart',
  onRenderProcessGone: 'whatsapp.renderprocessgone',
  onScroll: 'whatsapp.scroll',
};

export default class WaJS {
  script = '';
  isLoaded = false;

  constructor() {
    this.isLoaded = false;
    axios.get(waJsURL).then(response => {
      if (response.status === 200 && response.data) {
        this.isLoaded = true;
      }
      this.script = response.data;
    });
  }

  get injectScript() {
    return `
    window.WPPConfig = {
          deviceName: '${deviceName}',
          liveLocationLimit: ${liveLocationLimit},
          disableGoogleAnalytics: ${disableGoogleAnalytics}          
    };
    ${this.script}
         const rPostMessage = data =>
  window.ReactNativeWebView.postMessage(JSON.stringify(data));

const rOnAny = (event, values) =>
  rPostMessage({
    event,
    data: values,
  });

WPP.webpack.onReady(function () {
  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      event: 'ready',
      message: 'Ready to use WPPConnect WA-JS',
    }),
  );
});

WPP.sendCommand = async (command, ...args) => {
  let output = null;
  let hasError = false;
  let error = '';
  try {
    if (command == 'eventNames') {
      output = WPP.eventNames(...args);
    }
  } catch (e) {
    hasError = true;
    error = String(e);
  }

  return window.ReactNativeWebView.postMessage(
    JSON.stringify({
      event: 'commandResult',
      output: output,
      command: command,
      hasError: hasError,
      error: error,
    }),
  );
};

WPP.onAny(rOnAny);
    `;
  }
}
