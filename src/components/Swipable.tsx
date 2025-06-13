import React from 'react';
import { Text, StyleSheet, useWindowDimensions, View } from 'react-native';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import InventoryItem from './InventoryItem';
import Icon from 'react-native-vector-icons/Ionicons';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 50 }],
    };
  });

  const deleteItem = () => {
    console.log('request item delete:');
  };

  return (
    <Pressable onPress={deleteItem}>
      <Reanimated.View style={styleAnimation}>
        <View style={styles.rightAction}>
          <Icon name='trash' size={25} color='white' />
        </View>
      </Reanimated.View>
    </Pressable>
  );
}

export default function Swipeable({ item }) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const itemHeight = Math.min(Math.max(windowHeight * 0.12, 60), 120);
  const itemWidth = windowWidth - 32;
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        containerStyle={[styles.swipeable, { height: itemHeight, width: itemWidth }]}
        friction={2}
        overshootRight={false}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
      >
        <InventoryItem item={item} />
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  rightAction: {
    width: 50,
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeable: {
    alignItems: 'baseline',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
  },
});
