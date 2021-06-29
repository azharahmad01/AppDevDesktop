import React, {useState, useEffect} from 'react';
import { FlatList, Text, Platform, View , ActivityIndicator, StyleSheet, Alert} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as OrderActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';


const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(OrderActions.fetchOrders())
    .then(res => {
      setIsLoading(false);
    }).catch(err => {
      Alert.alert('ERROR',err.message,[{}])
    }) 
  },[dispatch])


  if(isLoading){
    return <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} /> 
    </View>
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No order found, maybe start ordering some products?</Text>
      </View>
    );
  }

  return (
    <FlatList
    data={orders}
    keyExtractor={item => item.id}
    renderItem={itemData => (
      <OrderItem
        amount={itemData.item.totalAmount}
        date={itemData.item.readableDate}
        items={itemData.item.items}
      />
    )}
  />
  );
};


export const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

export default OrdersScreen;
