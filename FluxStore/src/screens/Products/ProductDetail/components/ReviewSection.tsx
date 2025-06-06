import {memo} from 'react';

// Interfaces
import {Review} from '@/interfaces';

// Themes
import {fontSizes, metrics} from '@/themes';

// Components
import {Collapse, Flex, Rating, ReviewCard, Text, PencilIcon} from '@/components';
import RatingPerCentage from './RatingPercentage';

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
}

const ReviewSection = ({reviews, rating}: ReviewSectionProps) => {
  const reviewLength = reviews?.length || 0;

  return (
    <Collapse label="Review">
      <Flex width="100%" direction="row" justify="between" align="center">
        <Flex direction="row" align="center" gap={10}>
          <Text variant="title" fontSize={fontSizes['3xl']}>
            {rating}
          </Text>
          <Text variant="description" fontSize={fontSizes.micro}>
            OUT OF 5
          </Text>
        </Flex>
        <Flex justify="end" gap={8}>
          <Rating size={19} value={Math.ceil(rating)} />
          <Text fontSize={fontSizes.mini} textAlign="right">
            83 Rating
          </Text>
        </Flex>
      </Flex>
      <Flex width="100%" gap={16} marginTop={15} marginBottom={20}>
        <RatingPerCentage number={5} percentage={80} />
        <RatingPerCentage number={4} percentage={12} />
        <RatingPerCentage number={3} percentage={5} />
        <RatingPerCentage number={2} percentage={3} />
        <RatingPerCentage number={1} percentage={0} />
      </Flex>
      <Flex width="100%" direction="row" justify="between" align="center">
        <Text fontSize={fontSizes.micro}>{reviews.length} Reviews</Text>
        <Flex direction="row">
          <Text fontSize={fontSizes.micro}>WRITE A REVIEW</Text>
          <PencilIcon />
        </Flex>
      </Flex>
      {!!reviewLength && (
        <Flex width="100%" marginTop={metrics.dimensions.xxl} gap={metrics.dimensions.xl}>
          {reviews.map(item => (
            <ReviewCard key={item.id} {...item} />
          ))}
        </Flex>
      )}
    </Collapse>
  );
};

export default memo(ReviewSection);
