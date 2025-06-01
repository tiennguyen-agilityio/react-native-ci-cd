import {ReactNode} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// Components
import {ChevronIcon, Divider, Flex, Text} from '@/components';

// Themes
import {DIRECTION} from '@/interfaces';

const styles = StyleSheet.create({
  wrapper: {},
});

interface ProfileItemProps {
  icon: ReactNode;
  title: string;
  onPress: () => void;
}

const ProfileItem = ({icon, title, onPress}: ProfileItemProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Flex paddingVertical={25} direction="row" align="center">
        {icon}
        <Flex marginLeft={10}>
          <Text>{title}</Text>
        </Flex>
        <Flex marginRight={0} marginLeft="auto">
          <ChevronIcon direction={DIRECTION.RIGHT} disabled />
        </Flex>
      </Flex>
      <Divider />
    </TouchableOpacity>
  );
};

export default ProfileItem;
