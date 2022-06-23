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

import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { ActivityIndicator, Text } from '@react-native-material/core';
import QRCode from 'react-native-qrcode-svg';
import { HandlerStateChangeEvent } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import translate from 'translations';
import { WaJsState } from 'redux/reducer/wajs';
import WhatsApp, {
  sendWhatsAppCommand,
  WhatsAppCommandResult,
} from 'components/WhatsApp';
import AppBar from 'components/AppBar';
import { gestureHandlerJS, onCommandResult } from 'components/WhatsApp/consts';
import { QRCodeSettings } from './consts';
import uuid from 'react-native-uuid';

interface AppHomeScreenProps extends WaJsState {
  navigation: NavigationScreenProp<any>;
}

const AppHomeScreen = (
  props: AppHomeScreenProps | Readonly<AppHomeScreenProps>,
) => {
  const webviewRef = useRef<any>(null);
  const [state, setState] = React.useState({
    instance: {
      contacts: {
        result: null,
        hookId: '' as string | number[]
      },
    }
  });

  useEffect(() => {
    const subs = DeviceEventEmitter.addListener(
      onCommandResult,
      onWhatsAppCommandResult,
    );

    let contactsUpdateInterval = setInterval(() => {
      if (props.isAuthenticted && props.isWaJsReady) {
        const { result, hookId } = state.instance.contacts;
        if (result === null || result === []) {
          updateContacts();
        }
      }
    }, 5000);

    return () => {
      subs.remove();
      clearInterval(contactsUpdateInterval);
    }
  }, [props.isAuthenticted, props.isWaJsReady]);


  const onWhatsAppCommandResult = (result: WhatsAppCommandResult) => {
    if (result.commandId === state.instance.contacts.hookId) {
      console.log(`Received result from ${result.command}`);
      setState({
        instance: {
          contacts: {
            result: result.result,
            hookId: state.instance.contacts.hookId,
          },
        },
      });
    }
  };

  const onHandlerStateChange = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      webviewRef?.current?.injectJavaScript(gestureHandlerJS);
    }
  };

  const authView = () => <Text>{JSON.stringify(props)}</Text>;
  const noAuthView = () => {
    return (
      props.authcode && !props.isAuthenticted ? (
        <QRCode value={props.authcode.fullCode} {...QRCodeSettings} />
      ) : (
        <View>
          <ActivityIndicator size="large" />
          <Text style={styles.preparingInstance}>
            {translate('view.app.home.preparing_instance', {
              defaultValue: 'Wait, we are preparing everything',
            })}
          </Text>
        </View>
      )
    );
  }

  const updateContacts = () => {
    const hookId = uuid.v4();
    setState({
      instance: {
        contacts: {
          result: null,
          hookId: hookId,
        },
      },
    });
    sendWhatsAppCommand({
      command: 'contact.list',
      commandId: String(hookId),
    });
  };


  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollOuter}>
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={e => onHandlerStateChange(e)}>
        <View style={styles.view}>
          <AppBar
            navigation={props.navigation}
          />
          <View style={styles.containerView}>
            {props.isAuthenticted && props.webpack.ready
              ? authView()
              : noAuthView()}
          </View>
          <WhatsApp />
        </View>
      </FlingGestureHandler>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  containerView: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 50,
  },
  preparingInstance: {
    marginTop: 25,
    textAlign: 'center',
  },
  scroll: {
    width: '100%',
  },
  scrollOuter: {
    width: '100%',
  },
  view: {
    flex: 1,
    position: 'relative',
  },
});

const mapStateToProps = (state: any) => {
  return {
    authcode: state?.wajs?.authcode,
    isAuthenticted: state.wajs?.isAuthenticted,
    webpack: state.wajs?.webpack,
    config: state.wajs?.config,
    isMainReady: state.wajs?.isMainReady,
    isWaJsReady: state.wajs?.isWaJsReady,
  };
};

export default connect<WaJsState, null>(mapStateToProps, null)(AppHomeScreen);
