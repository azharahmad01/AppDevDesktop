import React from "react";
import {View, Text, StyleSheet} from "react-native";
import MealList from "../components/MealList";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import {useSelector} from "react-redux";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = (props) => {

    const meals = useSelector(state => state.meals.favoriteMeals)

    if(meals.length == 0 || !meals){
        return <View style={styles.screen}>
            <DefaultText>No Favorite items yet! Start adding soon!</DefaultText>
        </View>
    }
    return (
        <MealList listData={meals} navigation={props.navigation} />
    )
}

FavoritesScreen.navigationOptions = (navData) => {
    return {
    title:'My Favorites',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
            navData.navigation.toggleDrawer()
            }} />
    </HeaderButtons>
    }
}
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
});

export default FavoritesScreen;