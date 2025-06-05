import {ReactNode, useCallback, useMemo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BottomTabBarButtonProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Interfaces
import {SCREENS, TabBarIcon, TabsStackParamList} from '@/interfaces';

// Stores
import {useThemeStore} from '@/stores';

// Screens || Stack
import {HomeScreen, SearchScreen} from '@/screens';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';

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

const Tabs = createBottomTabNavigator<TabsStackParamList>();

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

const TabsStack = () => {
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

  const renderTabBarButton = useCallback(
    (props: BottomTabBarButtonProps) => <TouchableOpacity activeOpacity={1} {...props} />,
    [],
  );

  return (
    <Tabs.Navigator
      initialRouteName={SCREENS.HOME}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: renderTabBarIcon(route.name),
        tabBarButton: renderTabBarButton,
        tabBarStyle: {
          ...styles.tabBarStyle,
          ...tabBarStyle,
        },
      })}>
      <Tabs.Screen name={SCREENS.HOME} component={HomeScreen} />
      <Tabs.Screen name={SCREENS.SEARCH} component={SearchScreen} />
      <Tabs.Screen
        name={SCREENS.CART_STACK}
        component={CartStack}
        options={{
          tabBarStyle: {display: 'none'},
        }}
      />
      <Tabs.Screen name={SCREENS.PROFILE_STACK} component={ProfileStack} />
    </Tabs.Navigator>
  );
};

export default TabsStack;
