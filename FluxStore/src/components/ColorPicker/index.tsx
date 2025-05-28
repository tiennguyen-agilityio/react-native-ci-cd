import {memo, useState} from 'react';

// Hooks
import {useThemeStore} from '@/hooks';

// Components
import Text from '../Text';
import Flex from '../Flex';
import Dot from '../Dot';

const DOT_SIZE = 34;
interface ColorPickerProps {
  colors: string[];
  size?: number;
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

const ColorPicker = ({
  colors,
  defaultValue = '',
  size = DOT_SIZE,
  onValueChange,
}: ColorPickerProps) => {
  const {
    theme: {text},
  } = useThemeStore();
  const [value, setValue] = useState<string>(defaultValue);

  return (
    <Flex>
      <Text style={{color: text.tertiary}}>Color</Text>
      <Flex marginTop={10} direction="row" gap={8}>
        {colors.map((color, index) => {
          const isSelected = value.includes(color);
          const handleToggleSelect = () => {
            if (color !== value) {
              setValue(color);
              onValueChange(color);
            }
          };

          return (
            <Dot
              key={index}
              color={color}
              size={size}
              hasBorder={isSelected}
              onSelect={handleToggleSelect}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default memo(ColorPicker);
