import { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber.js';

function Game({ randomNumberCount }) {

  const propTypes = {
    randomNumberCount: PropTypes.number.isRequired
  };
  
  const [selectedIds, setSelectedIds] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(0);

  useEffect(() => {
    const newRandomNumbers = Array
      .from({ length: randomNumberCount })
      .map(() => 1 + Math.floor(10 * Math.random()));
    const newTarget = newRandomNumbers
      .slice(0, randomNumberCount - 2)
      .reduce((acc, curr) => acc + curr, 0);

      setRandomNumbers(newRandomNumbers);
      setTarget(newTarget);
  }, []);

  

  const isNumberSelected = (numberIndex) => {
    return selectedIds.indexOf(numberIndex) >= 0;
  };
  const selectNumber = (numberIndex) => {
    setSelectedIds(prevSelectedIds => [...prevSelectedIds, numberIndex]);
  };
  const gameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + randomNumbers[curr];
    }, 0);
    if (sumSelected < target) return 'PLAYING';
    if (sumSelected === target) return 'WON';
    if (sumSelected > target) return 'LOST';
  };
  const gameStatusValue = gameStatus();

  return (  
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) =>
          <RandomNumber
            key={index}
            id={index}
            number={randomNumber}
            isDisabled={isNumberSelected(index)}
            onPress={selectNumber} />
        )}
      </View>
      <Text>{gameStatusValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff407d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  target: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    backgroundColor: '#1b3c73',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  randomContainer: {
    marginTop: 50,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
});

export default Game;