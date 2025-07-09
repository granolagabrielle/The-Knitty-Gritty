import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectYarnColumnNames, selectYarnItems } from '../../redux/yarnSlice';
import { fetchYarn, fetchYarnColumnNames } from '../../redux/yarnActions';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Swipeable from '../../components/Swipable';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Form'>;

export function YarnInventory() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const yarnItems = useSelector(selectYarnItems);
  const yarnColumnNames = useSelector(selectYarnColumnNames);

  useEffect(() => {
    dispatch(fetchYarn());
    dispatch(fetchYarnColumnNames());
  }, [dispatch]);

  const onPress = () => {
    navigation.navigate('Form', {
      title: 'Add Yarn',
      columnNames: yarnColumnNames,
      type: 'yarn',
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          <View>
            {yarnItems.map((item) => (
              <Swipeable item={item} key={item.id} />
            ))}
          </View>
        </ScrollView>
        <CustomButton title={'Add Yarn'} onPress={onPress} />
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
