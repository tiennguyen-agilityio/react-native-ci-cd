import {ReactNode, useCallback, useMemo} from 'react';
import {Platform, StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {BottomTabBarButtonProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Interfaces
import {SCREENS, TabBarIcon, TabsStackParamList} from '@/interfaces';

// Stores
import {useThemeStore} from '@/stores';

// Screens || Stack
import {HomeScreen, SearchScreen} from '@/screens';
import ProfileStack from './ProfileStack';
import OrderStack from './OrderStack';

// Components
import {ShoppingCartIcon, HomeIcon, SearchIcon, UserIcon} from '@/components';

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  tabBarStyle: {
    height: isAndroid ? 65 : 80,
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
    elevation: 6,
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

      case SCREENS.ORDER_STACK:
        return <ShoppingCartIcon isActive={focused} disabled />;

      case SCREENS.PROFILE_STACK:
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
    (props: BottomTabBarButtonProps) => (
      <TouchableOpacity activeOpacity={1} {...(props as TouchableOpacityProps)} />
    ),
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
      <Tabs.Screen name={SCREENS.ORDER_STACK} component={OrderStack} />
      <Tabs.Screen name={SCREENS.PROFILE_STACK} component={ProfileStack} />
    </Tabs.Navigator>
  );
};

export default TabsStack;
