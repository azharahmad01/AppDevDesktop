import React, {useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Button, ScrollView, Image} from "react-native";

import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { List } from "react-native-paper";
import {useSelector, useDispatch} from 'react-redux';
import {toggleFavorite} from "../store/actions/meals";

const ListItem = (item) => {
    return (
        <View style={styles.listItem}>
            <Text>{item}</Text>
        </View>
    )
}

const MealDetailScreen = (props) => {

    const mealId = props.navigation.getParam('mealId');

    const availableMeals = useSelector(state => state.meals.meals);
    const meal = availableMeals.find((meal) => meal.id === mealId)


    const dispatch = useDispatch();




    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch,mealId])


    useEffect(() => {
        props.navigation.setParams({'toggleFav':toggleFavoriteHandler})
    }, [toggleFavoriteHandler])


    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: meal.imageUrl}}/>
            <View style={styles.detail}>
                <DefaultText>
                    {meal.duration}m
                </DefaultText>
                <DefaultText>
                    {meal.complexity.toUpperCase()}
                </DefaultText>
                <DefaultText>
                    {meal.affordability.toUpperCase()}
                </DefaultText>
            </View>
             <View style={styles.container}>
                 <Text style={styles.title}>
                     Ingredients
                 </Text>

                 {meal.ingredients.map(ingredient => {
                     return ListItem(ingredient);
                 })}

                 <Text style={styles.title}>
                     Steps
                 </Text>

                 {meal.steps.map(ingredient => {
                     return ListItem(ingredient);
                 })}
             </View>
        </ScrollView>

    )
}

MealDetailScreen.navigationOptions = (navigationData) => {

    const mealId = navigationData.navigation.getParam('mealId');
   
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    console.log("Aaaa")
    const toggleFavoriteHandler = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');
    return {
        title:mealTitle,
        headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Favorite" 
            iconName={isFav ? "ios-star" : "ios-star-outline" } 
            onPress={() => {
                toggleFavoriteHandler();
            }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        height:200,
        width:'100%'
    },
    detail:{
        flexDirection:'row',
        padding:15,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white'
    },
    container:{
        paddingHorizontal:20
    },  
    title:{
        textAlign:"center",
        fontSize:22,
        marginVertical:10
    },
    listItem:{
        marginVertical:5,
        backgroundColor:'white',
        padding:10,
        alignItems:'center',
        borderRadius:10
    }
});

export default MealDetailScreen;