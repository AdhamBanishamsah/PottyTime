import { Audio } from 'expo-av';

class SoundManager {
  private smallPottySound: Audio.Sound | null = null;
  private bigPottySound: Audio.Sound | null = null;
  private reminderSound: Audio.Sound | null = null;

  async loadSounds() {
    try {
      console.log('Loading sounds...');
      
      // Load small potty sound
      const { sound: smallSound } = await Audio.Sound.createAsync(
        require('../assets/Audio/small_potty_effect.mp3')
      );
      this.smallPottySound = smallSound;
      console.log('Small potty sound loaded');

      // Load big potty sound
      const { sound: bigSound } = await Audio.Sound.createAsync(
        require('../assets/Audio/big_potty_effect.mp3')
      );
      this.bigPottySound = bigSound;
      console.log('Big potty sound loaded');

      // Load reminder sound
      const { sound: reminderSound } = await Audio.Sound.createAsync(
        require('../assets/Audio/reminder_effect.mp3')
      );
      this.reminderSound = reminderSound;
      console.log('Reminder sound loaded');

      console.log('All sounds loaded successfully');
    } catch (error) {
      console.error('Error loading sounds:', error);
      throw error;
    }
  }

  async playSmallPottySound() {
    try {
      if (this.smallPottySound) {
        await this.smallPottySound.replayAsync();
        console.log('Small potty sound played');
      } else {
        console.log('Small potty sound not loaded');
      }
    } catch (error) {
      console.error('Error playing small potty sound:', error);
      throw error;
    }
  }

  async playBigPottySound() {
    try {
      if (this.bigPottySound) {
        await this.bigPottySound.replayAsync();
        console.log('Big potty sound played');
      } else {
        console.log('Big potty sound not loaded');
      }
    } catch (error) {
      console.error('Error playing big potty sound:', error);
      throw error;
    }
  }

  async playReminderSound() {
    try {
      if (this.reminderSound) {
        await this.reminderSound.replayAsync();
        console.log('Reminder sound played');
      } else {
        console.log('Reminder sound not loaded');
      }
    } catch (error) {
      console.error('Error playing reminder sound:', error);
      throw error;
    }
  }

  async unloadSounds() {
    try {
      if (this.smallPottySound) {
        await this.smallPottySound.unloadAsync();
        this.smallPottySound = null;
      }
      if (this.bigPottySound) {
        await this.bigPottySound.unloadAsync();
        this.bigPottySound = null;
      }
      if (this.reminderSound) {
        await this.reminderSound.unloadAsync();
        this.reminderSound = null;
      }
      console.log('All sounds unloaded');
    } catch (error) {
      console.error('Error unloading sounds:', error);
    }
  }
}

export const soundManager = new SoundManager();
