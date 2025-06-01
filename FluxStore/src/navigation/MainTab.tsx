import {ReactNode, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Interfaces
import {SCREENS, TabBarIcon} from '@/interfaces';

// Stores
import {useThemeStore} from '@/stores';

// Screens || Stack
import {HomeScreen, ProfileScreen, SearchScreen} from '@/screens';
import CartStack from './CartStackNavigator';

// Components
import {CartIcon, HomeIcon, SearchIcon, UserIcon} from '@/components';

// Themes

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    paddingTop: 12,
    justifyContent: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    zIndex: 3,
    borderTopWidth: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
});

const Tab = createBottomTabNavigator();

const renderTabBarIcon =
  (screen: string) =>
  ({focused}: TabBarIcon): ReactNode => {
    switch (screen) {
      case SCREENS.HOME:
        return <HomeIcon isActive={focused} disabled />;

      case SCREENS.SEARCH:
        return <SearchIcon disabled isActive={focused} />;

      case SCREENS.CART_STACK:
      case SCREENS.CART:
      case SCREENS.SHIPPING_ADDRESS:
        return <CartIcon isActive={focused} disabled />;

      case SCREENS.PROFILE:
        return <UserIcon isActive={focused} disabled />;
      default:
        return null;
    }
  };

const MainTab = () => {
  const {
    theme: {background, text},
  } = useThemeStore();

  const tabBarStyle = useMemo(
    () => ({
      borderColor: background.default,
      backgroundColor: background.default,
      shadowColor: text.primary,
    }),
    [background, text],
  );

  return (
    <Tab.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: renderTabBarIcon(route.name),
        tabBarStyle: {
          ...styles.tabBarStyle,
          ...tabBarStyle,
        },
      })}>
      <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
      <Tab.Screen
        name={SCREENS.CART_STACK}
        component={CartStack}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTab;
