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

import React, {Component, RefObject, useEffect} from 'react';
import {StyleSheet, View, ScrollView, DeviceEventEmitter} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import {NavigationScreenProp} from 'react-navigation';
import {ActivityIndicator, Text} from '@react-native-material/core';
import QRCode from 'react-native-qrcode-svg';
import WebView from 'react-native-webview';
import {HandlerStateChangeEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import {showMessage} from 'react-native-flash-message';
import translate from 'translations';
import {connector, PropsFromRedux} from 'redux/reducer/wajs/mapper';
import WhatsApp, {
  sendWhatsAppCommand,
  WhatsAppCommandResult,
} from 'components/WhatsApp';
import AppBar from 'components/AppBar';
import {gestureHandlerJS, onCommandResult} from 'components/WhatsApp/consts';
import {QRCodeSettings} from './consts';
import uuid from 'react-native-uuid';

interface AppHomeScreenProps extends PropsFromRedux {
  navigation: NavigationScreenProp<any>;
}

interface AppHomeScreenState {
  webviewRef: RefObject<WebView>;
  refUpdated: boolean;
  instance: {
    contacts: {
      result: any | null;
      hookId: string;
    };
  };
}

class AppHomeScreen extends Component<AppHomeScreenProps, {}> {
  state: AppHomeScreenState = {
    webviewRef: React.createRef<WebView>(),
    refUpdated: false,
    instance: {
      contacts: {
        result: null,
        hookId: '',
      },
    },
  };
  private contactsUpdateInterval: number;

  constructor(props: any) {
    super(props);
    DeviceEventEmitter.addListener('whatsapp.updateref', this.updateRef);
    showMessage({
      message: translate('flash_message.app_home.title', {
        defaultValue: 'Caution',
      }),
      description: translate('flash_message.app_home.description', {
        defaultValue:
          'For security the automation only continues to run on this screen, you can minimize it as well.',
      }),
      type: 'info',
    });
    DeviceEventEmitter.addListener(
      onCommandResult,
      this.onWhatsAppCommandResult,
    );

    this.contactsUpdateInterval = setInterval(() => {
      if (this.props.isAuthenticted && this.props.isWaJsReady) {
        const {result, hookId} = this.state.instance.contacts;
        if (result === null || result === []) {
          this.updateContacts();
        }
      }
    }, 5000);
  }

  onWhatsAppCommandResult = (result: WhatsAppCommandResult) => {
    if (result.commandId === this.state.instance.contacts.hookId) {
      console.log(`Received result from ${result.command}`);
      this.setState({
        instance: {
          contacts: {
            result: result.result,
          },
        },
      });
    }
  };

  onHandlerStateChange = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      this.state.webviewRef?.current?.injectJavaScript(gestureHandlerJS);
    }
  };

  updateRef = (ref: RefObject<WebView>) => {
    if (!this.state.refUpdated) {
      this.setState({
        webviewRef: ref,
        refUpdated: true,
      });
    }
  };

  authView = () => <Text>{JSON.stringify(this.props)}</Text>;
  noAuthView = () =>
    this.props.authcode && !this.props.isAuthenticted ? (
      <QRCode value={this.props.authcode.fullCode} {...QRCodeSettings} />
    ) : (
      <View>
        <ActivityIndicator size="large" />
        <Text style={styles.preparingInstance}>
          {translate('view.app.home.preparing_instance', {
            defaultValue: 'Wait, we are preparing everything',
          })}
        </Text>
      </View>
    );

  updateContacts = () => {
    const hookId = uuid.v4();
    this.setState({
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

  render() {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollOuter}>
        <FlingGestureHandler
          direction={Directions.RIGHT}
          onHandlerStateChange={e => this.onHandlerStateChange(e)}>
          <View style={styles.view}>
            <AppBar navigation={this.props.navigation} />
            <View style={styles.containerView}>
              {this.props.isAuthenticted && this.props.webpack.ready
                ? this.authView()
                : this.noAuthView()}
            </View>
            <WhatsApp />
          </View>
        </FlingGestureHandler>
      </ScrollView>
    );
  }
}
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

export default connector(AppHomeScreen);
