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

import React, {useCallback} from 'react';
import {AppBar, HStack, IconButton} from '@react-native-material/core';
import {
  DrawerActions,
  DrawerActionType,
  useNavigation,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Settings} from 'consts/views';

type Props = {
  title?: string;
  subtitle?: string;
  useGoBack?: boolean;
  DrawerAction?: DrawerActionType;
};

const CustomAppBar = (props: Props) => {
  const navigation = useNavigation();
  const {title, subtitle, useGoBack} = props;
  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  return (
    <AppBar
      title={title}
      subtitle={subtitle}
      leading={props =>
        useGoBack ? (
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
            {...props}
            onPress={() => {
              navigation?.goBack();
            }}
          />
        ) : (
          <IconButton
            icon={props => <Icon name="menu" {...props} />}
            onPress={openDrawer}
            {...props}
          />
        )
      }
      trailing={props =>
        useGoBack ? null : (
          <HStack>
            <IconButton
              icon={props => <Icon name="dots-vertical" {...props} />}
              {...props}
              onPress={() => {
                if (!useGoBack) {
                  navigation?.navigate({key: Settings});
                }
              }}
            />
          </HStack>
        )
      }
    />
  );
};

export default CustomAppBar;
