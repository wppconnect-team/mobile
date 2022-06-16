import React from 'react';
import { View, TextInput, useColorScheme, Text, Button } from 'react-native';

const UselessTextInput = (props) => {
  return (
    <TextInput
      {...props}
      editable
    />
  );
}

const UselessTextInputMultiline = ({ webviewRef, style = {} }) => {
  const [mensagem, setMensagem] = React.useState('');
  const isDarkMode = useColorScheme() === 'dark';
  const [mensagemAlerta, setMensagemAlerta] = React.useState('');
  const enviarMensagem = () => {
    console.log('enviarMensagem', mensagem);
    if (mensagem !== '') {
      setMensagem('');
      webviewRef.current?.injectJavaScript(`
        (function () {
          'use strict';
          WPP.chat.sendTextMessage('553198587817@c.us', '${mensagem}').then(function (res) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ message: 'Mensagem enviada', data: res })
            );
          }).catch(function (err) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ message: 'Erro ao enviar mensagem', data: err })
            );
          });
        })();
      `);
    } else {
      setMensagemAlerta('Mensagem vazia');
      setTimeout(() => {
        setMensagemAlerta('');
      }, 2000);
    }
  }
  return (
    <View style={{ ...style, flex: 1, flexDirection: 'column' }}>
      <View
        style={{
          borderBottomColor: isDarkMode ? '#000' : '#fff',
          borderBottomWidth: 1,
        }}>
        <UselessTextInput
          style={{ padding: 10 }}
          multiline
          onChangeText={(text) => setMensagem(text)}
          value={mensagem}
          placeholder="Digite sua mensagem"
        />
        <Button
          title="Enviar"
          onPress={enviarMensagem}
        />
      </View>
      <Text>{mensagemAlerta}</Text>
    </View>
  );
}

export default UselessTextInputMultiline;