import React, {useState, useEffect, useCallback} from "react";
import {View, Text, StyleSheet, Switch} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../constants/colors";
import { useDispatch } from "react-redux";
import {setFilters} from "../store/actions/meals";

const Filter = props => {
    return (
        <View style={styles.filterContainer}>
            <Text style={styles.filter}>{props.title}</Text>
            <Switch value={props.state} 
            onValueChange={props.onChange}
            trackColor={{true:Colors.primaryColor}} /> 
        </View>
    )
}

const FiltersScreen = (props) => {
    const [glutenFree, setGlutenFree] = useState(false)
    const [lactoseFree, setLactoseFree] = useState(false)
    const [vegan, setVegan] = useState(false)
    const [vegetarian, setVegetarian] = useState(false)

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const filters = {
            gluten:glutenFree,
            lactose:lactoseFree,
            vegan:vegan,
            vegetarian:vegetarian
        }
        dispatch(setFilters(filters))
    },[glutenFree,lactoseFree,vegan,vegetarian])

    useEffect(() => {
        props.navigation.setParams({'save':saveFilters});
    },[saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Filters!</Text>
            <Filter title="Gluten-Free" 
            state={glutenFree} 
            onChange={newValue => setGlutenFree(newValue)} />
            <Filter title="Lactose-Free" 
            state={lactoseFree} 
            onChange={newValue => setLactoseFree(newValue)} />
            <Filter title="Vegan" 
            state={vegan} 
            onChange={newValue => setVegan(newValue)} />
            <Filter title="Vegetarian" 
            state={vegetarian} 
            onChange={newValue => setVegetarian(newValue)} />
        </View>
    )
}


FiltersScreen.navigationOptions = (navData) => {
    return {
    title:'Filter Meals',
    headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={() => {
            navData.navigation.toggleDrawer()
            }} />
    </HeaderButtons>,
    headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Save" iconName="ios-save" onPress={() => {
            navData.navigation.getParam('save')();
            }} />
    </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22
    },
    filterContainer:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-between',
        marginVertical:10
    },
    filter:{
        fontSize:18
    }
});

export default FiltersScreen;