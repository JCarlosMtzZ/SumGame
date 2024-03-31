import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber.js';
import PlayAgainBtn from './PlayAgainBtn.js';
import shuffle from 'lodash.shuffle';
import { LinearGradient } from 'expo-linear-gradient';

function Game({ randomNumberCount, initialSeconds, onPlayAgain, score }) {

  const propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
    score: PropTypes.number.isRequired
  };
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(0);
  const [remainingSeconds, setRemainigSeconds] = useState(initialSeconds);
  const [gameStatus, setGameStatus] = useState('PLAYING');
  const [intervalId, setIntervalId] = useState(null);
  const [barTime, setBarTime] = useState(300/initialSeconds*remainingSeconds)
  const [isLessThanHalfTime, setIsLessThanHalfTime] = useState(false);

  const calcGameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + randomNumbers[curr];
    }, 0);
    if (remainingSeconds === 0) return 'LOST';
    if (sumSelected < target) return 'PLAYING';
    if (sumSelected === target && selectedIds.length > 0) return 'WON';
    if (sumSelected > target) return 'LOST';
    if (selectedIds.length === 0) return 'PLAYING';
  };

  useEffect(() => {

    const generateRandomNumbersAndTarget = () => {
      const newRandomNumbers = Array
        .from({ length: randomNumberCount })
        .map(() => 1 + Math.floor(10 * Math.random()));
      const newTarget = newRandomNumbers
        .slice(0, randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
      setRandomNumbers(shuffle(newRandomNumbers));
      setTarget(newTarget);
    };

    const updateRemainingSeconds = () => {
      const id = setInterval(() => {
        setRemainigSeconds(prevRemainingSeconds => {
          if (prevRemainingSeconds === 0) {
            clearInterval(id);
            return prevRemainingSeconds;
          } else {
            return prevRemainingSeconds - 1;
          }
        });
      }, 1000);
      setIntervalId(id);
    };

    generateRandomNumbersAndTarget();
    updateRemainingSeconds();

    setBarTime(300/initialSeconds*remainingSeconds);
    setIsLessThanHalfTime(false);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setBarTime(300/initialSeconds*remainingSeconds);
    if (barTime < (300/initialSeconds)*(initialSeconds/2)) setIsLessThanHalfTime(true);
    if (remainingSeconds === 0) setGameStatus(calcGameStatus());
    if (gameStatus !== 'PLAYING' && intervalId) {
      clearInterval(intervalId);
    }
    
  }, [remainingSeconds]);

  useEffect(() => {
    setGameStatus(calcGameStatus());
    if (gameStatus !== 'PLAYING' && intervalId) {
      clearInterval(intervalId);
    }
    
  }, [selectedIds]);
  

  const isNumberSelected = (numberIndex) => {
    return selectedIds.indexOf(numberIndex) >= 0;
  };
  const selectNumber = (numberIndex) => {
    setSelectedIds(prevSelectedIds => [...prevSelectedIds, numberIndex]);
  };
  


  return (  
    <LinearGradient colors={['#ff407d', '#ff5a8e', '#ff73a0']} style={styles.container}>
      <Text style={styles.scoreTitle}>{'Score: ' + score}</Text>
      <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{target}</Text>
      <View style={[styles.timeBar, {width: barTime}, isLessThanHalfTime && styles.halfTimeBar]}></View>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={
              isNumberSelected(index) || gameStatus !== 'PLAYING'}
            onPress={selectNumber} />
        )}
      </View>
      {gameStatus !== 'PLAYING' &&
        <PlayAgainBtn
          result={gameStatus}
          onPress={onPlayAgain}
        />
      }
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scoreTitle: {
    margin: 35,
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#ff407d',
    alignItems: 'center',
    marginTop: 30
  },
  target: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    fontSize: 60,
    fontWeight: 'bold',
    backgroundColor: '#1b3c73',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  timeBar: {
    marginTop: 30,
    height:15,
    borderRadius: 5,
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: '#fff'
  },
  halfTimeBar: {
    backgroundColor: 'red'
  },
  STATUS_PLAYING: {
    color: '#fff',
    borderColor: '#fff'
  },
  STATUS_WON: {
    color: 'green',
    borderColor: 'green',
  },
  STATUS_LOST: {
    color: 'red',
    borderColor: 'red',
  },
  randomContainer: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
});

export default Game;