import React, {useState, useRef, useEffect} from "react";
import {Text, View, StyleSheet, Button, Alert, FlatList} from "react-native";
import NumberContainer from "../components/NumberContainer/NumberContainer";
import Card from "../components/Card/Card";
import MainButton from "../components/MainButton/MainButton";
import {Ionicons} from '@expo/vector-icons';
import BodyText from "../components/BodyText/BodyText";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)

    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if(rndNum == exclude){
        return generateRandomBetween(min, max, exclude)
    }
    else{
        return rndNum;
    }
}

const getListItem = (totalRounds, itemData) => {
    return (
        <View style={styles.listItem}>
            <BodyText>#{totalRounds - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    )
}

const GameScreen = (props) => {
    let initialGuess = generateRandomBetween(1,100,props.userChoice)
    const [currentGuess,setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props;

    useEffect(() => {
       if(currentGuess === props.userChoice){
           onGameOver(pastGuesses.length);
       }
    },[userChoice, onGameOver, currentGuess])

    const nextGuessHandler = direction => {
        if(
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'greater' && currentGuess > props.userChoice)){
                Alert.alert('Don\'t lie!','You know that this is wrong...',[{text:'Sorry',style:'cancel'}])
                return;
            }

        if(direction === 'lower'){
            currentHigh.current = currentGuess
        }
        else{
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber);

        setPastGuesses(prevGuesses => [nextNumber.toString(), ...prevGuesses]);
    }

    return (
        <View style={styles.screen}>
            <Text>{props.userChoice}</Text>
            <Text>Opponent's Guess</Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.btnContainer}>
                <MainButton onPress={() => nextGuessHandler('lower')}>
                    <Ionicons name="md-remove" size={24}/>
                </MainButton>
                <MainButton  onPress={() => nextGuessHandler('greater')}>
                    <Ionicons name="md-add" size={24}/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList keyExtractor={item => item} 
                data={pastGuesses} 
                renderItem={getListItem.bind(this,pastGuesses.length)}
                contentContainerStyle={styles.list} />
            </View>        
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    btnContainer:{
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-around',
        width:300
    },
    listContainer:{
        width:'60%',
        flex:1,
        alignItems:'center',
        padding:10,
    },
    list:{
        flexGrow:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    listItem:{
        padding:10,
        borderColor:'#ccc',
        borderWidth:1,
        marginVertical:10,
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%',
    }
})

export default GameScreen