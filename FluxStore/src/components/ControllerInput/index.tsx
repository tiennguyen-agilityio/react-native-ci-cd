import {memo, RefObject, useCallback} from 'react';
import {KeyboardTypeOptions, ReturnKeyTypeOptions, TextInput} from 'react-native';
import {Controller, FieldValues, UseControllerProps} from 'react-hook-form';

// Components
import Input from '../Input';

interface ControllerInputProps<T extends FieldValues> extends UseControllerProps<T> {
  inputRef?: RefObject<TextInput | null>;
  nextField?: keyof T;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  placeholder?: string;
  onFocusNextInput?: (field: keyof T) => void;
  clearError?: () => void;
}

const ControllerInput = <T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  inputRef,
  nextField,
  placeholder,
  returnKeyType = 'next',
  keyboardType = 'default',
  onFocusNextInput,
  clearError,
  ...inputProps
}: ControllerInputProps<T>) => {
  const handleSubmitEditing = useCallback(() => {
    nextField && onFocusNextInput?.(nextField);
  }, [nextField, onFocusNextInput]);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({field: {onChange, value, ...props}, fieldState: {error}}) => {
        const handleChange = (text: string) => {
          clearError?.();
          onChange(text);
        };

        return (
          <Input
            {...props}
            {...inputProps}
            isRequired={Boolean(rules?.required)}
            field={name}
            ref={inputRef}
            defaultValue={value}
            placeholder={placeholder}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            errorMessage={error?.message}
            onChangeText={handleChange}
            onSubmit={handleSubmitEditing}
          />
        );
      }}
    />
  );
};

export default memo(ControllerInput) as typeof ControllerInput;
