import {RefObject, useCallback, useRef} from 'react';
import {TextInput} from 'react-native';
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
import {useCartStore} from '@/stores';

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
};

const ShippingAddressScreen = ({navigation}: ShippingAddressProps) => {
  useScreenTrace(SCREENS.SHIPPING_ADDRESS);
  const insets = useSafeAreaInsets();
  const clearCart = useCartStore(state => state.clearCart);

  const lastNameRef = useRef<TextInput>(null);
  const countryRef = useRef<TextInput>(null);
  const streetRef = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const zipCodeRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);

  const {control, handleSubmit} = useForm<FormData>();

  const handleFocusNextField = (input: RefObject<TextInput | null>) => {
    input.current?.focus();
  };

  const handleToggleCheckbox = useCallback(() => {}, []);

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
          paddingBottom={insets.bottom}>
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
                  value={value}
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
                  value={value}
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
                  value={value}
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
                  value={value}
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
                  value={value}
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
                  value={value}
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
                  value={value}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />
          </Flex>
          <Flex marginTop={50} paddingTop={25} paddingHorizontal={12}>
            <ShippingMethod />
          </Flex>
          <Flex marginTop={20} paddingTop={25} paddingHorizontal={12} gap={20}>
            <Text variant="subTitle">Billing Address</Text>
            <Checkbox
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
