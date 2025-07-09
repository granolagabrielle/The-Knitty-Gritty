import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';

Asset.loadAsync([...NavigationAssets, require('./assets/newspaper.png'), require('./assets/bell.png')]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigation
          linking={{
            enabled: 'auto',
            prefixes: ['helloworld://'],
          }}
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  }
});
