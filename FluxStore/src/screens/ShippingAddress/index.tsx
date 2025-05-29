import {RefObject, useCallback, useRef} from 'react';
import {TextInput} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

// Interfaces
import {AppStackScreenProps, SCREENS} from '@/interfaces';

// Themes
import {fontSizes, metrics} from '@/themes';

// Components
import {Button, Checkbox, Flex, Input, MainLayout, Text} from '@/components';
import {ShippingMethod} from './components';

type ShippingAddressProps = AppStackScreenProps<typeof SCREENS.SHIPPING_ADDRESS>;

const ShippingAddressScreen = ({navigation}: ShippingAddressProps) => {
  const insets = useSafeAreaInsets();

  const lastNameRef = useRef<TextInput>();
  const countryRef = useRef<TextInput>();
  const streetRef = useRef<TextInput>();
  const cityRef = useRef<TextInput>();
  const stateRef = useRef<TextInput>();
  const zipCodeRef = useRef<TextInput>();
  const phoneNumberRef = useRef<TextInput>();

  const handleChangeInput = (value: string, field?: string) => {
    console.log('value', value, field);
  };

  const handleFocusNextField = (input: RefObject<TextInput>) => {
    input.current.focus();
  };

  const handleToggleCheckbox = useCallback(() => {
    console.log('--handleToggleCheckbox');
  }, []);

  const handleSubmit = useCallback(() => {
    navigation.navigate(SCREENS.ORDER_COMPLETED);
  }, [navigation]);

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
            <Input
              isRequired
              placeholder="First Name"
              nextField={lastNameRef}
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              isRequired
              ref={lastNameRef}
              placeholder="Last Name"
              nextField={countryRef}
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              isRequired
              ref={countryRef}
              placeholder="Country"
              nextField={streetRef}
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              isRequired
              ref={streetRef}
              placeholder="Street name"
              nextField={cityRef}
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              isRequired
              ref={cityRef}
              placeholder="City"
              nextField={stateRef}
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              ref={stateRef}
              placeholder="State / Province"
              nextField={zipCodeRef}
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              isRequired
              ref={zipCodeRef}
              placeholder="Zip-code"
              nextField={phoneNumberRef}
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              isRequired
              ref={phoneNumberRef}
              placeholder="Phone Number"
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
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
          <Button text="Continue to payment" onPress={handleSubmit} />
        </Flex>
      </KeyboardAwareScrollView>
    </MainLayout>
  );
};

export default ShippingAddressScreen;
