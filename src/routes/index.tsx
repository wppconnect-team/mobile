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
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {connect} from 'react-redux';
import views from 'consts/views';
import {HomeScreen, AppHomeScreen, ConfigScreen} from 'views';

const Stack = createNativeStackNavigator();

const RouteContainer = (props: any) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={props.isFirstTime ? 'Home' : 'AppHome'}
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
};

const mapStateToProps = (state: any) => {
  return {
    isFirstTime: state?.global?.isFirstTime,
  };
};

export default connect(mapStateToProps, null)(RouteContainer);
