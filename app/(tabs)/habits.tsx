import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHabitStore } from '@/store/useHabitStore';
import { HabitCard } from '@/components/HabitCard';
import { AddButton } from '@/components/AddButton';
import { useTheme } from '@/hooks/useTheme';
import { X } from 'lucide-react-native';

const HABIT_COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
];

export default function HabitsScreen() {
  const { colors } = useTheme();
  const {
    habits,
    habitLogs,
    fetchHabits,
    fetchHabitLogs,
    addHabit,
    deleteHabit,
    toggleHabitLog,
    isHabitCompletedOnDate,
  } = useHabitStore();

  const [modalVisible, setModalVisible] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [selectedColor, setSelectedColor] = useState(HABIT_COLORS[0]);

  useEffect(() => {
    fetchHabits();
    fetchHabitLogs();
  }, []);

  const handleAddHabit = async () => {
    if (!newHabitName.trim()) return;

    await addHabit(newHabitName.trim(), 'check', selectedColor, 7);
    setNewHabitName('');
    setSelectedColor(HABIT_COLORS[0]);
    setModalVisible(false);
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getWeekProgress = (habitId: string) => {
    const today = new Date();
    const progress: boolean[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      progress.push(isHabitCompletedOnDate(habitId, dateString));
    }

    return progress;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={['top']}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Kebiasaan Saya</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {habits.length} kebiasaan dilacak
        </Text>
      </View>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            habit={item}
            isCompletedToday={isHabitCompletedOnDate(item.id, getTodayDate())}
            weekProgress={getWeekProgress(item.id)}
            onToggleToday={() => toggleHabitLog(item.id, getTodayDate())}
            onDelete={() => deleteHabit(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              Belum ada kebiasaan. Ketuk + untuk mulai melacak kebiasaan baru!
            </Text>
          </View>
        }
      />

      <AddButton onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Kebiasaan Baru
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Nama kebiasaan (mis. Olahraga, Membaca)"
              placeholderTextColor={colors.textSecondary}
              value={newHabitName}
              onChangeText={setNewHabitName}
              autoFocus
            />

            <Text style={[styles.label, { color: colors.text }]}>Warna</Text>
            <View style={styles.colorContainer}>
              {HABIT_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    { backgroundColor: color },
                    selectedColor === color && styles.selectedColor,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={handleAddHabit}
            >
              <Text style={styles.addButtonText}>Tambah Kebiasaan</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  list: {
    padding: 20,
    paddingTop: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  colorButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  selectedColor: {
    borderWidth: 4,
    borderColor: '#fff',
  },
  addButton: {
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
