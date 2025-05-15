import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectPatternColumnNames, selectPatternItems } from '../../redux/patternSlice';
import InventoryItem from '../../components/InventoryItem';
import { fetchPatternColumnNames, fetchPatterns } from '../../redux/patternActions';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function PatternInventory() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const patternItems = useSelector(selectPatternItems);
  const patternColumnNames = useSelector(selectPatternColumnNames);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PatternInventory'>;

  useEffect(() => {
    dispatch(fetchPatterns());
    dispatch(fetchPatternColumnNames());
  }, [dispatch]);

  const onPress = () => {
    navigation.navigate('Form', {
      title: 'Add Pattern',
      columnNames: patternColumnNames,
      type: 'pattern',
    });
  };

  return (
    <>
      <View style={styles.container}>
        {patternItems.map((item) => (
          <InventoryItem item={item} key={item.id} />
        ))}
      </View>
      <CustomButton title={'Add Pattern'} onPress={onPress} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
});
