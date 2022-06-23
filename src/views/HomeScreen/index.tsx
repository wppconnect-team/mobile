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

import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Stack, Button} from '@react-native-material/core';
import translate from 'translations';
import {connect} from 'react-redux';
import {
  updateFirstTimeStatus,
  UpdateFirstTimeStatusFunction,
} from 'redux/reducer/global';
import {NavigationScreenProp} from 'react-navigation';
import colors from '/consts/colors';
import {AppHome} from 'consts/views';

interface HomeProps {
  navigation: NavigationScreenProp<any>;
  updateFirstTimeStatus: UpdateFirstTimeStatusFunction;
}

const HomeScreen = (props: HomeProps | Readonly<HomeProps>) => {
  const onPress = () => {
    props.updateFirstTimeStatus();
    props.navigation.navigate(AppHome);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollOuter}>
      <View
        style={{
          ...styles.Wrapper,
        }}>
        <View style={{height: '50%'}}>
          <Text style={styles.mainText}>
            {translate('view.intro.title', {
              defaultValue: 'If you can imagine it we can do it',
            })}
          </Text>
          <Text style={styles.subtitleText}>
            {translate('view.intro.subtitle', {
              defaultValue:
                'We are the best WhatsApp automation solution you were looking for',
            })}
          </Text>
          <Stack fill center spacing={4}>
            <Button
              style={styles.button}
              title={translate('view.intro.button', {
                defaultValue: 'Continue',
              })}
              onPress={onPress}
            />
          </Stack>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    padding: 40,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  button: {
    backgroundColor: colors.primary,
  },
  mainText: {
    color: colors.absoluteWhite,
    fontFamily: 'Proxima Nova Reg',
    fontSize: 32,
    fontWeight: 'bold',
  },
  scroll: {
    backgroundColor: colors.bgHello,
    display: 'flex',
    height: '100%',
  },
  scrollOuter: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 20,
  },
  subtitleText: {
    color: colors.absoluteWhite,
    fontFamily: 'Proxima Nova Reg',
    fontSize: 25,
    marginTop: 10,
  },
});

const mapDispatchToProps = {
  updateFirstTimeStatus,
};

export default connect(null, mapDispatchToProps)(HomeScreen);
