import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';
import views from 'consts/views';
import {HomeScreen, AppHomeScreen, ConfigScreen} from 'views';

const Stack = createNativeStackNavigator();

class RouteContainer extends Component<
  | {
      isFirstTime?: boolean;
    }
  | any
> {
  state = {
    isFirstTime: this.props.isFirstTime,
  };
  constructor(props: any) {
    super(props);
  }

  get initialRouteName(): string {
    return this.state.isFirstTime ? 'Home' : 'AppHome';
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={this.initialRouteName}
          screenOptions={{
            headerShown: false,
            animation: 'none',
          }}>
          <Stack.Screen name={views.Home} component={HomeScreen} />
          <Stack.Screen name={views.AppHome} component={AppHomeScreen} />
          <Stack.Screen name={views.Settings} component={ConfigScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isFirstTime: state?.global?.isFirstTime,
  };
};

export default connect(mapStateToProps, null)(RouteContainer);
