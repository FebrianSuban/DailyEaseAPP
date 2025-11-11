import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { Habit } from '@/types/database';
import { useTheme } from '@/hooks/useTheme';

interface HabitCardProps {
  habit: Habit;
  isCompletedToday: boolean;
  weekProgress: boolean[];
  onToggleToday: () => void;
  onDelete: () => void;
}

export function HabitCard({
  habit,
  isCompletedToday,
  weekProgress,
  onToggleToday,
  onDelete,
}: HabitCardProps) {
  const { colors } = useTheme();

  const completedDays = weekProgress.filter(Boolean).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <View
            style={[styles.iconContainer, { backgroundColor: habit.color }]}
          >
            <Text style={styles.iconText}>{habit.name[0].toUpperCase()}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              {habit.name}
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {completedDays}/{habit.target_days} days this week
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Trash2 size={20} color={colors.error} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekContainer}>
        {weekProgress.map((completed, index) => (
          <View
            key={index}
            style={[
              styles.dayDot,
              {
                backgroundColor: completed
                  ? habit.color
                  : colors.border,
              },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.checkButton,
          {
            backgroundColor: isCompletedToday ? habit.color : colors.border,
          },
        ]}
        onPress={onToggleToday}
      >
        <Check size={20} color="#fff" />
        <Text style={styles.checkButtonText}>
          {isCompletedToday ? 'Completed Today' : 'Mark as Done'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
  },
  deleteButton: {
    padding: 8,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
