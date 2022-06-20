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
import {AppBar, HStack, IconButton} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationScreenProp} from 'react-navigation';
import {Settings} from 'consts/views';

interface AppBarProps {
  title?: string;
  subtitle?: string;
  navigation?: NavigationScreenProp<any>;
  useGoBack?: boolean;
}

class CustomAppBar extends Component<AppBarProps, {}> {
  public static defaultProps = {
    title: 'Wppconnect',
    subtitle: null,
    useGoBack: false,
  };

  render() {
    return (
      <AppBar
        title={this.props.title}
        subtitle={this.props.subtitle}
        leading={props =>
          this.props.useGoBack ? (
            <IconButton
              icon={props => <Icon name="arrow-left" {...props} />}
              {...props}
              onPress={() => {
                this.props.navigation?.goBack();
              }}
            />
          ) : (
            <IconButton
              icon={props => <Icon name="menu" {...props} />}
              {...props}
            />
          )
        }
        trailing={props =>
          this.props.useGoBack ? null : (
            <HStack>
              <IconButton
                icon={props => <Icon name="dots-vertical" {...props} />}
                {...props}
                onPress={() => {
                  if (!this.props.useGoBack) {
                    this.props.navigation?.navigate(Settings);
                  }
                }}
              />
            </HStack>
          )
        }
      />
    );
  }
}

export default CustomAppBar;
