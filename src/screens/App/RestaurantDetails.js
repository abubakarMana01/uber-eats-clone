import React from 'react';
import {View, StyleSheet} from 'react-native';

import {AboutRestaurant, MenuItems, ViewCart} from '../../components';

export default function RestautantDetails({route, navigation}) {
  return (
    <View style={styles.container}>
      <AboutRestaurant data={route.params.item} />
      <MenuItems data={route.params.item} />
      <ViewCart />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
