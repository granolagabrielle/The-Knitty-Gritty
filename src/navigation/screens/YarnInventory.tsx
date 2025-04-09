import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectYarnColumnNames, selectYarnItems } from '../../redux/yarnSlice';
import { fetchYarn, fetchYarnColumnNames } from '../../redux/yarnActions';
import InventoryItem from '../../components/InventoryItem';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function YarnInventory() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const yarnItems = useSelector(selectYarnItems);
  const yarnColumnNames = useSelector(selectYarnColumnNames);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'YarnInventory'>;

  useEffect(() => {
    dispatch(fetchYarn());
    dispatch(fetchYarnColumnNames());
  }, [dispatch]);

  const onPress = () => {
    navigation.navigate('Form', {
      title: 'Add Yarn',
      columnNames: yarnColumnNames,
    });
  };

  return (
    <>
      <View style={styles.container}>
        {yarnItems.map((item) => (
          <InventoryItem item={item} />
        ))}
      </View>
      <CustomButton title={'Add Yarn'} onPress={onPress} />
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
