import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
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
  image?: any;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  color: string;
}

export default function RewardsScreen() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const { appState } = useApp();
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const getRewards = (): Reward[] => {
    const totalPottyCount = appState.smallPottyCount + appState.bigPottyCount;
    
    return [
          {
        id: 'potty-rookie',
        title: t('pottyRookie'),
        description: t('pottyRookieDesc'),
        emoji: '🐣',
        image: require('../../assets/images/Potty_Rookie.png'),
        unlocked: appState.achievements.includes('potty-rookie'),
        progress: appState.smallPottyCount > 0 ? 1 : 0,
        maxProgress: 1,
        color: '#FFD700',
      },
          {
        id: 'high-five-hero',
        title: t('highFiveHero'),
        description: t('highFiveHeroDesc'),
        emoji: '🖐️',
        image: require('../../assets/images/High-Five_Hero.png'),
        unlocked: appState.achievements.includes('high-five-hero'),
        progress: Math.min(appState.smallPottyCount, 5),
        maxProgress: 5,
        color: '#FF6B6B',
      },
          {
        id: 'star-sitter',
        title: t('starSitter'),
        description: t('starSitterDesc'),
        emoji: '⭐',
        image: require('../../assets/images/Star_Sitter.png'),
        unlocked: appState.achievements.includes('star-sitter'),
        progress: Math.min(totalPottyCount, 10),
        maxProgress: 10,
        color: '#4ECDC4',
      },
          {
        id: 'pee-pro',
        title: t('peePro'),
        description: t('peeProDesc'),
        emoji: '💧',
        image: require('../../assets/images/Pee_Pro.png'),
        unlocked: appState.achievements.includes('pee-pro'),
        progress: Math.min(appState.smallPottyCount, 5),
        maxProgress: 5,
        color: '#45B7D1',
      },
          {
        id: 'poop-pal',
        title: t('poopPal'),
        description: t('poopPalDesc'),
        emoji: '💩',
        image: require('../../assets/images/Poop_Pal.png'),
        unlocked: appState.achievements.includes('poop-pal'),
        progress: Math.min(appState.bigPottyCount, 3),
        maxProgress: 3,
        color: '#96CEB4',
      },
    {
      id: 'daily-champ',
      title: t('dailyChamp'),
      description: t('dailyChampDesc'),
      emoji: '🏆',
      image: require('../../assets/images/Potty_Party.png'), // Using Potty Party image for Daily Champ
      unlocked: appState.achievements.includes('daily-champ'),
      progress: Math.min(totalPottyCount, 7),
      maxProgress: 7,
      color: '#FFA07A',
    },
    {
      id: 'magical-potty-power',
      title: t('magicalPottyPower'),
      description: t('magicalPottyPowerDesc'),
      emoji: '🦄',
      image: require('../../assets/images/Magical_Potty_Power.png'), // Using Potty Party image for Magical Potty Power
      unlocked: appState.achievements.includes('magical-potty-power'),
      progress: 1,
      maxProgress: 2,
      color: '#DDA0DD',
    },
    {
      id: 'slow-and-steady',
      title: t('slowAndSteady'),
      description: t('slowAndSteadyDesc'),
      emoji: '🐢',
      image: require('../../assets/images/Slow_and_Steady.png'),
      unlocked: appState.achievements.includes('slow-and-steady'),
      progress: 1,
      maxProgress: 1,
      color: '#98FB98',
    },
    {
      id: 'quick-bunny',
      title: t('quickBunny'),
      description: t('quickBunnyDesc'),
      emoji: '🐰',
      image: require('../../assets/images/Quick_Bunny.png'),
      unlocked: appState.achievements.includes('quick-bunny'),
      progress: 0,
      maxProgress: 1,
      color: '#F0E68C',
    },
    {
      id: 'potty-party',
      title: t('pottyParty'),
      description: t('pottyPartyDesc'),
      emoji: '🎈',
      image: require('../../assets/images/Potty_Party.png'),
      unlocked: appState.achievements.includes('potty-party'),
      progress: Math.min(totalPottyCount, 10),
      maxProgress: 10,
      color: '#FFB6C1',
    },
    {
      id: 'super-wiper',
      title: t('superWiper'),
      description: t('superWiperDesc'),
      emoji: '🦸',
      image: require('../../assets/images/Super_Wiper.png'),
      unlocked: appState.achievements.includes('super-wiper'),
      progress: 0,
      maxProgress: 1,
      color: '#87CEEB',
    },
    {
      id: 'flushy-fish',
      title: t('flushyFish'),
      description: t('flushyFishDesc'),
      emoji: '🐠',
      image: require('../../assets/images/Flushy_fish.png'), // Using Potty Party image for Flushy Fish
      unlocked: appState.achievements.includes('flushy-fish'),
      progress: 0,
      maxProgress: 1,
      color: '#20B2AA',
    },
    {
      id: 'big-kid-badge',
      title: t('bigKidBadge'),
      description: t('bigKidBadgeDesc'),
      emoji: '🌟',
      image: require('../../assets/images/Star_Sitter.png'), // Using Star Sitter image for Big Kid Badge
      unlocked: appState.achievements.includes('big-kid-badge'),
      progress: Math.min(totalPottyCount, 10),
      maxProgress: 10,
      color: '#FFD700',
    },
    {
      id: 'cheeky-chimp',
      title: t('cheekyChimp'),
      description: t('cheekyChimpDesc'),
      emoji: '🐵',
      image: require('../../assets/images/Cheeky_Chimp.png'),
      unlocked: appState.achievements.includes('cheeky-chimp'),
      progress: 1,
      maxProgress: 1,
      color: '#DEB887',
    },
          {
        id: 'potty-streak-star',
        title: t('pottyStreakStar'),
        description: t('pottyStreakStarDesc'),
        emoji: '🎉',
        image: require('../../assets/images/Potty_Streak_Star.png'),
        unlocked: appState.achievements.includes('potty-streak-star'),
        progress: 1,
        maxProgress: 3,
        color: '#FF69B4',
      },
    ];
  };

  const rewards = getRewards();

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
            Your Achievement Badges
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
                  {reward.image ? (
                    <Image 
                      source={reward.image} 
                      style={styles.rewardImage}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.rewardEmoji}>{reward.emoji}</Text>
                  )}
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
    padding: 12,
    marginBottom: 12,
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
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  rewardEmoji: {
    fontSize: 25,
  },
  rewardImage: {
    width: 60,
    height: 60,
  },
  unlockBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  rewardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 10,
    opacity: 0.7,
    textAlign: 'center',
    marginBottom: 8,
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
