import {memo} from 'react';

// Stores
import {useThemeStore} from '@/stores';

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

  return (
    <Flex>
      <Text style={{color: text.tertiary}}>Color</Text>
      <Flex marginTop={10} direction="row" gap={8}>
        {colors.map((color, index) => {
          const isSelected = defaultValue === color;
          const handleToggleSelect = () => {
            if (color !== defaultValue) {
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
