import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '@/contexts/LanguageContext';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
];

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

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

  const SettingItem = ({ 
    icon, 
    title, 
    subtitle, 
    onPress, 
    showSwitch = false, 
    switchValue = false, 
    onSwitchChange 
  }: {
    icon: string;
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
                <Text style={[styles.languageName, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {language.name}
                </Text>
                <Text style={[styles.languageNative, { color: Colors[colorScheme ?? 'light'].text }]}>
                  {language.nativeName}
                </Text>
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
            title={t('notifications')}
            subtitle="Get reminders and updates"
            showSwitch={true}
            switchValue={notificationsEnabled}
            onSwitchChange={handleNotificationToggle}
          />
          <SettingItem
            icon="clock.fill"
            title={t('enableReminders')}
            subtitle="Daily potty reminders"
            showSwitch={true}
            switchValue={remindersEnabled}
            onSwitchChange={handleRemindersToggle}
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            About
          </Text>
          <SettingItem
            icon="info.circle.fill"
            title={t('aboutPottyPal')}
            subtitle="Learn more about the app"
          />
          <View style={styles.versionItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconContainer, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }]}>
                <IconSymbol name="app.badge" size={20} color={Colors[colorScheme ?? 'light'].tint} />
              </View>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
                  Version
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
});
