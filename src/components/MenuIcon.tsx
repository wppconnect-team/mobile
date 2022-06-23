import React from 'react';
import {IconButton} from '@react-native-material/core';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useCallback} from 'react';

export default function MenuIcon() {
  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  return <IconButton icon="menu" onPress={openDrawer} />;
}
