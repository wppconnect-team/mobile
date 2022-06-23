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

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, ScrollView} from 'react-native';
import {defaultStyles} from 'consts/styles';
import AppBar from 'components/AppBar';
import translate from 'translations';
import {NavigationScreenProp} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Surface,
  Stack,
  Text,
  ListItem,
  Switch,
  TextInput,
  FAB,
} from '@react-native-material/core';

interface ConfigScreenProps {
  navigation: NavigationScreenProp<any>;
}

const ConfigScreen = (
  props: ConfigScreenProps | Readonly<ConfigScreenProps>,
) => {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollOuter}>
      <ScrollView style={styles.view}>
        <AppBar
          navigation={props.navigation}
          subtitle={translate('view.config.title', {
            defaultValue: 'Settings',
          })}
          useGoBack={true}
        />
        <Stack fill spacing={4} style={styles.stack}>
          <Surface elevation={2} category="medium" style={styles.surface}>
            <Text variant={'h6'}>WA-JS</Text>
            <Text variant={'caption'}>
              Configurações básicas utilizadas na instância
            </Text>
            <TextInput
              variant="outlined"
              label="Nome do Dispositivo"
              helperText={
                'Este nome é oque aparece nos "Dispotivos Conectados"'
              }
              placeholder={'WppConnect'}
              style={styles.textInput}
            />
            <TextInput
              variant="outlined"
              label="Limite de localização em tempo real"
              helperText={
                'Número de últimos chats para verificar a localização ao vivo após o recarregamento de uma página'
              }
              style={styles.textInput}
              keyboardType={'numeric'}
            />
            <TextInput
              variant="outlined"
              label="ID do Google Analytics"
              helperText={'Identificação do seu tracker no Google Analytics'}
              placeholder={'G-SEUTRACKER'}
              style={styles.textInput}
            />
            <>
              <ListItem
                title="Desativar Google Analytics"
                trailing={() => <Switch value={false} disabled />}
              />
            </>
          </Surface>
          <Surface elevation={2} category="medium" style={styles.surface}>
            <Text variant={'h6'}>Avançado</Text>
            <Text variant={'caption'}>
              Configurações para permitir a automatização remota da instância
            </Text>
            <TextInput
              variant="standard"
              placeholder={'wss://seu-servidor'}
              label="URL de Socket"
              helperText="Endereço do servidor Socket que fará a comunicação com o dispositivo"
              style={{margin: 16}}
            />
            <>
              {/* todo: Adicionar possibilidade de ativar um servidor junto a aplicação */}
              <ListItem
                title="API"
                overline={'Servidor Local'}
                secondaryText={
                  'Permitir comandos remotos no dispositivo via Socket'
                }
                trailing={() => <Switch value={false} />}
              />
            </>
          </Surface>
        </Stack>
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fab: {
    bottom: 16,
    end: 16,
    position: 'absolute',
  },
  scroll: defaultStyles.scroll,
  scrollOuter: {...defaultStyles.scrollOuter, height: '100%'},
  stack: {
    padding: 10,
  },
  surface: {
    marginTop: 12,
    padding: 10,
  },
  textInput: {
    marginEnd: 10,
    marginStart: 10,
    marginTop: 16,
  },
  view: defaultStyles.view as object,
});

export default connect(null, null)(ConfigScreen);
