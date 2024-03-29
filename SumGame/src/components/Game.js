import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber.js';

function Game({ randomNumberCount }) {

  const propTypes = {
    randomNumberCount: PropTypes.number.isRequired
  };

  randomNumbers = Array
    .from({ length: randomNumberCount })
    .map(() => 1 + Math.floor(10 * Math.random()));
  target = randomNumbers
    .slice(0, randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.target}>{target}</Text>
      <View style={styles.randomContainer}>
        {randomNumbers.map((randomNumber, index) =>
          <RandomNumber key={index} number={randomNumber} />
        )}
      </View>
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