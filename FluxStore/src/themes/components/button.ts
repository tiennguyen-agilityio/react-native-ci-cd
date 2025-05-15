import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {fontFamilies, fontSizes, fontWeights} from '../typography';
import {colors} from '../colors';

export const buttonSize = StyleSheet.create({
  sm: {
    height: 48,
  },

  md: {
    height: 51,
  },

  lg: {
    height: 53,
  },
});

export const buttonTextSize = StyleSheet.create({
  sm: {
    fontSize: fontSizes.sm,
  },

  md: {
    fontSize: fontSizes.sm,
  },

  lg: {
    fontSize: fontSizes.base,
  },
});

export const buttonVariants = StyleSheet.create({
  solid: {
    backgroundColor: colors.black[500],
  },

  outlined: {
    backgroundColor: colors.gray[500],
    borderWidth: 1,
    borderColor: colors.white[500],
  },

  ghost: {
    backgroundColor: colors.transparent,
  },
});

export const buttonTextVariants = StyleSheet.create({
  solid: {
    color: colors.white[500],
  },

  outlined: {
    color: colors.white[500],
  },

  ghost: {
    color: colors.green[200],
    fontWeight: fontWeights.regular,
  },
});

export const buttonBasicStyles: ViewStyle = {
  borderRadius: 25,
  justifyContent: 'center',
};

export const buttonTextBasicStyles: TextStyle = {
  textAlign: 'center',
  borderRadius: 25,
  fontFamily: fontFamilies.productSans.bold,
  fontWeight: fontWeights.bold,
};
