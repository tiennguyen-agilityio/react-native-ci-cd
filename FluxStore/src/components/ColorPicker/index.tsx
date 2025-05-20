import {memo, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useThemeStore} from '@/hooks';

import Text from '../Text';
import Flex from '../Flex';
import Dot from '../Dot';

const DOT_SIZE = 34;

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    marginBottom: 8,
    color: '#717B8F',
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
});

interface ColorPickerProps {
  label?: string;
  colors: string[];
  size?: number;
  onValueChange?: (value: string) => void;
  defaultIndex?: number;
}

const ColorPicker = ({
  label = 'Color',
  colors,
  defaultIndex = 0,
  size = DOT_SIZE,
  onValueChange,
}: ColorPickerProps) => {
  const {
    theme: {text},
  } = useThemeStore();
  const [value, setValue] = useState(defaultIndex);

  const handleSelect = (index: number) => {
    setValue(index);
    onValueChange?.(colors[index]);
  };

  return (
    <Flex>
      {label && <Text style={[styles.heading, {color: text.tertiary}]}>{label}</Text>}
      <Flex style={styles.row}>
        {colors.map((color, index) => (
          <Dot
            key={color}
            color={color}
            size={size}
            hasBorder={value === index}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(ColorPicker);
