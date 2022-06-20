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

interface ConfigScreenProps {
  navigation: NavigationScreenProp<any>;
}

class ConfigScreen extends Component<ConfigScreenProps, {}> {
  render() {
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollOuter}>
        <View style={styles.view}>
          <AppBar
            subtitle={translate('view.config.title', {
              defaultValue: 'Settings',
            })}
            navigation={this.props.navigation}
            useGoBack={true}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollOuter: defaultStyles.scrollOuter,
  scroll: defaultStyles.scroll,
  view: defaultStyles.view as object,
});

export default connect(null, null)(ConfigScreen);
