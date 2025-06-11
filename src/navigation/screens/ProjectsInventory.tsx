import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectProjectColumnNames, selectProjectItems } from '../../redux/projectSlice';
import { fetchProjectColumnNames, fetchProjects } from '../../redux/projectActions';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../components/CustomButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import InventoryItem from '../../components/Swipable';

export function ProjectsInventory() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  const projectItems = useSelector(selectProjectItems);
  const projectColumnNames = useSelector(selectProjectColumnNames);

  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProjectInventory'>;

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchProjectColumnNames());
  }, [dispatch]);

  const onPress = () => {
    navigation.navigate('Form', {
      title: 'Add Project',
      columnNames: projectColumnNames,
      type: 'project',
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          <View>
            {projectItems.map((item) => (
              <InventoryItem item={item} key={item.id} />
            ))}
          </View>
          <CustomButton title={'Add Project'} onPress={onPress} />
        </ScrollView>
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
  },
});
