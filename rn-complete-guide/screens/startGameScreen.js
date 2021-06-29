import React, { useState} from "react";
import {Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
import Card from "../components/Card/Card";
import Colors from "../constants/colors";
import Input from "../components/Input/Input";
import NumberContainer from "../components/NumberContainer/NumberContainer";
import BodyText from "../components/BodyText/BodyText";
import MainButton from "../components/MainButton/MainButton";


const StartGameScreen = (props) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber,setSelectedNumber] = useState('')

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText)
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('InValid Number','Number should be greater than 0 and less than 99',[{text:'Okay',style : 'destructive',onPress:resetInputHandler}])
            return;
        }
        
        setConfirmed(true);
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput = null;
    if(confirmed){
        confirmedOutput = 
        <Card style={styles.confirmedOutput}>
            <BodyText>You Selected</BodyText>
            <NumberContainer>
                <Text style={styles.number}>{selectedNumber}</Text>
            </NumberContainer>
            <Text style={styles.highlight}>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Text>
        </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game</Text>
                <Card style={styles.inputContainer}>
                    <BodyText>Enter a number!</BodyText>
                    <Input style={styles.input}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                    />
                    <View style={styles.btnContainer}>
                        <Button title="Reset" color={Colors.secondary} onPress={resetInputHandler}/>
                        <Button title="Confim" color={Colors.primary} onPress={confirmInputHandler}/>
                    </View>
                </Card>

                {confirmedOutput}
            </View>    
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
        padding:20,
    },
    inputContainer:{
        alignItems:"center",
        width:250,
    },
    title:{
        fontSize:30,
        marginVertical:15,
        fontFamily:'open-sans-bold',
    },
    btnContainer:{
        width:"100%",
        flexDirection:"row",
        paddingHorizontal:30,
        justifyContent:"space-between"

    },
    input:{
        width:50,
        textAlign:"center"
    },
    confirmedOutput:{
        marginVertical:20,
        alignItems:"center"
    },
    number:{
        fontSize:25
    },
    highlight:{
        fontSize:20,
        color:Colors.primary
    }

})

export default StartGameScreen;

