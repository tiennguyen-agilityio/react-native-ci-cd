import {ReactNode, memo, useMemo} from 'react';
import {
  ColorValue,
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native';

// Themes
import {fontSizes, fontWeights, letterSpacings} from '@/themes';
import {useThemeStore} from '@/hooks';

type TextVariant = 'heading' | 'title' | 'subTitle' | 'description' | 'default';

const textBasicStyle: TextStyle = {
  textAlign: 'left',
  textAlignVertical: 'center',
  letterSpacing: letterSpacings.base,
};

export interface TextProps extends RNTextProps {
  children: string | ReactNode;
  variant?: TextVariant;
  fontSize?: number | string;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
}

const Text = ({children, variant = 'default', fontSize, color, style, ...props}: TextProps) => {
  const {theme} = useThemeStore();

  const {fonts, text} = theme;

  const textVariant = useMemo(
    () =>
      StyleSheet.create({
        heading: {
          fontFamily: fonts?.primary?.bold || fonts.default.bold,
          color: text.default,
          fontWeight: fontWeights.bold,
          fontSize: fontSizes.lg,
        },

        title: {
          fontFamily: fonts?.secondary?.medium || fonts.default.medium,
          fontSize: fontSizes.md,
          color: text.default,
          fontWeight: fontWeights.bold,
        },

        subTitle: {
          fontFamily: fonts?.tertiary?.regular || fonts.default.regular,
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.bold,
          color: text.default,
        },

        description: {
          fontFamily: fonts?.primary?.regular,
          color: text.primary,
          fontSize: fontSizes.tiny,
        },

        default: {
          fontFamily: fonts?.primary?.regular,
          fontSize: fontSizes.xs,
          color: text.quaternary,
        },
      }),
    [fonts, text],
  );

  return (
    <RNText
      style={[
        textBasicStyle,
        textVariant[variant],
        {
          ...(color && {color}),
          ...(fontSize && {fontSize}),
        } as TextStyle,
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};

export default memo(Text);
