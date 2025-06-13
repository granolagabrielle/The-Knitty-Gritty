// import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function InventoryItem({ item }) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={require('../assets/yarn.png')} />
      <View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.secondaryText}>color and dye lot</Text>
          <Text style={styles.secondaryText}># grams in stash</Text>
          <Text style={styles.secondaryText}>possibly more text here</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
    marginBottom: 2,
  },
  secondaryText: {
    fontSize: 14,
    color: 'grey',
  },
  image: {
    width: 50,
    height: 75,
    borderRadius: 4,
    marginRight: 14,
  },
});
