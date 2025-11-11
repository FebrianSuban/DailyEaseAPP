import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';
import { useSettingsStore } from '@/store/useSettingsStore';

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const settings = useSettingsStore((state) => state.settings);

  const effectiveTheme =
    settings?.theme === 'auto' || !settings?.theme
      ? systemColorScheme || 'light'
      : settings.theme;

  const colors = Colors[effectiveTheme];

  return {
    theme: effectiveTheme,
    colors,
    isDark: effectiveTheme === 'dark',
  };
}
