import {memo} from 'react';
import Text from '../Text';
import Flex from '../Flex';
import {DimensionValue, Image, StyleSheet} from 'react-native';
import {borderRadius, colors, fontSizes} from '@/themes';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    position: 'relative',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

interface BannerCardProps {
  imageUrl: string;
  title: string;
  width?: DimensionValue;
  height?: DimensionValue;
}

const BannerCard = ({imageUrl, title, width = 312, height = 168}: BannerCardProps) => {
  return (
    <Flex direction="row" width={width} height={height} style={styles.wrapper}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <Flex position="absolute" width="40%" top={20} right={8}>
        <Text variant="heading" fontSize={fontSizes.md} color={colors.white[500]}>
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(BannerCard);
