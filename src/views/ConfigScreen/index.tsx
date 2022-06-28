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
import {StyleSheet, ScrollView} from 'react-native';
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
import {connector, PropsFromRedux} from 'redux/reducer/wajs/mapper';

interface ConfigScreenProps extends PropsFromRedux {
  navigation: NavigationScreenProp<any>;
}

class ConfigScreen extends Component<ConfigScreenProps, {}> {
  render() {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
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
                value={this.props.config.wajs.deviceName}
                onChangeText={text =>
                  this.props.setWaJsConfig({deviceName: text})
                }
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
                value={this.props.config.wajs.liveLocationLimit.toString()}
                onChangeText={text =>
                  this.props.setWaJsConfig({liveLocationLimit: Number(text)})
                }
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
                value={this.props.config.wajs.googleAnalyticsId || ''}
                editable={!this.props.config.wajs.disableGoogleAnalytics}
                selectTextOnFocus={
                  !this.props.config.wajs.disableGoogleAnalytics
                }
                onChangeText={text =>
                  this.props.setWaJsConfig({googleAnalyticsId: text})
                }
              />
              <>
                <ListItem
                  title={translate(
                    'view.config.stack.wajs.inputs.disable_ga.title',
                    {
                      defaultValue: 'Deactivate Google Analytics',
                    },
                  )}
                  trailing={props => (
                    <Switch
                      value={this.props.config.wajs.disableGoogleAnalytics}
                      onValueChange={value =>
                        this.props.setWaJsConfig({
                          disableGoogleAnalytics: value,
                        })
                      }
                    />
                  )}
                />
              </>
            </Surface>
            <Surface elevation={2} category="medium" style={styles.surface}>
              <Text variant={'h6'}>
                {translate('view.config.stack.advanced.title', {
                  defaultValue: 'Advanced',
                })}
              </Text>
              <Text variant={'caption'}>
                {translate('view.config.stack.advanced.caption', {
                  defaultValue: 'Settings to enable remote instance automation',
                })}
              </Text>
              <TextInput
                variant="standard"
                placeholder={translate(
                  'view.config.stack.advanced.inputs.socket.placeholder',
                  {
                    defaultValue: 'wss://your-server',
                  },
                )}
                label={translate(
                  'view.config.stack.advanced.inputs.socket.label',
                  {
                    defaultValue: 'Socket URL',
                  },
                )}
                helperText={translate(
                  'view.config.stack.advanced.inputs.socket.helperText',
                  {
                    defaultValue:
                      'Address of the Socket server that will communicate with the device',
                  },
                )}
                style={styles.textInput}
                value={this.props.config.mobile.server.uri}
                onChangeText={text =>
                  this.props.setMobileServerConfig({uri: text})
                }
              />
              <>
                {/* todo: Adicionar possibilidade de ativar um servidor junto a aplicação */}
                <ListItem
                  title={translate(
                    'view.config.stack.advanced.inputs.api.title',
                    {
                      defaultValue: 'API',
                    },
                  )}
                  overline={translate(
                    'view.config.stack.advanced.inputs.api.overline',
                    {
                      defaultValue: 'Local Server',
                    },
                  )}
                  secondaryText={translate(
                    'view.config.stack.advanced.inputs.api.secondaryText',
                    {
                      defaultValue:
                        'Allow remote commands on device via Socket',
                    },
                  )}
                  trailing={props => (
                    <Switch
                      value={this.props.config.mobile.server.enableAPI}
                      onValueChange={value =>
                        this.props.setMobileServerConfig({
                          enableAPI: value,
                        })
                      }
                    />
                  )}
                />
              </>
            </Surface>
          </Stack>
        </ScrollView>
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

export default connector(ConfigScreen);
