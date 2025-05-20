import {memo, useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';

import {useThemeStore} from '@/hooks';
import {fontSizes, fontWeights, metrics} from '@/themes';

import Flex from '../Flex';
import Text from '../Text';
import Rating from '../Rating';
import {getShortTimeAgo} from '@/utils';

interface ReviewCardProps {
  avatarUrl: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
}

const ReviewCard = ({avatarUrl, name, rating, comment, createdAt}: ReviewCardProps) => {
  const {
    theme: {text, fonts},
  } = useThemeStore();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        image: {
          width: 36,
          height: 36,
          borderRadius: 18,
          overflow: 'hidden',
        },
        name: {
          fontSize: fontSizes.xxs,
          fontWeight: fontWeights.bold,
          fontFamily: fonts.primary.bold,
        },
        time: {
          fontSize: fontSizes.micro,
          fontWeight: fontWeights.medium,
          fontFamily: fonts.secondary.medium,
          color: text.septenary,
        },
        comment: {
          fontSize: fontSizes.micro,
          color: text.default,
        },
      }),
    [text, fonts],
  );

  const timeAgo = useMemo(() => getShortTimeAgo(createdAt), [createdAt]);

  return (
    <Flex gap={metrics.dimensions.lg}>
      <Flex direction="row" gap={12} align="center">
        <Image source={{uri: avatarUrl}} resizeMode="cover" style={styles.image} />
        <Flex gap={8}>
          <Text style={styles.name}>{name}</Text>
          <Rating value={rating} size={10} />
        </Flex>
        <Flex marginLeft="auto" marginRight={0}>
          <Text style={styles.time}>{timeAgo}</Text>
        </Flex>
      </Flex>
      <Text style={styles.comment}>{comment}</Text>
    </Flex>
  );
};

export default memo(ReviewCard);
