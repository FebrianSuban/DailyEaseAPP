import { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Smartphone, LogOut, User } from 'lucide-react-native';

export default function SettingsScreen() {
  const { colors, theme } = useTheme();
  const { user, signOut } = useAuthStore();
  const { settings, fetchSettings, updateSettings } = useSettingsStore();

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'auto') => {
    await updateSettings({ theme: newTheme });
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth/sign-in');
  };

  const themeOptions = [
    { value: 'light' as const, label: 'Terang', icon: Sun },
    { value: 'dark' as const, label: 'Gelap', icon: Moon },
    { value: 'auto' as const, label: 'Otomatis', icon: Smartphone },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Pengaturan</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sesuaikan pengalaman Anda
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <View style={styles.sectionHeader}>
            <User size={20} color={colors.text} />
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Akun
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Nama Pengguna
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {settings?.username || 'Pengguna'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Email
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.email || 'Tidak diatur'}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Penampilan
          </Text>
          <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
            Pilih tema pilihan Anda
          </Text>

          <View style={styles.themeContainer}>
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.themeButton,
                  {
                    backgroundColor:
                      settings?.theme === value ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => handleThemeChange(value)}
              >
                <Icon
                  size={24}
                  color={settings?.theme === value ? '#fff' : colors.text}
                />
                <Text
                  style={[
                    styles.themeButtonText,
                    {
                      color: settings?.theme === value ? '#fff' : colors.text,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tentang DailyEase
          </Text>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            Versi 1.0.0
          </Text>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            Aplikasi produktivitas yang sederhana dan elegan untuk membantu Anda mengelola tugas harian dan membangun kebiasaan yang lebih baik.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.signOutButton, { backgroundColor: colors.error }]}
          onPress={handleSignOut}
        >
          <LogOut size={20} color="#fff" />
          <Text style={styles.signOutButtonText}>Keluar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  themeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
