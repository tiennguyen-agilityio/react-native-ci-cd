import {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {FieldErrors, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';

// Interfaces
import {OrderScreenProps, SCREENS} from '@/interfaces';

// Constants
import {SCHEMA} from '@/constants';

// Themes
import {fontSizes, metrics} from '@/themes';

// Hooks | Stores
import {useFocusInput, useScreenTrace} from '@/hooks';
import {useAuthStore, useCartStore, useThemeStore} from '@/stores';

// Components
import {Button, Checkbox, ControllerInput, Flex, MainLayout, Text} from '@/components';
import {ShippingMethod} from './components';

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

const ShippingAddressScreen = ({navigation}: OrderScreenProps<typeof SCREENS.SHIPPING_ADDRESS>) => {
  useScreenTrace(SCREENS.SHIPPING_ADDRESS);
  const insets = useSafeAreaInsets();
  const clearCart = useCartStore(state => state.clearCart);
  const user = useAuthStore(state => state.user);
  const text = useThemeStore(state => state.theme.text);

  const [errorMessage, setErrorMessage] = useState('');

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

  const defaultValues = useMemo(
    () => ({
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
    }),
    [city, country, firstName, lastName, phoneNumber, state, street, zipCode],
  );

  const {fieldRefs, onFocus} = useFocusInput(
    Object.keys(defaultValues) as (keyof typeof defaultValues)[],
  );

  const {control, getValues, setValue, watch, reset, handleSubmit} = useForm<FormData>({
    defaultValues,
    mode: 'onBlur',
  });

  const isCopyAddress = watch('isCopyAddress');

  const handleToggleCheckbox = useCallback(() => {
    const newValue = !getValues('isCopyAddress');
    setValue('isCopyAddress', newValue);
  }, [getValues, setValue]);

  const handleClearErrorMessage = useCallback(() => setErrorMessage(''), []);

  const handleChangeShippingMethod = useCallback((value: number) => setValue('fee', value), []);

  const handleErrorForm = useCallback(
    (errors: FieldErrors<FormData>) => {
      const getFieldsError = Object.keys(errors) as (keyof typeof defaultValues)[];

      const firstFieldError = getFieldsError.filter(
        key => key !== 'fee' && key !== 'isCopyAddress',
      )[0];
      if (getFieldsError?.length && firstFieldError) {
        fieldRefs[firstFieldError].current.focus();
      }
    },
    [fieldRefs],
  );

  const onSubmit = useCallback(
    (data: FormData) => {
      Toast.show({
        type: 'success',
        text1: 'Order successfully',
        topOffset: insets.top + (isAndroid ? 10 : 0),
      });
      clearCart();
      navigation.navigate(SCREENS.ORDER_COMPLETED);
    },
    [navigation, clearCart],
  );

  useEffect(() => {
    if (user) {
      reset(defaultValues);
    }
  }, [user]);

  return (
    <MainLayout>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={20}
        extraKeyboardSpace={30}>
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
            <ControllerInput<FormData>
              name="firstName"
              nextField="lastName"
              placeholder="First Name"
              control={control}
              rules={SCHEMA.firstName}
              inputRef={fieldRefs.firstName}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
            <ControllerInput<FormData>
              name="lastName"
              nextField="country"
              placeholder="Last Name"
              control={control}
              rules={SCHEMA.lastName}
              inputRef={fieldRefs.lastName}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
            <ControllerInput<FormData>
              name="country"
              nextField="street"
              placeholder="Country"
              control={control}
              rules={SCHEMA.country}
              inputRef={fieldRefs.country}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
            <ControllerInput<FormData>
              name="street"
              nextField="city"
              placeholder="Street name"
              control={control}
              rules={SCHEMA.street}
              inputRef={fieldRefs.street}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
            <ControllerInput<FormData>
              name="city"
              nextField="state"
              placeholder="City"
              control={control}
              rules={SCHEMA.city}
              inputRef={fieldRefs.city}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
            <ControllerInput<FormData>
              name="state"
              nextField="zipCode"
              placeholder="State / Province"
              control={control}
              rules={SCHEMA.state}
              inputRef={fieldRefs.state}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
            <ControllerInput<FormData>
              name="zipCode"
              nextField="phoneNumber"
              placeholder="Zip-code"
              keyboardType="numeric"
              control={control}
              rules={SCHEMA.zipCode}
              inputRef={fieldRefs.zipCode}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
            <ControllerInput<FormData>
              name="phoneNumber"
              placeholder="Phone Number"
              keyboardType="numeric"
              control={control}
              rules={SCHEMA.phoneNumber}
              inputRef={fieldRefs.phoneNumber}
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />
          </Flex>
          <Flex marginTop={50} paddingTop={25} paddingHorizontal={12}>
            <ShippingMethod defaultValue={0} onChange={handleChangeShippingMethod} />
          </Flex>
          <Flex marginTop={20} paddingTop={25} paddingHorizontal={12} gap={20}>
            <Text variant="subTitle">Billing Address</Text>
            <Checkbox
              selected={isCopyAddress}
              label="Copy address data from shipping"
              onValueChange={handleToggleCheckbox}
            />
          </Flex>
          {errorMessage && <Text color={text.error}>{errorMessage}</Text>}
          <Button
            disabled={!user}
            text="Continue to payment"
            onPress={handleSubmit(onSubmit, handleErrorForm)}
          />
        </Flex>
      </KeyboardAwareScrollView>
    </MainLayout>
  );
};

export default ShippingAddressScreen;
