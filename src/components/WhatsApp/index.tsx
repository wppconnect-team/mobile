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

import React, {useEffect, useRef} from 'react';
import WebView from 'react-native-webview';
import WaJS, {
  whatsAppWebURL,
  userAgent,
  injectJS,
} from 'components/WhatsApp/consts';
import {
  Linking,
  StyleSheet,
  DeviceEventEmitter,
  useWindowDimensions,
} from 'react-native';

import {events} from './consts';
import {showMessage} from 'react-native-flash-message';
import {useDispatch} from 'react-redux';

import {
  setAuthCode,
  setAuthenticated,
  setWebpackReady,
} from 'redux/reducer/wajs';

const waJS = new WaJS();

const WhatsApp = () => {
  const dispatch = useDispatch();
  const webviewRef = useRef<WebView>();
  useEffect(() => {
    dispatch(setWebpackReady(false));
    dispatch(setAuthenticated(false));
    DeviceEventEmitter.emit('whatsapp.updateref', webviewRef);

    DeviceEventEmitter.addListener('whatsapp.message', ev => {
      const {event, message} = ev;
      if (message === 'start') {
        webviewRef.current?.injectJavaScript(waJS.injectScript);
      } else if (event === 'conn.require_auth') {
        showMessage({
          message: 'Você não está autenticado',
          description: 'Leia o QRCode para continuar',
          type: 'warning',
        });
      }

      console.debug(`[Emitter - WhatsApp.Message] -> ${JSON.stringify(ev)}`);
    });
  });

  const onMessage = React.useCallback(
    (nEvent: any) => {
      if (Object.keys(nEvent).includes('nativeEvent')) {
        const nativeEvent = JSON.parse(nEvent.nativeEvent.data);
        const {event, data} = nativeEvent;
        if (event) {
          switch (event) {
            case 'conn.auth_code_change':
              dispatch(setAuthCode(data));
              break;
            case 'conn.authenticated':
              dispatch(setAuthenticated(true));
              break;
            case 'webpack.ready':
              dispatch(setWebpackReady(true));
              break;
            case 'conn.require_auth':
              dispatch(setAuthenticated(false));
              break;
            default:
              console.warn(`Unknown event "${event}"`);
          }
        }
        DeviceEventEmitter.emit(events.onMessage, nativeEvent);
      }
    },
    [dispatch],
  );

  const onError = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onError, event);
  }, []);
  const onContentProcessDidTerminate = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onContentProcessDidTerminate, event);
  }, []);
  const onContentSizeChange = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onContentSizeChange, event);
  }, []);
  const onCustomMenuSelection = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onCustomMenuSelection, event);
  }, []);
  const onFileDownload = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onFileDownload, event);
  }, []);
  const onHttpError = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onHttpError, event);
  }, []);
  const onLoad = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onLoad, event);
  }, []);
  const onLoadEnd = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onLoadEnd, event);
  }, []);
  const onLoadProgress = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onLoadProgress, event);
  }, []);
  const onLoadStart = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onLoadStart, event);
  }, []);
  const onRenderProcessGone = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onRenderProcessGone, event);
  }, []);
  const onScroll = React.useCallback((event: any) => {
    console.log(event);
    DeviceEventEmitter.emit(events.onScroll, event);
  }, []);
  const {height, width} = useWindowDimensions();

  return (
    <WebView
      // Sim, fiquei com preguiça de descobrir como corrigir isso, desculpe :(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref={webviewRef}
      source={{uri: whatsAppWebURL}}
      userAgent={userAgent}
      cacheEnabled={true}
      domStorageEnabled={true}
      injectedJavaScript={injectJS}
      onNavigationStateChange={event => {
        if (
          !event.url.toLowerCase().includes(whatsAppWebURL.toLowerCase()) &&
          event.navigationType === 'click'
        ) {
          webviewRef.current?.stopLoading();
          Linking.openURL(event.url);
        }
      }}
      style={[styles.webView, {height: height, width: width}]}
      onMessage={onMessage}
      onError={onError}
      onContentProcessDidTerminate={onContentProcessDidTerminate}
      onContentSizeChange={onContentSizeChange}
      onCustomMenuSelection={onCustomMenuSelection}
      onFileDownload={onFileDownload}
      onHttpError={onHttpError}
      onLoad={onLoad}
      onLoadEnd={onLoadEnd}
      onLoadProgress={onLoadProgress}
      onLoadStart={onLoadStart}
      onRenderProcessGone={onRenderProcessGone}
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    // flex: 1,
    display: 'none',
  },
});

export default React.memo(WhatsApp);
