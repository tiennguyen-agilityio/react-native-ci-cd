import {RefObject, useCallback, useRef} from 'react';
import {Platform, TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useForm, Controller} from 'react-hook-form';
import Toast from 'react-native-toast-message';

// Interfaces
import {AppStackScreenProps, SCREENS} from '@/interfaces';

// Themes
import {fontSizes, metrics} from '@/themes';

// Hooks | Stores
import {useScreenTrace} from '@/hooks';
import {useAuthStore, useCartStore} from '@/stores';

// Components
import {Button, Checkbox, Flex, Input, MainLayout, Text} from '@/components';
import {ShippingMethod} from './components';

type ShippingAddressProps = AppStackScreenProps<typeof SCREENS.SHIPPING_ADDRESS>;

type FormData = {
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  city: string;
  state?: string;
  zipCode: string;
  phoneNumber: string;
  fee?: number;
  isCopyAddress: boolean;
};

const isAndroid = Platform.OS === 'android';

const ShippingAddressScreen = ({navigation}: ShippingAddressProps) => {
  useScreenTrace(SCREENS.SHIPPING_ADDRESS);
  const insets = useSafeAreaInsets();
  const clearCart = useCartStore(state => state.clearCart);
  const user = useAuthStore(state => state.user);

  const {
    firstName = '',
    lastName = '',
    country = '',
    street = '',
    city = '',
    state = '',
    zipCode = '',
    phoneNumber = '',
  } = user || {};

  const lastNameRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);

  const {control, formState, getValues, setValue, handleSubmit} = useForm<FormData>({
    defaultValues: {
      firstName,
      lastName,
      country,
      street,
      city,
      state,
      zipCode: zipCode.toString(),
      phoneNumber,
      fee: 0,
      isCopyAddress: false,
    },
  });

  const handleFocusNextField = (input: RefObject<TextInput | null>) => {
    input.current?.focus();
  };

  const handleToggleCheckbox = useCallback(() => {
    setValue('isCopyAddress', !getValues('isCopyAddress'));
  }, [getValues, setValue]);

  const onSubmit = useCallback(
    (data: FormData) => {
      Toast.show({
        type: 'success',
        text1: 'Order successfully',
      });
      clearCart();
      navigation.navigate(SCREENS.ORDER_COMPLETED);
    },
    [navigation, clearCart],
  );

  return (
    <MainLayout>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Flex
          flex={1}
          marginTop={22}
          paddingHorizontal={metrics.dimensions.lg}
          paddingBottom={insets.bottom + (isAndroid ? 30 : 0)}>
          <Text variant="description" fontSize={fontSizes.micro}>
            STEP 1
          </Text>
          <Text variant="heading" fontSize={fontSizes.xl}>
            Shipping
          </Text>
          <Flex marginTop={42} gap={20}>
            <Controller
              control={control}
              name="firstName"
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  isRequired
                  placeholder="First Name"
                  nextField={lastNameRef}
                  defaultValue={value}
                  value={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              rules={{required: true}}
              render={({field: {onChange, value, ...props}}) => (
                <Input
                  {...props}
                  isRequired
                  ref={lastNameRef}
                  placeholder="Last Name"
                  nextField={countryRef}
                  defaultValue={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
            <Controller
              control={control}
              name="country"
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  isRequired
                  ref={countryRef}
                  placeholder="Country"
                  nextField={streetRef}
                  defaultValue={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
            <Controller
              control={control}
              name="street"
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  isRequired
                  ref={streetRef}
                  placeholder="Street name"
                  nextField={cityRef}
                  defaultValue={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
            <Controller
              control={control}
              name="city"
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  isRequired
                  ref={cityRef}
                  placeholder="City"
                  nextField={stateRef}
                  defaultValue={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
            <Controller
              control={control}
              name="state"
              render={({field: {onChange, value}}) => (
                <Input
                  ref={stateRef}
                  placeholder="State / Province"
                  nextField={zipCodeRef}
                  defaultValue={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
            <Controller
              control={control}
              name="zipCode"
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  isRequired
                  ref={zipCodeRef}
                  placeholder="Zip-code"
                  nextField={phoneNumberRef}
                  defaultValue={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <Input
                  isRequired
                  ref={phoneNumberRef}
                  placeholder="Phone Number"
                  defaultValue={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
          </Flex>
          <Flex marginTop={50} paddingTop={25} paddingHorizontal={12}>
            <ShippingMethod defaultValue={0} onChange={(value: number) => setValue('fee', value)} />
          </Flex>
          <Flex marginTop={20} paddingTop={25} paddingHorizontal={12} gap={20}>
            <Text variant="subTitle">Billing Address</Text>
            <Checkbox
              selected={getValues('isCopyAddress')}
              label="Copy address data from shipping"
              onValueChange={handleToggleCheckbox}
            />
          </Flex>
          <Button text="Continue to payment" onPress={handleSubmit(onSubmit)} />
        </Flex>
      </KeyboardAwareScrollView>
    </MainLayout>
  );
};

export default ShippingAddressScreen;
