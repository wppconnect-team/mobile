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

/**
 This script is called by the application at:
 src/components/WhatsApp/consts.ts -> repositoryScript(){...}

 :::Latest changes:::
 (22/06/2022) - Removed the QRCode reading, the capture event is provided by WA-JS that does it automatically.
                Visible in https://github.com/wppconnect-team/mobile/blob/main/src/components/WhatsApp/index.tsx#L75
 **/

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

WPP.executeCommand = async (command, onResult, onCatch, ...args) => {
  rPostMessage({
    event: 'whatsapp.command_debug',
    data: {
      command: command,
      args: args,
    },
  });
  switch (command) {
    case 'eventNames':
      onResult(WPP.eventNames(...args));
      break;
    case 'contact.list':
      WPP.contact.list(args).then(onResult).catch(onCatch);
      break;
    default:
      break;
  }
};

WPP.sendCommandWithId = async (command, commandId, ...args) => {
  let output = null;
  let error = '';
  try {
    output = WPP.executeCommand(
      command,
      result => {
        rPostMessage({
          event: 'whatsapp.command_result',
          data: {
            result,
            command,
            commandId,
          },
        });
      },
      error => {
        rPostMessage({
          event: 'whatsapp.command_error',
          data: {
            command,
            commandId,
            error,
          },
        });
      },
      ...args,
    );
  } catch (e) {
    error = String(e);
    rPostMessage({
      event: 'whatsapp.command_error',
      data: {
        command: command,
        commandId: commandId,
        error: error,
      },
    });
  }
};

WPP.onAny(rOnAny);
