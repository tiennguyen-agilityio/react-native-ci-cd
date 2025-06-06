import {memo} from 'react';

// Stores
import {useThemeStore} from '@/stores';

// Themes
import {fontSizes} from '@/themes';

// Components
import {Flex, StarIcon, Text} from '@/components';

interface RatingPercentageProps {
  number: number;
  percentage: number;
  progressColor?: string;
}

const RatingPercentage = ({number, percentage, progressColor}: RatingPercentageProps) => {
  const {
    theme: {border, text},
  } = useThemeStore();

  return (
    <Flex width="100%" direction="row" align="center">
      <Flex direction="row" width={27} justify="between" align="center">
        <Text fontSize={fontSizes.tiny}>{number}</Text>
        <StarIcon isActive width={13} height={13} />
      </Flex>
      <Flex
        flex={1}
        marginLeft={10}
        marginRight={14}
        backgroundColor={border.quaternary}
        overflow="hidden"
        height={4}
        borderRadius={2}>
        <Flex
          width={`${percentage}%`}
          height={4}
          borderRadius={2}
          backgroundColor={progressColor ?? text.link}
        />
      </Flex>
      <Flex width={32} justify="end">
        <Text textAlign="right" fontSize={fontSizes.tiny}>{`${percentage} %`}</Text>
      </Flex>
    </Flex>
  );
};

export default memo(RatingPercentage);
