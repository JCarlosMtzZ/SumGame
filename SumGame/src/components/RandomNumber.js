import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';

function RandomNumber({ id, number, isDisabled, onPress }) {

    const propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired
    };

    const handlePress = () => {
      if (isDisabled) {return};
      onPress(id);
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={[styles.random, isDisabled && styles.disabled]}>{number}</Text>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#fff',
    borderColor: '#1b3c73',
    borderWidth: 2,
    borderRadius: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 20,
    width: 120,
    height: 60,
    fontSize: 30
  },
  disabled: {
    opacity: 0.4
  }
})

export default RandomNumber;