import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Form: { columnNames: string[] };
};

type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

export function Form() {
  const route = useRoute<FormRouteProp>();
  const { columnNames } = route.params;
  return (
    <View style={styles.container}>
      {columnNames.map((name, i) => (
        <TextInput placeholder={name} style={styles.input} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});
