import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, HeaderTitle } from '@react-navigation/elements';
import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { YarnInventory } from './screens/YarnInventory';
import { ProjectsInventory } from './screens/ProjectsInventory';
import { PatternInventory } from './screens/PatternInventory';
import { Form } from './screens/Form';
import { Text } from 'react-native';

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Yarn: {
      screen: YarnInventory,
      options: {
        title: 'Yarn',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Patterns: {
      screen: PatternInventory,
      options: {
        title: 'Patterns',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Projects: {
      screen: ProjectsInventory,
      options: {
        title: 'Projects',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
  screenOptions: {
    tabBarActiveTintColor: '#4E6151',
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    Form: {
      screen: Form,
      options: (props: any) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={props.navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
        headerTitle: props.route.params?.title,
      }),
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

export type RootStackParamList = {
  Form: { title: string; columnNames: string[]; type: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
