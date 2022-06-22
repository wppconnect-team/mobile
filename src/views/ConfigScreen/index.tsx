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

class ConfigScreen extends Component<ConfigScreenProps, {}> {
  render() {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollOuter}>
        <ScrollView style={styles.view}>
          <AppBar
            subtitle={translate('view.config.title', {
              defaultValue: 'Settings',
            })}
            navigation={this.props.navigation}
            useGoBack={true}
          />
          <Stack fill spacing={4} style={styles.stack}>
            <Surface elevation={2} category="medium" style={styles.surface}>
              <Text variant={'h6'}>
                {translate('view.config.stack.wajs.title', {
                  defaultValue: 'WA-JS',
                })}
              </Text>
              <Text variant={'caption'}>
                {translate('view.config.stack.wajs.caption', {
                  defaultValue: 'Basic settings used in the instance',
                })}
              </Text>
              <TextInput
                variant="outlined"
                label={translate(
                  'view.config.stack.wajs.inputs.device_name.label',
                  {
                    defaultValue: 'Device Name',
                  },
                )}
                helperText={translate(
                  'view.config.stack.wajs.inputs.device_name.helperText',
                  {
                    defaultValue:
                      'This name is what appears in the "Connected Devices"',
                  },
                )}
                placeholder={translate(
                  'view.config.stack.wajs.inputs.device_name.placeholder',
                  {
                    defaultValue: 'WppConnect',
                  },
                )}
                style={styles.textInput}
              />
              <TextInput
                variant="outlined"
                label={translate(
                  'view.config.stack.wajs.inputs.real_time_location.label',
                  {
                    defaultValue: 'Real-time location limit',
                  },
                )}
                helperText={translate(
                  'view.config.stack.wajs.inputs.real_time_location.helperText',
                  {
                    defaultValue:
                      'Number of last chats to check live location after reloading a page',
                  },
                )}
                style={styles.textInput}
                keyboardType={'numeric'}
              />
              <TextInput
                variant="outlined"
                label={translate('view.config.stack.wajs.inputs.ga_id.label', {
                  defaultValue: 'Google Analytics ID',
                })}
                helperText={translate(
                  'view.config.stack.wajs.inputs.ga_id.helperText',
                  {
                    defaultValue:
                      'Identification of your tracker in Google Analytics',
                  },
                )}
                placeholder={translate(
                  'view.config.stack.wajs.inputs.ga_id.placeholder',
                  {
                    defaultValue: 'G-YOURTRACKER',
                  },
                )}
                style={styles.textInput}
              />
              <>
                <ListItem
                  title={translate(
                    'view.config.stack.wajs.inputs.disable_ga.title',
                    {
                      defaultValue: 'Deactivate Google Analytics',
                    },
                  )}
                  trailing={props => <Switch value={false} disabled />}
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
                style={styles.textInput}
              />
              <>
                {/* todo: Adicionar possibilidade de ativar um servidor junto a aplicação */}
                <ListItem
                  title="API"
                  overline={'Servidor Local'}
                  secondaryText={
                    'Permitir comandos remotos no dispositivo via Socket'
                  }
                  trailing={props => <Switch value={false} />}
                />
              </>
            </Surface>
          </Stack>
        </ScrollView>
        <FAB
          style={styles.fab}
          icon={props => <Icon name="content-save" {...props} />}
          color="primary"
        />
      </ScrollView>
    );
  }
}

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
