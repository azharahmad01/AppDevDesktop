import { createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, createTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from "react-navigation";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import Colors from "../constants/colors";
import {Ionicons} from '@expo/vector-icons';
import { Platform, TouchableNativeFeedbackComponent } from 'react-native';
import React from "react"
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOptions = {
        headerStyle: {
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'#fff'
}

const MealNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals:{
        screen:CategoryMealsScreen,
    },
    MealDetail:MealDetailScreen
},{
    defaultNavigationOptions: defaultStackNavOptions
} )


const FavNavigator = createStackNavigator({
    Favorites:FavoritesScreen,
    MealDetail:MealDetailScreen
},{
    defaultNavigationOptions: defaultStackNavOptions
})



const tabScreenConfig = {
    Meals:{
        screen:MealNavigator, 
        navigationOptions:{
            tabBarIcon:(tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />            
            },
            tabBarColor: Colors.primaryColor //only works with shifting true
        }
    },
    Favorites:{
        screen:FavNavigator,
        navigationOptions:{
            tabBarLabel:'Favorites!',
            tabBarIcon:(tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />            
            },
            tabBarColor: Colors.accentColor
        }
    }
}

const MealsFavTabNavigator =
 Platform.OS == 'android' ? 
 createMaterialBottomTabNavigator(tabScreenConfig,
    {
     activeColor: 'white',
     shifting:true   
    }) : 
createBottomTabNavigator(tabScreenConfig,{
    tabBarOptions:{
        activeTintColor:Colors.accentColor
    }
})

const FiltersNavigator = createStackNavigator({
    Filters:FiltersScreen
},{
    defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions:{
            drawerLabel:'Meals'
       }
    },
    Filters: FiltersNavigator

},{
    contentOptions:{
        activeTintColor:Colors.accentColor,
        labelStyle:{
            fontFamily:'open-sans-bold'
        }
    }
})
export default createAppContainer(MainNavigator);