import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Interfaces
import {SCREENS} from '@/interfaces';

// Screens || Stack
import {HomeScreen} from '@/screens';

const Tab = createBottomTabNavigator();

const MainTab = () => (
  <Tab.Navigator
    initialRouteName={SCREENS.HOME}
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
    }}>
    <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
  </Tab.Navigator>
);

export default MainTab;
