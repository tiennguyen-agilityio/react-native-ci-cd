import {memo} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import isEqual from 'react-fast-compare';

// Interfaces
import {Category} from '@/interfaces';

// Stores
import {useThemeStore} from '@/stores';

// Components
import {Flex, Text} from '@/components';
import {fontSizes} from '@/themes';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  boxIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    padding: 2,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: fontSizes.mini,
  },
});

interface CategoriesProps {
  list: Category[];
  keyActivated?: string;
  onChange: (item: Category) => void;
}

const Categories = ({list = [], keyActivated = list[0].key, onChange}: CategoriesProps) => {
  const {theme} = useThemeStore();

  return (
    <Flex direction="row" justify="between">
      {list.map(item => {
        const {key, label, Icon} = item;
        const isActive = key === keyActivated;
        const backgroundColor = isActive ? theme.background.primary : theme.background.senary;
        const borderColor = isActive ? theme.text.secondary : theme.transparent;

        return (
          <TouchableOpacity
            key={key}
            activeOpacity={0.8}
            onPress={() => onChange(item)}
            style={styles.wrapper}>
            <Flex style={[styles.boxIcon, {borderColor}]}>
              <Icon isActive={isActive} style={[styles.icon, {backgroundColor}]} disabled />
            </Flex>
            <Text color={isActive ? theme.text.default : theme.text.tertiary} style={styles.label}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Flex>
  );
};

export default memo(Categories, isEqual);
