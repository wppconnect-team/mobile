import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  Linking,
  View
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import axios from 'axios';
import UselessTextInputMultiline from './components/inputMessage';

const userAgent = `Mozilla/5.0 (Linux; Win64; x64; rv:46.0) Gecko/20100101 Firefox/68.0`;
const whatsappWebUri = 'https://web.whatsapp.com';
const INJECTED_JAVASCRIPT = `
  (function () {
    // Disable zooming in (textinput focus zoom messes up ux)
    const meta = document.createElement('meta');
    meta.setAttribute(
      'content',
      'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
    );
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);

    window.ReactNativeWebView.postMessage(
      JSON.stringify({ message: 'start' }),
    );
  })();
`;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const webviewRef = React.useRef();
  const { height, width } = useWindowDimensions();

  const loadInjecte = async () => {
    const wajs = await axios.get(
      'https://github.com/wppconnect-team/wa-js/releases/download/nightly/wppconnect-wa.js',
    );
    if (wajs.status === 200 && wajs.data) {
      webviewRef.current?.injectJavaScript(`	
        ${wajs.data}
        WPP.webpack.onReady(function () {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ message: 'Ready to use WPPConnect WA-JS'}),
          );
        });
      `);
    }
  }

  const onMessage = React.useCallback((event) => {
    let data = JSON.parse(event.nativeEvent.data);
    console.log(data);
    if (data?.message === 'start') {
      loadInjecte();
    }
  }, []);

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            webviewRef.current?.injectJavaScript(
              `	
							document.querySelector('#main').parentElement.style.display = 'none';
							document.querySelector('#side').parentElement.style.display = 'block';
						`,
            );
          }
        }}
      >
        <View
          style={{
            flex: 1,
            position: 'relative',
          }}
        >
          <WebView
            ref={webviewRef}
            source={{
              uri: whatsappWebUri,
            }}
            userAgent={userAgent}
            injectedJavaScript={INJECTED_JAVASCRIPT}
            onNavigationStateChange={(event) => {
              if (
                !event.url
                  .toLowerCase()
                  .includes(whatsappWebUri.toLowerCase()) &&
                event.navigationType === 'click'
              ) {
                webviewRef.current?.stopLoading();
                Linking.openURL(event.url);
              }
            }}
            style={[styles.webView, { height: height, width: width }]}
            onMessage={onMessage}
          />
          <UselessTextInputMultiline
            webviewRef={webviewRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#0f0'
            }}
          />
        </View>
      </FlingGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    flex: 1,
  },
});

export default App;
