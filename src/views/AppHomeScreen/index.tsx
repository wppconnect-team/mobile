import React, {Component, RefObject} from 'react';
import {connect} from 'react-redux';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import {StyleSheet, View, ScrollView, DeviceEventEmitter} from 'react-native';
import {ActivityIndicator, Text} from '@react-native-material/core';
import QRCode from 'react-native-qrcode-svg';
import WebView from 'react-native-webview';
import {gestureHandlerJS} from 'components/WhatsApp/consts';
import WhatsApp from 'components/WhatsApp';
import {HandlerStateChangeEvent} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import AppBar from 'components/AppBar';
import {NavigationScreenProp} from 'react-navigation';
import {showMessage} from 'react-native-flash-message';
import {WaJsState} from 'redux/reducer/wajs';

interface AppHomeScreenProps extends WaJsState {
  navigation: NavigationScreenProp<any>;
}

class AppHomeScreen extends Component<AppHomeScreenProps, {}> {
  state = {
    webviewRef: React.createRef<WebView>(),
    refUpdated: false,
  };
  constructor(props: any) {
    super(props);
    DeviceEventEmitter.addListener('whatsapp.updateref', this.updateRef);
    showMessage({
      message: 'Atenção',
      description:
        'Por segurança a automação só continua sendo executada nesta tela, você pode minimiza-la também.',
      type: 'info',
    });
  }

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

  authView = () => <Text>Legal</Text>;
  noAuthView = () =>
    this.props.authcode ? (
      <QRCode
        value={this.props.authcode.fullCode}
        logoSize={100}
        size={200}
        ecl={'H'}
      />
    ) : (
      <View>
        <ActivityIndicator size="large" />
        <Text
          style={{
            textAlign: 'center',
            marginTop: 25,
          }}>
          Aguarde, estamos preparando tudo
        </Text>
      </View>
    );

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
            <View
              style={{
                padding: 50,
                flex: 1,
                alignItems: 'center',
                alignContent: 'center',
              }}>
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
  scrollOuter: {
    width: '100%',
  },
  scroll: {
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
  };
};

export default connect<WaJsState, null>(mapStateToProps, null)(AppHomeScreen);
