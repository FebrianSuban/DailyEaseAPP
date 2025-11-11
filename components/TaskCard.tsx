import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { Task } from '@/types/database';
import { useTheme } from '@/hooks/useTheme';

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  const { colors } = useTheme();

  const priorityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          {
            borderColor: task.completed ? colors.primary : colors.border,
            backgroundColor: task.completed ? colors.primary : 'transparent',
          },
        ]}
        onPress={onToggle}
      >
        {task.completed && <Check size={16} color="#fff" />}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: colors.text },
            task.completed && styles.completedText,
          ]}
        >
          {task.title}
        </Text>
        <View style={styles.footer}>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: priorityColors[task.priority] + '20' },
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                { color: priorityColors[task.priority] },
              ]}
            >
              {task.priority}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Trash2 size={20} color={colors.error} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});
