import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import PropTypes from 'prop-types';

function RandomNumber({ number }) {

    const propTypes = {
        number: PropTypes.number.isRequired
    };

    const handlePress = () => {
        Alert.alert(String(number));
        console.log(number);
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.random}>{number}</Text>
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
  }
})

export default RandomNumber;