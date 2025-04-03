import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectYarnItems } from '../../redux/yarnSlice';
import { fetchYarn } from '../../redux/yarnActions';
import InventoryItem from '../../components/InventoryItem';

export function ProjectsInventory() {
  const dispatch = useAppDispatch();
  const yarnItems = useSelector(selectYarnItems);

  useEffect(() => {
    dispatch(fetchYarn());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {yarnItems.map((item) => (
        <InventoryItem item={item} />
      ))}
    </View>
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
