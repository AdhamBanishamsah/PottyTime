import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Reward {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  color: string;
}

export default function RewardsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const rewards: Reward[] = [
    {
      id: 'first-try',
      title: t('firstTry'),
      description: t('firstTryDesc'),
      emoji: '🎉',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      color: '#FFD700',
    },
    {
      id: 'high-five',
      title: t('highFive'),
      description: t('highFiveDesc'),
      emoji: '🖐️',
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      color: '#FF6B6B',
    },
    {
      id: 'perfect-ten',
      title: t('perfectTen'),
      description: t('perfectTenDesc'),
      emoji: '⭐',
      unlocked: false,
      progress: 7,
      maxProgress: 10,
      color: '#4ECDC4',
    },
    {
      id: 'pee-expert',
      title: t('peeExpert'),
      description: t('peeExpertDesc'),
      emoji: '💧',
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      color: '#45B7D1',
    },
    {
      id: 'poop-champion',
      title: t('poopChampion'),
      description: t('poopChampionDesc'),
      emoji: '💩',
      unlocked: false,
      progress: 2,
      maxProgress: 3,
      color: '#96CEB4',
    },
    {
      id: 'week-warrior',
      title: t('weekWarrior'),
      description: t('weekWarriorDesc'),
      emoji: '🏆',
      unlocked: false,
      progress: 4,
      maxProgress: 7,
      color: '#FFA07A',
    },
  ];

  const totalUnlocked = rewards.filter(reward => reward.unlocked).length;
  const totalRewards = rewards.length;

  const getProgressPercentage = (progress: number, maxProgress: number) => {
    return Math.min((progress / maxProgress) * 100, 100);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('pottyRewards')}
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Collect all the badges! 🏆
          </Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎖️</Text>
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
              {totalUnlocked}
            </Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              {t('earned')}
            </Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📊</Text>
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
              {totalRewards}
            </Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Total
            </Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={[styles.statNumber, { color: Colors[colorScheme ?? 'light'].text }]}>
              {Math.round((totalUnlocked / totalRewards) * 100)}%
            </Text>
            <Text style={[styles.statLabel, { color: Colors[colorScheme ?? 'light'].text }]}>
              Complete
            </Text>
          </View>
        </View>

        {/* Rewards Grid */}
        <View style={styles.rewardsSection}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            Your Achievements
          </Text>
          
          <View style={styles.rewardsGrid}>
            {rewards.map((reward) => (
              <TouchableOpacity
                key={reward.id}
                style={[
                  styles.rewardCard,
                  reward.unlocked && styles.unlockedReward,
                  selectedReward === reward.id && styles.selectedReward
                ]}
                onPress={() => setSelectedReward(reward.id)}
              >
                <View style={[styles.rewardIcon, { backgroundColor: reward.color + '20' }]}>
                  <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
                  {reward.unlocked && (
                    <View style={styles.unlockBadge}>
                      <IconSymbol name="checkmark.circle.fill" size={16} color="#34C759" />
                    </View>
                  )}
                </View>
                
                <Text style={[styles.rewardTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {reward.title}
                </Text>
                
                <Text style={[styles.rewardDescription, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {reward.description}
                </Text>
                
                {!reward.unlocked && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${getProgressPercentage(reward.progress, reward.maxProgress)}%`,
                            backgroundColor: reward.color
                          }
                        ]} 
                      />
                    </View>
                    <Text style={[styles.progressText, { color: Colors[colorScheme ?? 'light'].text }]}>
                      {reward.progress}/{reward.maxProgress}
                    </Text>
                  </View>
                )}
                
                {reward.unlocked && (
                  <View style={styles.unlockedContainer}>
                    <Text style={styles.unlockedText}>{t('unlocked')}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Encouragement */}
        <View style={styles.encouragementCard}>
          <Text style={styles.starEmoji}>⭐</Text>
          <Text style={[styles.encouragementText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('amazingJob')}
          </Text>
          <Text style={[styles.encouragementSubtext, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('earnedRewardMessage')}
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
  statsContainer: {
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
    minWidth: width * 0.25,
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  rewardsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rewardCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    width: (width - 60) / 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  unlockedReward: {
    borderWidth: 2,
    borderColor: '#34C759',
  },
  selectedReward: {
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  rewardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  rewardEmoji: {
    fontSize: 30,
  },
  unlockBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  rewardDescription: {
    fontSize: 11,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.7,
  },
  unlockedContainer: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  unlockedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  encouragementCard: {
    backgroundColor: '#FFF3E0',
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
