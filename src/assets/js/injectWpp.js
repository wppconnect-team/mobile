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

/* eslint no-undef: 0 */
// Undefined variables are disabled in this file only temporarily,
// the intention is that this file is accessed inside the repository and then cached.

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
  WPP.getQRCode();
});
WPP.getQRCode = () => {
  if (WPP.conn.isAuthenticated()) {
    WPP.conn.setKeepAlive();
    clearInterval(WPP.getQrCodeInterval);
    return true;
  }

  if (WPP.conn.isIdle()) {
    WPP.conn.refreshQR();
  }

  let element = document.querySelector('canvas[aria-label="Scan me!"]');
  let dataElement = element && element.closest('[data-ref]');

  if (element && dataElement) {
    rPostMessage({
      event: 'qrcode',
      message: {
        base64: element.toDataURL(),
        data: dataElement.getAttribute('data-ref'),
      },
    });
  }
  setTimeout(WPP.getQRCode, 5000);
};

WPP.getQrCodeInterval = null;

WPP.sendCommand = async (command, ...args) => {
  let output = null;
  let hasError = false;
  let error = '';
  try {
    if (command === 'eventNames') {
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
