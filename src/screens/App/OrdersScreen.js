import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import {AuthContext} from '../../contexts/AuthProvider';
import {Colors} from '../../constants';

export default function OrdersScreen() {
  const {user} = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('orders')
      .onSnapshot(snapshot => setOrders(snapshot.docs));
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        ListHeaderComponent={() => <View style={styles.listHeaderComponent} />}
        renderItem={({item}) => {
          return (
            <View style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.foodInfoContainer}>
                <Text style={styles.title}>{item.data().title}</Text>
                <Text style={styles.description}>
                  {item.data().description}
                </Text>
                <Text style={styles.price}>
                  {item.data().price ? item.data().price : 'N/A'}
                </Text>
                <Text style={styles.createdAt}>
                  {item.data().createdAt.toDate().toLocaleString()}
                </Text>
              </View>

              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: item.data().image}} />
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItem: {
    backgroundColor: Colors.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    paddingVertical: 10,
    paddingLeft: 20,
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 7,
    elevation: 5,
    shadowColor: Colors.darkGrey,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
    overflow: 'hidden',
  },
  foodInfoContainer: {
    flex: 0.65,
  },
  imageContainer: {
    flex: 0.3,
    maxWidth: 100,
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: 'Signika-SemiBold',
    fontSize: 17,
  },
  description: {
    fontFamily: 'Signika-Regular',
    fontSize: 14,
    marginVertical: 10,
    color: Colors.darkGrey,
  },
  price: {
    fontSize: 14,
    color: Colors.darkGrey,
    opacity: 0.7,
    fontFamily: 'Signika-SemiBold',
  },
  createdAt: {
    fontFamily: 'Signika-Regular',
    color: Colors.darkGrey,
    marginTop: 10,
    fontSize: 14,
  },
  listHeaderComponent: {
    height: 10,
  },
});
