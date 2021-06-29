import React from "react";

import {Text, View , StyleSheet} from "react-native";
import Colors from "../../constants/colors";


const Header = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        height:110,
        padding:34,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:Colors.primary
    },
    title:{
        fontSize:28,
        color:Colors.secondary,
        fontFamily:'open-sans-bold'
    }
})

export default Header;