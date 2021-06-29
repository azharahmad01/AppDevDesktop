import React from "react";
import {View, Text, StyleSheet, Button,FlatList} from "react-native";
import MealItem from "./MealItem";
import {useSelector} from "react-redux";
const MealList = (props) => {
    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)
       
    const renderMeal = (itemData) => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
        return (
           <MealItem 
           item={itemData.item} 
           onSelectMeal={() => {
               props.navigation.navigate({
                   routeName:'MealDetail',
                   params:{
                       mealId:itemData.item.id,
                       mealTitle:itemData.item.title,
                       isFav:isFavorite
                   }
               })
           }} 
           
           />
        )
    }
    return (
        <View style={styles.screen}>
            <FlatList style={{width:'100%'}} 
            data={props.listData} 
            keyExtractor={(item,index) => item.id} 
            renderItem={renderMeal} />
        </View>
    )
}

MealList.navigationOptions = (navigationData) => {
    return {
       
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:15
    },
    list:{
        width:'100%'
    }
});

export default MealList;