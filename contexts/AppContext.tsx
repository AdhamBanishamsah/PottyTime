import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AppState {
  smallPottyCount: number;
  bigPottyCount: number;
  achievements: string[];
  customReminders: any[];
  lastResetDate: string | null;
  weeklyProgress: {
    [date: string]: {
      smallPotty: number;
      bigPotty: number;
      success: boolean;
    };
  };
}

interface AppContextType {
  appState: AppState;
  updateSmallPottyCount: (count: number) => void;
  updateBigPottyCount: (count: number) => void;
  unlockAchievement: (achievementId: string) => void;
  addCustomReminder: (reminder: any) => void;
  removeCustomReminder: (reminderId: string) => void;
  updateDailyProgress: (date: string, smallPotty: number, bigPotty: number) => void;
  resetApp: () => Promise<void>;
}

const defaultAppState: AppState = {
  smallPottyCount: 0,
  bigPottyCount: 0,
  achievements: [],
  customReminders: [],
  lastResetDate: null,
  weeklyProgress: {},
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appState, setAppState] = useState<AppState>(defaultAppState);

  // Load app state from AsyncStorage on mount
  useEffect(() => {
    loadAppState();
  }, []);

  const loadAppState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('appState');
      if (savedState) {
        setAppState(JSON.parse(savedState));
      }
    } catch (error) {
      console.error('Error loading app state:', error);
    }
  };

  const saveAppState = async (newState: AppState) => {
    try {
      await AsyncStorage.setItem('appState', JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving app state:', error);
    }
  };

  const updateSmallPottyCount = (count: number) => {
    const newState = { ...appState, smallPottyCount: count };
    setAppState(newState);
    saveAppState(newState);
  };

  const updateBigPottyCount = (count: number) => {
    const newState = { ...appState, bigPottyCount: count };
    setAppState(newState);
    saveAppState(newState);
  };

  const unlockAchievement = (achievementId: string) => {
    if (!appState.achievements.includes(achievementId)) {
      const newState = {
        ...appState,
        achievements: [...appState.achievements, achievementId],
      };
      setAppState(newState);
      saveAppState(newState);
    }
  };

  const addCustomReminder = (reminder: any) => {
    const newState = {
      ...appState,
      customReminders: [...appState.customReminders, reminder],
    };
    setAppState(newState);
    saveAppState(newState);
  };

  const removeCustomReminder = (reminderId: string) => {
    const newState = {
      ...appState,
      customReminders: appState.customReminders.filter(r => r.id !== reminderId),
    };
    setAppState(newState);
    saveAppState(newState);
  };

  const updateDailyProgress = (date: string, smallPotty: number, bigPotty: number) => {
    const success = smallPotty > 0 || bigPotty > 0;
    const newState = {
      ...appState,
      weeklyProgress: {
        ...appState.weeklyProgress,
        [date]: {
          smallPotty,
          bigPotty,
          success,
        },
      },
    };
    setAppState(newState);
    saveAppState(newState);
  };

  const resetApp = async () => {
    try {
      // Clear all AsyncStorage data
      await AsyncStorage.clear();
      
      // Reset to default state
      const resetState: AppState = {
        ...defaultAppState,
        lastResetDate: new Date().toISOString(),
      };
      
      setAppState(resetState);
      await saveAppState(resetState);
      
      console.log('App reset successfully');
    } catch (error) {
      console.error('Error resetting app:', error);
      throw error;
    }
  };

  const value: AppContextType = {
    appState,
    updateSmallPottyCount,
    updateBigPottyCount,
    unlockAchievement,
    addCustomReminder,
    removeCustomReminder,
    updateDailyProgress,
    resetApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
