import { useColorMode, Switch } from '@chakra-ui/react';

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
    <Switch
      position='fixed'
      top={1}
      right={1}
      color='green'
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
