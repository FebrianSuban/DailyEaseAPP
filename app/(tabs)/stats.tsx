import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTaskStore } from '@/store/useTaskStore';
import { useHabitStore } from '@/store/useHabitStore';
import { useTheme } from '@/hooks/useTheme';
import { CheckCircle, TrendingUp, Target } from 'lucide-react-native';

export default function StatsScreen() {
  const { colors } = useTheme();
  const { tasks, fetchTasks } = useTaskStore();
  const { habits, habitLogs, fetchHabits, fetchHabitLogs } = useHabitStore();

  useEffect(() => {
    fetchTasks();
    fetchHabits();
    fetchHabitLogs();
  }, []);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const getWeekHabitStats = () => {
    const today = new Date();
    const weekLogs = habitLogs.filter((log) => {
      const logDate = new Date(log.completed_date);
      const diffTime = today.getTime() - logDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });

    return weekLogs.length;
  };

  const weekHabitCompletions = getWeekHabitStats();

  const getHabitStreak = () => {
    if (habitLogs.length === 0) return 0;

    const sortedLogs = [...habitLogs].sort(
      (a, b) =>
        new Date(b.completed_date).getTime() -
        new Date(a.completed_date).getTime()
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const uniqueDates = [
      ...new Set(sortedLogs.map((log) => log.completed_date)),
    ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    for (const dateStr of uniqueDates) {
      const logDate = new Date(dateStr);
      logDate.setHours(0, 0, 0, 0);

      const diffTime = currentDate.getTime() - logDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0 || diffDays === 1) {
        streak++;
        currentDate = logDate;
      } else {
        break;
      }
    }

    return streak;
  };

  const currentStreak = getHabitStreak();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Statistik</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Ikhtisar produktivitas Anda
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <CheckCircle size={24} color={colors.primary} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Tingkat Penyelesaian Tugas
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {completionRate.toFixed(0)}%
            </Text>
            <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
              {completedTasks} dari {totalTasks} tugas selesai
            </Text>
          </View>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.success + '20' },
            ]}
          >
            <TrendingUp size={24} color={colors.success} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Kebiasaan Minggu Ini
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {weekHabitCompletions}
            </Text>
            <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
              penyelesaian kebiasaan dalam 7 hari terakhir
            </Text>
          </View>
        </View>

        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.warning + '20' },
            ]}
          >
            <Target size={24} color={colors.warning} />
          </View>
          <View style={styles.statContent}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Seri Saat Ini
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {currentStreak} {currentStreak === 1 ? 'hari' : 'hari'}
            </Text>
            <Text style={[styles.statSubtext, { color: colors.textSecondary }]}>
              Teruskan kerja besar Anda!
            </Text>
          </View>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.summaryTitle, { color: colors.text }]}>
            Ringkasan
          </Text>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              Total Tugas
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {totalTasks}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              Kebiasaan Aktif
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {habits.length}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
              Total Log Kebiasaan
            </Text>
            <Text style={[styles.summaryValue, { color: colors.text }]}>
              {habitLogs.length}
            </Text>
          </View>
        </View>
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
  statCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statSubtext: {
    fontSize: 13,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 16,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
  },
});
