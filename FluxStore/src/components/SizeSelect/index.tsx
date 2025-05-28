import {memo, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// Hooks
import {useThemeStore} from '@/hooks';

// Components
import Flex from '../Flex';
import Text from '../Text';

const styles = StyleSheet.create({
  text: {
    textTransform: 'capitalize',
  },
});

interface SizeSelectProps {
  sizes: string[];
  defaultValue?: string;
  onValueChange: (size: string) => void;
}

const SizeSelect = ({sizes, defaultValue = '', onValueChange}: SizeSelectProps) => {
  const {
    theme: {text, background},
  } = useThemeStore();
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <Flex>
      <Text style={{color: text.tertiary}}>Size</Text>
      <Flex marginTop={10} direction="row" gap={8}>
        {sizes.map(size => {
          const isSelected = value === size;
          const handleToggleSelect = () => {
            if (size !== value) {
              setValue(size);
              onValueChange(size);
            }
          };

          return (
            <TouchableOpacity
              key={size}
              disabled={isSelected}
              onPress={handleToggleSelect}
              style={styles.item}>
              <Flex
                justify="center"
                align="center"
                width={33}
                height={33}
                borderRadius={33}
                backgroundColor={isSelected ? background.primary : background.senary}>
                <Text style={[styles.text, {color: isSelected ? text.light : text.tertiary}]}>
                  {size}
                </Text>
              </Flex>
            </TouchableOpacity>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default memo(SizeSelect);
