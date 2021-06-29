import {createStackNavigator} from 'react-navigation-stack';
import { createTabNavigator } from 'react-navigation-tabs';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {createSwitchNavigator} from 'react-navigation';
import ProductsOverviewScreen from "../screens/shop/ProductsOverView";
import Colors from "../constants/Colors";
import {createAppContainer} from "react-navigation"
import ProductDetailScreen from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {Ionicons} from '@expo/vector-icons';
import React from "react";
import {Platform, View, Button, SafeAreaView} from 'react-native'
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import {useDispatch} from "react-redux";
import * as authActions from "../store/actions/auth"


const defaultNavOptions = {
    headerStyle:{
        backgroundColor:Colors.primary
    },
    headerTintColor:'white'
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview:ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart:CartScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
    },
    defaultNavigationOptions:defaultNavOptions
})


const OrdersNavigator = createStackNavigator({
    Orders:OrdersScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={drawerConfig.tintColor}
            />
          )
    },
    defaultNavigationOptions:defaultNavOptions
})


const AdminNavigator = createStackNavigator(
    {
      UserProducts: UserProductsScreen,
      EditProduct: EditProductScreen
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            size={23}
            color={drawerConfig.tintColor}
          />
        )
      },
      defaultNavigationOptions: defaultNavOptions
    }
  );


const ShopNavigator = createDrawerNavigator({
    Products:ProductsNavigator,
    Orders:OrdersNavigator,
    Admin:AdminNavigator
},{
    contentOptions:{
        activeTintColor:Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
})

const AuthNavigator = createStackNavigator({
  Authenticated:AuthScreen
},{
  defaultNavigationOptions:defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Startup:StartupScreen,
  Auth:AuthNavigator,
  Shop:ShopNavigator
})


export default createAppContainer(MainNavigator);