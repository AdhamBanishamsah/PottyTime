import { Audio } from 'expo-av';

class SoundManager {
  private backgroundMusic: Audio.Sound | null = null;
  private reminderSound: Audio.Sound | null = null;
  private isMusicEnabled: boolean = true;
  private musicVolume: number = 0.5;

  async loadSounds() {
    try {
      console.log('Loading sounds...');
      
      // Load background music
      const { sound: bgMusic } = await Audio.Sound.createAsync(
        require('../assets/Audio/Sitting On The Potty.mp3'),
        { 
          shouldPlay: false,
          isLooping: true,
          volume: this.musicVolume
        }
      );
      this.backgroundMusic = bgMusic;
      console.log('Background music loaded');

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

  async playBackgroundMusic() {
    try {
      if (this.backgroundMusic && this.isMusicEnabled) {
        await this.backgroundMusic.playAsync();
        console.log('Background music started');
      } else {
        console.log('Background music not loaded or disabled');
      }
    } catch (error) {
      console.error('Error playing background music:', error);
      throw error;
    }
  }

  async stopBackgroundMusic() {
    try {
      if (this.backgroundMusic) {
        await this.backgroundMusic.stopAsync();
        console.log('Background music stopped');
      }
    } catch (error) {
      console.error('Error stopping background music:', error);
      throw error;
    }
  }

  async setMusicVolume(volume: number) {
    try {
      this.musicVolume = volume;
      if (this.backgroundMusic) {
        await this.backgroundMusic.setVolumeAsync(volume);
        console.log('Music volume set to:', volume);
      }
    } catch (error) {
      console.error('Error setting music volume:', error);
      throw error;
    }
  }

  setMusicEnabled(enabled: boolean) {
    this.isMusicEnabled = enabled;
    if (!enabled && this.backgroundMusic) {
      this.stopBackgroundMusic();
    } else if (enabled && this.backgroundMusic) {
      this.playBackgroundMusic();
    }
  }

  getMusicEnabled(): boolean {
    return this.isMusicEnabled;
  }

  getMusicVolume(): number {
    return this.musicVolume;
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
      if (this.backgroundMusic) {
        await this.backgroundMusic.unloadAsync();
        this.backgroundMusic = null;
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
