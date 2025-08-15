import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

interface Reminder {
  id: string;
  title: string;
  time: string;
  enabled: boolean;
  icon: string;
  color: string;
  isCustom?: boolean;
}

export default function RemindersScreen() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Initialize and update reminders when language changes
  useEffect(() => {
    const defaultReminders: Reminder[] = [
      {
        id: 'morning',
        title: t('morningPotty'),
        time: '8:00 AM',
        enabled: true,
        icon: 'sunrise.fill',
        color: '#FF9500',
      },
      {
        id: 'mid-morning',
        title: t('midMorning'),
        time: '10:30 AM',
        enabled: true,
        icon: 'clock.fill',
        color: '#34C759',
      },
      {
        id: 'after-lunch',
        title: t('afterLunch'),
        time: '1:00 PM',
        enabled: true,
        icon: 'fork.knife',
        color: '#FF6B6B',
      },
      {
        id: 'afternoon',
        title: t('afternoon'),
        time: '3:30 PM',
        enabled: true,
        icon: 'sun.max.fill',
        color: '#FFD700',
      },
      {
        id: 'before-dinner',
        title: t('beforeDinner'),
        time: '6:00 PM',
        enabled: true,
        icon: 'moon.fill',
        color: '#4ECDC4',
      },
      {
        id: 'bedtime',
        title: t('bedtimePotty'),
        time: '8:00 PM',
        enabled: true,
        icon: 'bed.double.fill',
        color: '#9B59B6',
      },
    ];
    
    setReminders(prev => {
      // Preserve custom reminders and update default ones
      const customReminders = prev.filter(r => r.isCustom);
      return [...defaultReminders, ...customReminders];
    });
  }, [t]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(8);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('AM');
  const [selectedIcon, setSelectedIcon] = useState('clock.fill');

  const handleToggleEnabled = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const handleAddReminder = () => {
    if (newReminderTitle.trim() === '') {
      Alert.alert('Error', 'Please enter a reminder title');
      return;
    }

    const timeString = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;

    // Random icon selection
    const randomIcons = ['clock.fill', 'sunrise.fill', 'sun.max.fill', 'moon.fill', 'bed.double.fill', 'fork.knife', 'heart.fill', 'star.fill', 'bell.fill', 'alarm.fill', 'timer', 'stopwatch.fill', 'calendar', 'calendar.badge.plus', 'clock.arrow.circlepath', 'house.fill', 'person.fill', 'gamecontroller.fill', 'book.fill'];
    const randomIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];

    const newReminder: Reminder = {
      id: `custom-${Date.now()}`,
      title: newReminderTitle.trim(),
      time: timeString,
      enabled: true,
      icon: randomIcon,
      color: '#007AFF',
      isCustom: true,
    };

    setReminders(prev => [...prev, newReminder]);
    setNewReminderTitle('');
    setSelectedHour(8);
    setSelectedMinute(0);
    setSelectedPeriod('AM');
    setShowAddModal(false);
  };

  const handleDeleteReminder = (id: string) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setReminders(prev => prev.filter(reminder => reminder.id !== id));
          },
        },
      ]
    );
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const sortRemindersByTime = (reminders: Reminder[]) => {
    return reminders.sort((a, b) => {
      // Convert 12-hour format to 24-hour for proper sorting
      const convertTo24Hour = (timeStr: string) => {
        const [time, period] = timeStr.split(' ');
        const [hour, minute] = time.split(':').map(Number);
        let hour24 = hour;
        
        if (period === 'PM' && hour !== 12) {
          hour24 = hour + 12;
        } else if (period === 'AM' && hour === 12) {
          hour24 = 0;
        }
        
        return hour24 * 60 + minute; // Convert to minutes for easier comparison
      };
      
      const timeA = convertTo24Hour(a.time);
      const timeB = convertTo24Hour(b.time);
      return timeA - timeB;
    });
  };

  const sortedReminders = sortRemindersByTime(reminders);
  const enabledCount = reminders.filter(r => r.enabled).length;
  const totalCount = reminders.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
              {t('todaysSchedule')}
            </Text>
            <TouchableOpacity 
              style={styles.addButtonHeader}
              onPress={() => setShowAddModal(true)}
            >
              <IconSymbol name="plus.circle.fill" size={28} color={Colors[colorScheme ?? 'light'].tint} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Progress Overview */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCard}>
            <Text style={styles.progressEmoji}>🔔</Text>
            <Text style={[styles.progressNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
              {enabledCount}/{totalCount}
            </Text>
            <Text style={[styles.progressLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Active Reminders
            </Text>
          </View>
          
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(enabledCount / totalCount) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Reminders List */}
        <View style={styles.remindersSection}>
          
          {sortedReminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderItem}>
              <View style={styles.reminderLeft}>
                <View style={[styles.reminderIcon, { backgroundColor: reminder.color + '20' }]}>
                  <IconSymbol name={reminder.icon as any} size={20} color={reminder.color} />
                </View>
                <View style={styles.reminderInfo}>
                  <Text style={[styles.reminderTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {reminder.title}
                  </Text>
                  <Text style={[styles.reminderTime, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {reminder.time}
                  </Text>
                </View>
              </View>
              
              <View style={styles.reminderRight}>
                <Switch
                  value={reminder.enabled}
                  onValueChange={() => handleToggleEnabled(reminder.id)}
                  trackColor={{ false: '#E0E0E0', true: reminder.color }}
                  thumbColor={reminder.enabled ? '#FFFFFF' : '#FFFFFF'}
                />
                {reminder.isCustom && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteReminder(reminder.id)}
                  >
                    <IconSymbol name="trash.fill" size={16} color="#FF3B30" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

     
      </ScrollView>



      {/* Add Reminder Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowAddModal(false);
          setNewReminderTitle('');
          setSelectedHour(8);
          setSelectedMinute(0);
          setSelectedPeriod('AM');
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Reminder</Text>
            
            <TextInput
              style={styles.inputField}
              placeholder="Reminder name..."
              value={newReminderTitle}
              onChangeText={setNewReminderTitle}
              placeholderTextColor="#999"
            />
            
            <View style={styles.timeSelector}>
              <Text style={styles.timeSelectorLabel}>Time:</Text>
              <View style={styles.wheelPickerContainer}>
                <View style={styles.wheelPicker}>
                  <View style={styles.wheelColumn}>
                    <Text style={styles.wheelLabel}>Hour</Text>
                    <View style={styles.wheelScrollContainer}>
                      <ScrollView 
                        showsVerticalScrollIndicator={false}
                        style={styles.wheelScroll}
                        contentContainerStyle={styles.wheelContent}
                      >
                        {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                          <TouchableOpacity
                            key={hour}
                            style={styles.wheelItem}
                            onPress={() => setSelectedHour(hour)}
                          >
                            <Text style={[
                              styles.wheelItemText,
                              selectedHour === hour && styles.wheelItemTextSelected
                            ]}>
                              {hour}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                  
                  <View style={styles.wheelColumn}>
                    <Text style={styles.wheelLabel}>Minute</Text>
                    <View style={styles.wheelScrollContainer}>
                      <ScrollView 
                        showsVerticalScrollIndicator={false}
                        style={styles.wheelScroll}
                        contentContainerStyle={styles.wheelContent}
                      >
                        {Array.from({length: 60}, (_, i) => i).map(minute => (
                          <TouchableOpacity
                            key={minute}
                            style={styles.wheelItem}
                            onPress={() => setSelectedMinute(minute)}
                          >
                            <Text style={[
                              styles.wheelItemText,
                              selectedMinute === minute && styles.wheelItemTextSelected
                            ]}>
                              {minute.toString().padStart(2, '0')}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                  
                  <View style={styles.wheelColumn}>
                    <Text style={styles.wheelLabel}>Period</Text>
                    <View style={styles.wheelScrollContainer}>
                      <ScrollView 
                        showsVerticalScrollIndicator={false}
                        style={styles.wheelScroll}
                        contentContainerStyle={styles.wheelContent}
                      >
                        {['AM', 'PM'].map(period => (
                          <TouchableOpacity
                            key={period}
                            style={styles.wheelItem}
                            onPress={() => setSelectedPeriod(period)}
                          >
                            <Text style={[
                              styles.wheelItemText,
                              selectedPeriod === period && styles.wheelItemTextSelected
                            ]}>
                              {period}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View style={styles.wheelHighlight} />
              </View>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowAddModal(false);
                  setNewReminderTitle('');
                  setSelectedHour(8);
                  setSelectedMinute(0);
                  setSelectedPeriod('AM');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.addButton]}
                onPress={handleAddReminder}
              >
                <Text style={styles.addButtonText}>Add Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
            </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  progressContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressCard: {
    alignItems: 'center',
    marginBottom: 15,
  },
  progressEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  progressNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  remindersSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButtonHeader: {
    padding: 5,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  reminderTime: {
    fontSize: 14,
    opacity: 0.6,
  },
  reminderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: width * 0.85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  timeSelector: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    backgroundColor: '#F8F8F8',
  },
  timeSelectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  wheelPickerContainer: {
    position: 'relative',
    height: 200,
  },
  wheelPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '100%',
  },
  wheelColumn: {
    flex: 1,
    alignItems: 'center',
  },
  wheelLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  wheelScrollContainer: {
    height: 150,
    overflow: 'hidden',
  },
  wheelScroll: {
    flex: 1,
  },
  wheelContent: {
    paddingVertical: 60,
  },
  wheelItem: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelItemText: {
    fontSize: 16,
    color: '#999',
  },
  wheelItemTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  wheelHighlight: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 6,
    marginTop: -15,
    zIndex: -1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  addButton: {
    backgroundColor: '#34C759',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  iconSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
  },
  iconSelectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  iconSelectorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSelectorText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  iconPickerContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: width * 0.9,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconGrid: {
    maxHeight: 300,
  },
  iconGridContent: {
    paddingVertical: 10,
  },
  iconGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  iconGridItem: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  iconGridItemSelected: {
    backgroundColor: '#007AFF',
  },
  cancelIconButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  cancelIconButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  encouragementCard: {
    backgroundColor: '#E8F5E8',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  starEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  encouragementText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  encouragementSubtext: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },


});
