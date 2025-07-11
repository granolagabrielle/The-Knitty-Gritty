import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectPatternColumnNames, selectPatternItems } from '../../redux/patternSlice';
import { fetchPatternColumnNames, fetchPatterns } from '../../redux/patternActions';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InventoryItem from '../../components/Swipable';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Form'>;

export function PatternInventory() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const patternItems = useSelector(selectPatternItems);
  const patternColumnNames = useSelector(selectPatternColumnNames);

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          <View>
            {patternItems.map((item) => (
              <InventoryItem item={item} key={item.id} type={'pattern'} />
            ))}
          </View>
        </ScrollView>
        <CustomButton title={'Add Pattern'} onPress={onPress} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#D2DAD2',
  },
});
