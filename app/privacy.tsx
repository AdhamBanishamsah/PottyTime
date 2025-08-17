import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PrivacyModalProps {
  visible: boolean;
  onClose: () => void;
}

const PrivacyModal = ({ visible, onClose }: PrivacyModalProps) => {
  const colorScheme = useColorScheme();
  const { t } = useLanguage();

  const handleWebsite = () => {
    Linking.openURL('https://pottytime.adham-tech.com');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t('privacyPolicy')}</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
            >
              <IconSymbol name="xmark.circle.fill" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('privacyIntroduction')}</Text>
              <Text style={styles.paragraph}>
                {t('privacyIntroductionText')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('informationWeCollect')}</Text>
              <Text style={styles.paragraph}>
                {t('informationWeCollectText')}
              </Text>
              <Text style={styles.bulletPoint}>• {t('localDataStorage')}</Text>
              <Text style={styles.bulletPoint}>• {t('appUsageData')}</Text>
              <Text style={styles.bulletPoint}>• {t('deviceInformation')}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('howWeUseInformation')}</Text>
              <Text style={styles.paragraph}>
                {t('howWeUseInformationText')}
              </Text>
              <Text style={styles.bulletPoint}>• {t('provideAppFeatures')}</Text>
              <Text style={styles.bulletPoint}>• {t('improveUserExperience')}</Text>
              <Text style={styles.bulletPoint}>• {t('trackProgress')}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('dataSecurity')}</Text>
              <Text style={styles.paragraph}>
                {t('dataSecurityText')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('childrensPrivacy')}</Text>
              <Text style={styles.paragraph}>
                {t('childrensPrivacyText')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('thirdPartyServices')}</Text>
              <Text style={styles.paragraph}>
                {t('thirdPartyServicesText')}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t('yourRights')}</Text>
              <Text style={styles.paragraph}>
                {t('yourRightsText')}
              </Text>
              <Text style={styles.bulletPoint}>• {t('accessYourData')}</Text>
              <Text style={styles.bulletPoint}>• {t('deleteYourData')}</Text>
              <Text style={styles.bulletPoint}>• {t('contactUs')}</Text>
            </View>

            <View style={styles.contactSection}>
              <Text style={styles.contactTitle}>{t('contactUs')}</Text>
              <TouchableOpacity style={styles.contactButton} onPress={handleWebsite}>
                <IconSymbol name="globe" size={20} color="#fff" />
                <Text style={styles.contactButtonText}>{t('visitWebsite')}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.lastUpdated}>
              {t('lastUpdated')}: {t('lastUpdatedDate')}
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#666',
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    marginLeft: 20,
    color: '#666',
  },
  contactSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  lastUpdated: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default PrivacyModal;
