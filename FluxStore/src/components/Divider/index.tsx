import {memo, useMemo} from 'react';
import {ColorValue, DimensionValue, View, ViewStyle} from 'react-native';

// Stores
import {useThemeStore} from '@/stores';

export interface DividerProps {
  width?: DimensionValue;
  height?: DimensionValue;
  color?: ColorValue;
}

const Divider = ({width = '100%', height = 1, color}: DividerProps) => {
  const {
    theme: {background},
  } = useThemeStore();

  const dividerStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: color || background.quinary,
      height,
      width,
    }),
    [background.quinary, color, height, width],
  );

  return <View style={dividerStyle} />;
};

export default memo(Divider);
