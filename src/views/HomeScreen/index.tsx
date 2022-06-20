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
import {
  Animated,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Easing,
} from 'react-native';
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

class HomeScreen extends Component<HomeProps, {}> {
  state = {
    verticalVal: new Animated.Value(0),
  };

  constructor(props: HomeProps | Readonly<HomeProps>) {
    super(props);
  }

  componentDidMount() {
    Animated.timing(this.state.verticalVal, {
      useNativeDriver: true,
      toValue: 50,
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    }).start();

    this.state.verticalVal.addListener(({value}) => {
      if (value === 50) {
        Animated.timing(this.state.verticalVal, {
          useNativeDriver: true,
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
        }).start();
      } else if (value === 0) {
        Animated.timing(this.state.verticalVal, {
          useNativeDriver: true,
          toValue: 50,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
        }).stop;
      }
    });
  }

  onPress = () => {
    this.props.updateFirstTimeStatus();
    this.props.navigation.navigate(AppHome);
  };
  render() {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollOuter}>
        <Animated.View
          style={{
            ...styles.Wrapper,
            transform: [{translateY: this.state.verticalVal}],
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
                onPress={this.onPress}
              />
            </Stack>
          </View>
        </Animated.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollOuter: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  scroll: {
    backgroundColor: colors.bgHello,
    height: '100%',
    display: 'flex',
  },
  Wrapper: {
    padding: 40,
    paddingLeft: 15,
    paddingRight: 15,
    width: '100%',
  },
  mainText: {
    fontWeight: 'bold',
    color: colors.absoluteWhite,
    fontFamily: 'Proxima Nova Reg',
    fontSize: 32,
  },
  subtitleText: {
    color: colors.absoluteWhite,
    fontFamily: 'Proxima Nova Reg',
    fontSize: 25,
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.primary,
  },
});

const mapDispatchToProps = {
  updateFirstTimeStatus,
};

export default connect(null, mapDispatchToProps)(HomeScreen);
