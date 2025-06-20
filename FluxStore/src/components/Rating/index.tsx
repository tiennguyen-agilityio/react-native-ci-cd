import {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import {StarIcon} from '../Icons';

interface RatingProps {
  value?: number;
  size?: number;
  count?: number;
}

const Rating = ({value = 0, size, count = 5}: RatingProps) => {
  return (
    <View style={styles.wrapper}>
      {[...Array(count).keys()].map(item => (
        <StarIcon key={item} width={size} height={size} isActive={item < value} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    columnGap: 5,
  },
});

export default memo(Rating);
