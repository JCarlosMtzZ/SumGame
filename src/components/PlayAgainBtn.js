import { StyleSheet, Text, TouchableOpacity } from "react-native";

function PlayAgainBtn({ result, onPress }) {

  const handlePress = () => {
    if (result === 'WON') onPress(true);
    else if (result === 'LOST') onPress(false);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {result === 'WON' && <Text style={styles.playAgainBtn}>Continue</Text>}
      {result === 'LOST' && <Text style={styles.playAgainBtn}>Play Again</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playAgainBtn: {
    marginTop: 35,
    width: 160,
    height: 65,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#fff',
    color: '#fff',
    backgroundColor: '#1b3c73',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25
  }
});

export default PlayAgainBtn;