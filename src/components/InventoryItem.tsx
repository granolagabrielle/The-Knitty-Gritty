import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export default function InventoryItem({ item }) {
  return (
    <View style={styles.card}>
      <Text key={item.id}>{item.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '90%',
  },
});
