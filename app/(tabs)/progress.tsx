import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '@/contexts/LanguageContext';

const { width } = Dimensions.get('window');

interface DayProgress {
  day: string;
  smallPotty: number;
  bigPotty: number;
  success: boolean;
}

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const [selectedWeek, setSelectedWeek] = useState(0);

  // Mock data for progress
  const weeklyProgress: DayProgress[] = [
    { day: t('sun'), smallPotty: 2, bigPotty: 1, success: true },
    { day: t('mon'), smallPotty: 3, bigPotty: 0, success: true },
    { day: t('tue'), smallPotty: 1, bigPotty: 2, success: false },
    { day: t('wed'), smallPotty: 4, bigPotty: 1, success: true },
    { day: t('thu'), smallPotty: 2, bigPotty: 1, success: true },
    { day: t('fri'), smallPotty: 3, bigPotty: 0, success: false },
    { day: t('sat'), smallPotty: 1, bigPotty: 1, success: true },
  ];

  const totalSmallPotty = weeklyProgress.reduce((sum, day) => sum + day.smallPotty, 0);
  const totalBigPotty = weeklyProgress.reduce((sum, day) => sum + day.bigPotty, 0);
  const successDays = weeklyProgress.filter(day => day.success).length;

  const getProgressColor = (success: boolean) => {
    return success ? '#34C759' : '#FF9500';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('todaysProgress')}
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            You're doing great! 🌟
          </Text>
        </View>

        {/* Today's Stats */}
        <View style={styles.todayStats}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Text style={styles.emoji}>💧</Text>
            </View>
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
              {totalSmallPotty}
            </Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              {t('smallPottyLabel')}
            </Text>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statIcon}>
              <Text style={styles.emoji}>💩</Text>
            </View>
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
              {totalBigPotty}
            </Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              {t('bigPottyLabel')}
            </Text>
          </View>
        </View>

        {/* Weekly Progress */}
        <View style={styles.weeklySection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('thisWeek')}
          </Text>
          
          <View style={styles.weekGrid}>
            {weeklyProgress.map((day, index) => (
              <View key={index} style={styles.dayCard}>
                <Text style={[styles.dayLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {day.day}
                </Text>
                <View style={[styles.dayStatus, { backgroundColor: getProgressColor(day.success) }]}>
                  <IconSymbol 
                    name={day.success ? "checkmark.circle.fill" : "xmark.circle.fill"} 
                    size={16} 
                    color="white" 
                  />
                </View>
                <Text style={[styles.dayCount, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {day.smallPotty + day.bigPotty}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Encouragement */}
        <View style={styles.encouragementCard}>
          <Text style={styles.starEmoji}>⭐</Text>
          <Text style={[styles.encouragementText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('keepGoing')}
          </Text>
          <Text style={[styles.encouragementSubtext, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('encouragementMessage')}
          </Text>
        </View>

        {/* Success Rate */}
        <View style={styles.successCard}>
          <Text style={[styles.successTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Success Rate
          </Text>
          <View style={styles.successBar}>
            <View 
              style={[
                styles.successFill, 
                { width: `${(successDays / 7) * 100}%` }
              ]} 
            />
          </View>
          <Text style={[styles.successText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {successDays} out of 7 days successful!
          </Text>
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
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: width * 0.35,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  weeklySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: (width - 60) / 7,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  dayStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayCount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  encouragementCard: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
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
  successCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  successBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 10,
  },
  successFill: {
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 4,
  },
  successText: {
    fontSize: 14,
    opacity: 0.7,
  },
});
