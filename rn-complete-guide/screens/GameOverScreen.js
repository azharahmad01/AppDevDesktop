import React from "react";
import {Text, View, StyleSheet, Button, Image} from "react-native";
import  Colors  from "../constants/colors";
import BodyText from "../components/BodyText/BodyText";
import TitleText from "../components/TitleText/TitleText";
import MainButton from "../components/MainButton/MainButton";

const gameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>
                Game is over!
            </TitleText>
            <View style={styles.imgContainer}>
                <Image
                fadeDuration={300}
                style={styles.image} 
                source={/*require('../assets/success.png')*/
                {uri: 'https://assets.entrepreneur.com/content/3x2/2000/20150724190206-success-focus-life-achievements.jpeg?width=700&crop=2:1'}
                } />   
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.rounds}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
                </BodyText>
            </View>
            
           
            <MainButton onPress={props.restartGame}>NEW GAME</MainButton>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imgContainer:{
        width:300,
        height:300,
        marginVertical:10,
        borderColor:'black',
        borderWidth:2,
        borderRadius:150,
        overflow:'hidden'
    },  
    image:{
        width:'100%',
        height:'100%',
        borderRadius:150,
    },
    highlight:{
        color:Colors.primary
    },
    resultContainer:{
        marginHorizontal:20
    },
    resultText:{
        textAlign:"center",
        fontSize:18
    }
})

export default gameOverScreen;