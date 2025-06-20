import {ReactNode, memo} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

import {FlexOptions} from '@/interfaces';

const flexDirection = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  'row-reverse': {
    flexDirection: 'row-reverse',
  },
  'column-reverse': {
    flexDirection: 'column-reverse',
  },
});

const flexJustify = StyleSheet.create({
  start: {
    justifyContent: 'flex-start',
  },
  end: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
  between: {
    justifyContent: 'space-between',
  },
  around: {
    justifyContent: 'space-around',
  },
  evenly: {
    justifyContent: 'space-evenly',
  },
});

const flexAlign = StyleSheet.create({
  start: {
    alignItems: 'flex-start',
  },
  end: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
  stretch: {
    alignItems: 'stretch',
  },
  baseline: {
    alignItems: 'baseline',
  },
});

const flexWrap = StyleSheet.create({
  wrap: {
    flexWrap: 'wrap',
  },
  nowrap: {
    flexWrap: 'nowrap',
  },
  'wrap-reverse': {
    flexWrap: 'wrap-reverse',
  },
});

interface FlexProps extends FlexOptions {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Flex = ({
  direction = 'column',
  justify = 'start',
  align = 'stretch',
  wrap = 'nowrap',
  children,
  style,
  ...props
}: FlexProps) => {
  return (
    <View
      testID="flex"
      style={[
        flexDirection[direction],
        flexJustify[justify],
        flexAlign[align],
        flexWrap[wrap],
        style,
        props,
      ]}>
      {children}
    </View>
  );
};

export default memo(Flex);
