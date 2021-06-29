import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Header from "./components/Header/Header";
import StartGameScreen from "./screens/startGameScreen";
import GameScreen from "./screens/GameScreen"
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [currentGuess, setCurrentGuess] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }


  const startGameHandler = (userChoice) => {
    setCurrentGuess(userChoice);
    setGuessRounds(0);
  }

  const gameOverHandler = rounds => {
    setGuessRounds(rounds);
  }

  const restartGamehandler = () => {
    setGuessRounds(0);
    setCurrentGuess(null);
  }


  let content =   <StartGameScreen onStartGame={startGameHandler}/>;

  if(currentGuess && guessRounds <= 0){
    content = <GameScreen userChoice={currentGuess} onGameOver={gameOverHandler} />
  }
  else if(guessRounds > 0){
    content = <GameOverScreen restartGame={restartGamehandler} userNumber={currentGuess} rounds={guessRounds}/>
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
