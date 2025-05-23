import {Dimensions} from 'react-native';

import {Metrics} from '@/interfaces';

const {width, height} = Dimensions.get('window');

export const borderRadius = {
  xs: 8,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
  circle: '50%',
};

export const metrics: Metrics = {
  screenWidth: width,
  screenHeight: height,
  dimensions: {
    xs: 8,
    sm: 10,
    md: 15,
    lg: 20,
    xl: 25,
    xxl: 32,
  },
};
