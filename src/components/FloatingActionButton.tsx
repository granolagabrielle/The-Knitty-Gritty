// import React, { useState } from 'react';
// import { StyleSheet, View, Pressable, Text } from 'react-native';
// import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

// const ACTIONS = [
//   { label: 'Add Yarn', key: 'yarn', icon: 'Y' },
//   { label: 'Add Pattern', key: 'pattern', icon: 'P' },
//   { label: 'Start Project', key: 'project', icon: 'S' },
// ];

// const FAB_SIZE = 56;
// const FAB_EXPANDED_WIDTH = 140;

// export default function FloatingActionButton() {
//   const [expanded, setExpanded] = useState(false);

//   const handlePress = () => {
//     setExpanded((prev) => !prev);
//   };

//   const fabAnimatedStyle = useAnimatedStyle(() => ({
//     width: withSpring(expanded ? FAB_EXPANDED_WIDTH : FAB_SIZE, { damping: 15 }),
//     borderRadius: withSpring(expanded ? 28 : FAB_SIZE / 2, { damping: 15 }),
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   return (
//     <View pointerEvents='box-none' style={styles.container}>
//       {ACTIONS.map((action, idx) => {
//         const animatedStyle = useAnimatedStyle(() => ({
//           opacity: withTiming(expanded ? 1 : 0),
//           transform: [
//             {
//               translateY: withSpring(expanded ? -((idx + 1) * 70) : 0, { damping: 10 }),
//             },
//             { scale: withTiming(expanded ? 1 : 0.8) },
//           ],
//         }));
//         return (
//           <Animated.View key={action.key} style={[styles.action, animatedStyle, { right: 0, bottom: 0 }]}>
//             <View style={styles.actionContent}>
//               <Text style={styles.actionLabel}>{action.label}</Text>
//               <View style={{ width: 16 }} />
//               <Pressable style={styles.actionButton}>
//                 <Text style={styles.actionIcon}>{action.icon}</Text>
//               </Pressable>
//             </View>
//           </Animated.View>
//         );
//       })}
//       <Animated.View style={[fabAnimatedStyle]}>
//         <Pressable onPress={handlePress} style={styles.fabButton}>
//           <Text style={styles.fabIcon}>+</Text>
//         </Pressable>
//       </Animated.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     bottom: 100,
//     right: 20,
//     alignItems: 'flex-end',
//   },

//   fabButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     height: FAB_SIZE,
//     borderRadius: FAB_SIZE / 2,
//     backgroundColor: '#b58df1',
//   },
//   fabIcon: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   fabLabel: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//     marginLeft: 8,
//   },
//   action: {
//     position: 'absolute',
//     flexDirection: 'row',
//     alignItems: 'center',
//     right: 0,
//     bottom: 0,
//   },
//   actionContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionLabel: {
//     color: '#333',
//     fontSize: 16,
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     marginRight: 0,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     shadowOffset: { width: 0, height: 1 },
//     minWidth: 90,
//     textAlign: 'right',
//   },
//   actionButton: {
//     backgroundColor: '#fff',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     shadowOffset: { width: 0, height: 1 },
//   },
//   actionIcon: {
//     color: '#b58df1',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });
