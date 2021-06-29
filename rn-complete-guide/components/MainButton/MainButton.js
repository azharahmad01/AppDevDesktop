import React from "react";
import {Text, View, StyleSheet, TouchableOpacity, Touchable} from "react-native";
import Colors from "../../constants/colors";


const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{...styles.buttonContainer,...props.style}}>
                <Text style={styles.text}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:Colors.primary,
        paddingHorizontal:20,
        paddingVertical:15,
        borderRadius:25,
        marginVertical:5,
        minWidth:120,
        justifyContent:'center'
    },
    text:{
        color:'white',
        textAlign:'center'
    }
})

export default MainButton;