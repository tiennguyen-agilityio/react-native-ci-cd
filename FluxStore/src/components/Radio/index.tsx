import {memo, useMemo} from 'react';
import {View, TouchableOpacity, ViewStyle} from 'react-native';
import {useThemeStore} from '@/hooks';

interface RadioProps {
  selected: boolean;
  size?: number;
  borderWidth?: number;
  onPress: () => void;
}

const Radio = ({selected, onPress, size = 23, borderWidth = 7}: RadioProps) => {
  const {theme} = useThemeStore();

  const radioStyles: ViewStyle = useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      borderColor: selected ? theme.background.radio : theme.border.quaternary,
      borderWidth: selected ? borderWidth : 1,
    }),
    [selected, size, theme.background.radio, theme.border, borderWidth],
  );

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={radioStyles} />
    </TouchableOpacity>
  );
};

export default memo(Radio);
