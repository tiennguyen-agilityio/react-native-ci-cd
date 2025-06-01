import {useCallback, useMemo} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

// Stores
import {useAuthStore, useThemeStore} from '@/stores';

// Themes
import {borderRadius, metrics} from '@/themes';

// Components
import {
  MainLayout,
  Text,
  Flex,
  SettingIcon,
  AddressIcon,
  WalletIcon,
  VoucherIcon,
  HeartIcon,
  StarSecondaryIcon,
  LogoutIcon,
} from '@/components';
import {ProfileItem, ThemeSwitch} from './components';

const ProfileScreen = () => {
  const {
    theme: {border, text, background},
  } = useThemeStore();
  const [user, setIsAuthenticated] = useAuthStore(state => [state.user, state.setIsAuthenticated]);
  const {name, email, avatar} = user || {};

  const styles = useMemo(
    () =>
      StyleSheet.create({
        content: {
          marginHorizontal: 24,
          marginTop: 58,
          paddingTop: 4,
          paddingLeft: 14,
          paddingRight: 20,
          paddingBottom: 6,
          borderColor: border.default,
          borderRadius: borderRadius.md,
          backgroundColor: background.default,
          borderWidth: 1,
          shadowColor: text.primary,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 3,
        },
        image: {
          borderRadius: 68,
          overflow: 'hidden',
        },
      }),
    [border, background, text],
  );

  const handleSetting = useCallback(() => {}, []);

  const handleGoToAddress = useCallback(() => {}, []);

  const handleGoToPaymentMethod = useCallback(() => {}, []);

  const handleGoToVoucher = useCallback(() => {}, []);

  const handleGoToWishlist = useCallback(() => {}, []);

  const handleGoToRating = useCallback(() => {}, []);

  const handleGoToLogout = useCallback(async () => {
    await useAuthStore.persist.clearStorage();
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return (
    <MainLayout>
      <ScrollView>
        <Flex flex={1} justify="between">
          <Flex
            marginTop={50}
            direction="row"
            align="center"
            paddingHorizontal={metrics.dimensions.xxl}>
            <Image style={styles.image} source={{uri: avatar}} width={68} height={68} />
            <Flex marginLeft={20} gap={6}>
              <Text variant="subTitle">{name}</Text>
              <Text>{email}</Text>
            </Flex>
            <Flex marginLeft="auto" marginRight={0}>
              <SettingIcon onPress={handleSetting} />
            </Flex>
          </Flex>
          <Flex style={styles.content}>
            <ProfileItem title="Address" icon={<AddressIcon />} onPress={handleGoToAddress} />
            <ProfileItem
              title="Payment Method"
              icon={<WalletIcon />}
              onPress={handleGoToPaymentMethod}
            />
            <ProfileItem title="Voucher" icon={<VoucherIcon />} onPress={handleGoToVoucher} />
            <ProfileItem title="My Wishlist" icon={<HeartIcon />} onPress={handleGoToWishlist} />
            <ProfileItem
              title="Rate this app"
              icon={<StarSecondaryIcon />}
              onPress={handleGoToRating}
            />
            <ProfileItem title="Log out" icon={<LogoutIcon />} onPress={handleGoToLogout} />
          </Flex>
          <Flex marginBottom={0} marginTop={20} paddingHorizontal={metrics.dimensions.xxl}>
            <ThemeSwitch />
          </Flex>
        </Flex>
      </ScrollView>
    </MainLayout>
  );
};

export default ProfileScreen;
