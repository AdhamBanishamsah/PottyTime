import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useApp } from '@/contexts/AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
];

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const { resetApp } = useApp();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showResetPuzzle, setShowResetPuzzle] = useState(false);
  const [puzzleAnswer, setPuzzleAnswer] = useState('');
  const [puzzleQuestion, setPuzzleQuestion] = useState('');
  const [puzzleCorrectAnswer, setPuzzleCorrectAnswer] = useState('');

  const handleLanguageChange = async (languageCode: string) => {
    await changeLanguage(languageCode);
    Alert.alert('Success', t('languageChanged'));
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
  };

  const handleRemindersToggle = (value: boolean) => {
    setRemindersEnabled(value);
  };

  const handleAboutPress = () => {
    setShowAboutModal(true);
  };

  const handleOpenWebsite = (url: string) => {
    Linking.openURL(url);
  };

  const generatePuzzle = () => {
    const operations = [
      { op: '+', func: (a: number, b: number) => a + b },
      { op: '-', func: (a: number, b: number) => a - b },
      { op: '×', func: (a: number, b: number) => a * b },
    ];
    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    const num1 = Math.floor(Math.random() * 10) + 1; // 1-10
    const num2 = Math.floor(Math.random() * 10) + 1; // 1-10
    
    // Ensure positive result for subtraction
    if (operation.op === '-') {
      const max = Math.max(num1, num2);
      const min = Math.min(num1, num2);
      const question = `${max} ${operation.op} ${min}`;
      const answer = operation.func(max, min);
      setPuzzleQuestion(question);
      setPuzzleCorrectAnswer(answer.toString());
    } else {
      const question = `${num1} ${operation.op} ${num2}`;
      const answer = operation.func(num1, num2);
      setPuzzleQuestion(question);
      setPuzzleCorrectAnswer(answer.toString());
    }
  };

  const handleResetApp = () => {
    generatePuzzle();
    setShowResetPuzzle(true);
  };

  const handlePuzzleSubmit = async () => {
    if (puzzleAnswer.trim() === puzzleCorrectAnswer) {
      setShowResetPuzzle(false);
      setPuzzleAnswer('');
      Alert.alert(t('resetPuzzleCorrect'), '', [
        {
          text: 'OK',
          onPress: async () => {
            try {
              await resetApp();
              Alert.alert('Success', t('resetSuccess'));
            } catch (error) {
              Alert.alert('Error', 'Failed to reset app. Please try again.');
            }
          },
        },
      ]);
    } else {
      Alert.alert('Incorrect', t('resetPuzzleIncorrect'), [
        { text: t('tryAgain'), onPress: () => {
          generatePuzzle();
          setPuzzleAnswer('');
        }},
        { text: t('cancel'), style: 'cancel' }
      ]);
    }
  };

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showSwitch = false, 
    switchValue = false, 
    onSwitchChange 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      disabled={showSwitch}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
          <IconSymbol name={icon} size={20} color={Colors[colorScheme ?? 'light'].tint} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#E0E0E0', true: Colors[colorScheme ?? 'light'].tint }}
          thumbColor={switchValue ? '#FFFFFF' : '#FFFFFF'}
        />
      ) : (
        <IconSymbol 
          name="chevron.right" 
          size={16} 
          color={Colors[colorScheme ?? 'light'].text} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('settings')}
          </Text>
        </View>

        {/* Language Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('language')}
          </Text>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={[
                styles.languageItem,
                currentLanguage === language.code && styles.selectedLanguage
              ]}
              onPress={() => handleLanguageChange(language.code)}
            >
              <View style={styles.languageInfo}>
                <Text style={styles.languageFlag}>
                  {language.flag}
                </Text>
                <View style={styles.languageText}>
                  <Text style={[styles.languageName, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {language.name}
                  </Text>
                  <Text style={[styles.languageNative, { color: Colors[colorScheme ?? 'light'].text }]}>
                    {language.nativeName}
                  </Text>
                </View>
              </View>
              {currentLanguage === language.code && (
                <IconSymbol name="checkmark.circle.fill" size={20} color={Colors[colorScheme ?? 'light'].tint} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('notifications')}
          </Text>
          <SettingItem
            icon="bell.fill"
            title={t('pushNotifications')}
            subtitle={t('pushNotificationsDesc')}
            showSwitch={true}
            switchValue={notificationsEnabled}
            onSwitchChange={handleNotificationToggle}
          />
          <SettingItem
            icon="clock.fill"
            title={t('dailyReminders')}
            subtitle={t('dailyRemindersDesc')}
            showSwitch={true}
            switchValue={remindersEnabled}
            onSwitchChange={handleRemindersToggle}
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('appInformation')}
          </Text>
          <SettingItem
            icon="info.circle.fill"
            title={t('aboutPottyPal')}
            subtitle={t('learnMoreAboutApp')}
            onPress={handleAboutPress}
          />

        </View>

        {/* Advanced Options Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('advancedOptions')}
          </Text>

          <SettingItem
            icon="arrow.clockwise"
            title={t('resetApp')}
            subtitle={t('resetAppDesc')}
            onPress={handleResetApp}
          />

          <View style={styles.versionItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
                <IconSymbol name="app.badge" size={20} color={Colors[colorScheme ?? 'light'].tint} />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {t('versionLabel')}
                </Text>
                <Text style={[styles.settingSubtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {t('version')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Made with Love */}
        <View style={styles.loveSection}>
          <Text style={[styles.loveText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('madeWithLove')}
          </Text>
        </View>
      </ScrollView>

      {/* About Modal */}
      <Modal
        visible={showAboutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('aboutPottyPalTitle')}</Text>
              <TouchableOpacity
                onPress={() => setShowAboutModal(false)}
                style={styles.closeButton}
              >
                <IconSymbol name="xmark.circle.fill" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>🚽 Potty Pal</Text>
                <Text style={styles.aboutDescription}>
                  {t('pottyPalDescription')}
                </Text>
              </View>

              <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>👨‍💻 {t('developer')}</Text>
                <Text style={styles.aboutDescription}>
                  <Text style={styles.boldText}>Adham Banishamsah</Text>
                </Text>
                <TouchableOpacity
                  style={styles.linkItem}
                  onPress={() => handleOpenWebsite('https://www.adham.no')}
                >
                  <IconSymbol name="globe" size={16} color="#007AFF" />
                  <Text style={styles.linkText}>www.adham.no</Text>
                  <IconSymbol name="arrow.up.right" size={12} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.linkItem}
                  onPress={() => handleOpenWebsite('https://pottytime.adham-tech.com')}
                >
                  <IconSymbol name="app.badge" size={16} color="#007AFF" />
                  <Text style={styles.linkText}>pottytime.adham-tech.com</Text>
                  <IconSymbol name="arrow.up.right" size={12} color="#007AFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>✨ {t('features')}</Text>
                <Text style={styles.featureItem}>• {t('choosePottyBuddy')}</Text>
                <Text style={styles.featureItem}>• {t('trackPottyProgress')}</Text>
                <Text style={styles.featureItem}>• {t('smartReminders')}</Text>
                <Text style={styles.featureItem}>• {t('rewardsAndAchievements')}</Text>
                <Text style={styles.featureItem}>• {t('multiLanguageSupport')}</Text>
                <Text style={styles.featureItem}>• {t('funAnimations')}</Text>
              </View>

              <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>🌍 {t('languages')}</Text>
                <Text style={styles.featureItem}>• {t('english')}</Text>
                <Text style={styles.featureItem}>• {t('arabic')}</Text>
                <Text style={styles.featureItem}>• {t('norwegian')}</Text>
              </View>

              <View style={styles.aboutSection}>
                <Text style={styles.aboutTitle}>📱 Version</Text>
                <Text style={styles.aboutDescription}>{t('version')}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Reset Puzzle Modal */}
      <Modal
        visible={showResetPuzzle}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowResetPuzzle(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t('resetPuzzleTitle')}</Text>
              <TouchableOpacity
                onPress={() => setShowResetPuzzle(false)}
                style={styles.closeButton}
              >
                <IconSymbol name="xmark.circle.fill" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.aboutDescription}>{t('resetPuzzleMessage')}</Text>
              <Text style={styles.aboutTitle}>{puzzleQuestion}</Text>
              <TextInput
                style={styles.puzzleInput}
                value={puzzleAnswer}
                onChangeText={setPuzzleAnswer}
                placeholder={t('resetPuzzlePlaceholder')}
                keyboardType="numeric"
                maxLength={2}
              />
              <TouchableOpacity
                style={styles.puzzleSubmitButton}
                onPress={handlePuzzleSubmit}
              >
                <Text style={styles.puzzleSubmitText}>{t('resetPuzzleSubmit')}</Text>
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
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.6,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedLanguage: {
    backgroundColor: '#F0F8FF',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  languageInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  languageNative: {
    fontSize: 14,
    opacity: 0.6,
  },
  versionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 1,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  loveSection: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  loveText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
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
    width: '90%',
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  modalBody: {
    padding: 20,
  },
  aboutSection: {
    marginBottom: 25,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  aboutDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 16,
    color: '#007AFF',
    marginLeft: 8,
    marginRight: 8,
    flex: 1,
  },
  featureItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 5,
  },
  puzzleInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
  },
  puzzleSubmitButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  puzzleSubmitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
