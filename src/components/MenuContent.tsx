import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image} from 'react-native';

const MenuContent: React.FunctionComponent<
  DrawerContentComponentProps
> = props => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <Image
        resizeMode='cover'
        style={{width: '100%', height: 140}}
        source={require('../assets/drawerHeaderImage.jpg')}
      /> */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default MenuContent;
