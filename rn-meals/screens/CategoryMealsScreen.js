import React from "react";
import {View, Text, StyleSheet,Button, FlatList} from "react-native";
import { useSelector } from "react-redux";
import {CATEGORIES} from "../data/dummy-data";
import MealItem from "../components/MealItem";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {

  
    const categoryId = props.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const categoryMeals = availableMeals.filter((meal) => meal.categoryIds.indexOf(categoryId) >= 0);

    if(categoryMeals.length == 0 || !categoryMeals){
        return <View style={styles.screen}>
            <DefaultText>No Meals available!</DefaultText>
        </View>
    }
    return (
        <MealList listData={categoryMeals} navigation={props.navigation} /> 
    )
}

CategoryMealsScreen.navigationOptions = (navigationData) => {    
    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

    return {
        title:selectedCategory.title,
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

export default CategoryMealsScreen;