import 'react-native-gesture-handler';
import React, {useContext, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, ThemeContext} from 'styled-components/native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from './types/navigation';
import {iOSDarkTheme} from './styles';
import TopHeadlines from './views/TopHeadlines';
import HeadlineDetails from './views/HeadlineDetails';
import Settings from './views/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'EventEmitter',
]);
const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <Stack.Navigator initialRouteName="TopHeadlines">
      <Stack.Screen
        name="TopHeadlines"
        component={TopHeadlines}
        options={{headerTransparent: true, title: ''}}
      />
      <Stack.Screen
        name="HeadlineDetails"
        component={HeadlineDetails}
        options={{
          headerBackTitleStyle: {color: themeContext.highlight},
          headerTintColor: themeContext.highlight,
          headerTransparent: true,
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};
const TabNavigator: React.FC = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontWeight: '700',
          fontSize: 15,
        },
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen name="News" component={StackNavigator} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  const [theme] = useState(iOSDarkTheme);

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <TabNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
