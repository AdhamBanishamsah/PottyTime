import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface PottyBuddy {
  id: string;
  nameKey: string;
  emoji: string;
  color: string;
}

const pottyBuddies: PottyBuddy[] = [
  { id: 'bear', nameKey: 'bear', emoji: '🐻', color: '#8B4513' },
  { id: 'rabbit', nameKey: 'rabbit', emoji: '🐰', color: '#808080' },
  { id: 'lion', nameKey: 'lion', emoji: '🦁', color: '#FFA500' },
  { id: 'elephant', nameKey: 'elephant', emoji: '🐘', color: '#808080' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();
  const [selectedBuddy, setSelectedBuddy] = useState<PottyBuddy>(pottyBuddies[0]);
  const [smallPottyCount, setSmallPottyCount] = useState(0);
  const [bigPottyCount, setBigPottyCount] = useState(0);

  const handleBuddySelect = (buddy: PottyBuddy) => {
    setSelectedBuddy(buddy);
  };

  const handleSmallPotty = () => {
    setSmallPottyCount(prev => prev + 1);
    Alert.alert(t('greatJob') + ' 🎉', 'You did it! Keep up the good work!', [{ text: 'OK' }]);
  };

  const handleBigPotty = () => {
    setBigPottyCount(prev => prev + 1);
    Alert.alert('Amazing! 🌟', t('bigKidMessage'), [{ text: 'OK' }]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with gradient background */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>PeePee Hero</Text>
          <Text style={styles.appSubtitle}>Let's make potty time fun! 🐦</Text>
        </View>

        {/* Choose Your Potty Buddy Section */}
        <View style={styles.buddySection}>
          <Text style={styles.buddyTitle}>{t('chooseBuddy')}</Text>
          <View style={styles.buddyGrid}>
            {pottyBuddies.map((buddy) => (
              <TouchableOpacity
                key={buddy.id}
                style={[
                  styles.buddyButton,
                  selectedBuddy.id === buddy.id && styles.selectedBuddy
                ]}
                onPress={() => handleBuddySelect(buddy)}
              >
                <Text style={styles.buddyEmoji}>{buddy.emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Potty Buddy Cheering */}
        <View style={styles.cheeringSection}>
          <Text style={styles.buddyEmojiLarge}>{selectedBuddy.emoji}</Text>
          <Text style={styles.cheeringText}>{t(selectedBuddy.nameKey)} {t('cheeringMessage')}</Text>
          <Text style={styles.instructionText}>{t('tapInstruction')}</Text>
        </View>

        {/* Potty Buttons */}
        <View style={styles.pottyButtons}>
          <TouchableOpacity
            style={[styles.pottyButton, styles.smallPottyButton]}
            onPress={handleSmallPotty}
          >
            <Text style={styles.pottyEmoji}>💧</Text>
            <Text style={styles.pottyButtonText}>{t('smallPotty')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.pottyButton, styles.bigPottyButton]}
            onPress={handleBigPotty}
          >
            <Text style={styles.pottyEmoji}>💩</Text>
            <Text style={styles.pottyButtonText}>{t('bigPotty')}</Text>
          </TouchableOpacity>
        </View>

        {/* Encouragement Section */}
        <View style={styles.encouragementSection}>
          <Text style={styles.starEmoji}>⭐</Text>
          <Text style={styles.encouragementTitle}>{t('amazingMessage')}</Text>
          <Text style={styles.encouragementText}>
            {t('bigKidMessage')}
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
    backgroundColor: '#FF69B4',
    paddingTop: 15,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  buddySection: {
    backgroundColor: '#E8F5E8',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
  },
  buddyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  buddyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buddyButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedBuddy: {
    backgroundColor: '#FF69B4',
    borderColor: '#FF69B4',
  },
  buddyEmoji: {
    fontSize: 24,
  },
  cheeringSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  buddyEmojiLarge: {
    fontSize: 100,
    marginBottom: 5,
  },
  cheeringText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
  },
  pottyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  pottyButton: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 15,
    borderRadius: 12,
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
  smallPottyButton: {
    backgroundColor: '#34C759',
  },
  bigPottyButton: {
    backgroundColor: '#FF9500',
  },
  pottyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  pottyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  encouragementSection: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  starEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  encouragementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  encouragementText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});
