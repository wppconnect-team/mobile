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
  onSettingsPressed = () => {
    console.log('ok');
  };
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
