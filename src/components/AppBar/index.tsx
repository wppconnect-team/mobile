import React, {Component} from 'react';
import {AppBar, HStack, IconButton} from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {NavigationScreenProp} from 'react-navigation';
import {Settings} from 'consts/views';

interface AppBarProps {
  title?: string;
  subtitle?: string;
  navigation?: NavigationScreenProp<any>;
  useGoBack?: boolean;
}

class CustomAppBar extends Component<AppBarProps, {}> {
  state = {
    revealed: false,
  };
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
