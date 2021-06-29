import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Colors from "../../constants/colors";

const NumberContainer = (props) => {


    return (
        <Text style={styles.container}>
            {props.children}
        </Text>
    )
}


const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        alignItems:'center',
        borderColor:Colors.primary,
        borderWidth:2,
        fontSize:30,
        padding:10
    },

})


export default NumberContainer;