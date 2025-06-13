import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { useAppDispatch } from '../../redux/store';
import { addYarn } from '../../redux/yarnActions';
import { addPattern } from '../../redux/patternActions';
import { addProjects } from '../../redux/projectActions';

type RootStackParamList = {
  Form: { columnNames: string[]; type: 'yarn' };
};

type FormRouteProp = RouteProp<RootStackParamList, 'Form'>;

export function Form() {
  const route = useRoute<FormRouteProp>();
  const { columnNames, type } = route.params;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onPress = () => {
    if (type === 'yarn') {
      dispatch(addYarn(formData));
      navigation.goBack();
    } else if (type === 'pattern') {
      dispatch(addPattern(formData));
      navigation.goBack();
    } else if (type === 'project') {
      dispatch(addProjects(formData));
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      {columnNames.slice(1).map((name, i) => (
        <TextInput
          placeholder={name}
          style={styles.input}
          key={i}
          value={formData[name] || ''}
          onChangeText={(text) => handleInputChange(name, text)}
        />
      ))}
      <CustomButton title='Submit' onPress={onPress}></CustomButton>
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
