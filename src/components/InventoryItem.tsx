// import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Image, Text } from 'react-native';

export default function InventoryItem({ item, type }) {
  let inventoryContent;

  switch (type) {
    case 'yarn':
      inventoryContent = (
        <View>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.secondaryText}>{item.brand}</Text>
          <Text style={styles.secondaryText}>{item.weight} weight</Text>
          <Text style={styles.secondaryText}>{item.total_grams} grams in stash</Text>
        </View>
      );
      break;
    case 'pattern':
      inventoryContent = (
        <View>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.secondaryText}>{item.pattern_designer}</Text>
          <Text style={styles.secondaryText}>{item.yarn_weight} weight needed</Text>
        </View>
      );
      break;
    case 'project':
      inventoryContent = (
        <View>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.secondaryText}>Started on {item.date_started}</Text>
          <Text style={styles.secondaryText}>Percentage done here</Text>
          <Text style={styles.secondaryText}>possibly more text here</Text>
        </View>
      );
      break;
  }

  return (
    <View style={styles.card}>
      <Image style={styles.image} source={require('../assets/yarn.png')} />
      <View>{inventoryContent}</View>
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
