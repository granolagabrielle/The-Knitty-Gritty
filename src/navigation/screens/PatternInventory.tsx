import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectPatternItems } from '../../redux/patternSlice';
import InventoryItem from '../../components/InventoryItem';
import { fetchPatterns } from '../../redux/patternActions';

export function PatternInventory() {
  const dispatch = useAppDispatch();
  const patternItems = useSelector(selectPatternItems);

  useEffect(() => {
    dispatch(fetchPatterns());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {patternItems.map((item) => (
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
