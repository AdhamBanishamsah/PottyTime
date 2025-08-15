# 🚽 PottyTime - Potty Training App

A fun and engaging potty training app designed to help children learn and track their potty habits with the help of friendly animal buddies!

## 👨‍💻 Developer

**Adham Banishamsah**  
🌐 [www.adham.no](https://www.adham.no)  
🌐 App Site: [pottytime.adham-tech.com](https://pottytime.adham-tech.com)

---

## 🎯 About PottyTime

PottyTime is a child-friendly mobile application built with React Native and Expo that makes potty training an enjoyable experience for both children and parents. The app features cute animal buddies, progress tracking, rewards, and customizable reminders to encourage positive potty habits.

## ✨ Features

### 🏠 Home Screen
- **Choose Your Potty Buddy**: Select from 4 friendly animals (Bear, Rabbit, Lion, Elephant)
- **Interactive Potty Buttons**: Track small and big potty usage
- **Cheering System**: Animals cheer on children's progress
- **Encouraging Messages**: Positive reinforcement for every attempt

### 🔔 Reminders System
- **Smart Scheduling**: Pre-configured daily reminders
- **Custom Reminders**: Add personalized reminders with random icons
- **Time Sorting**: Automatic chronological organization
- **Toggle Controls**: Easy enable/disable functionality

### 📊 Progress Tracking
- **Daily Progress**: Visual representation of potty usage
- **Weekly Overview**: Track patterns and improvements
- **Success Metrics**: Celebrate achievements and milestones

### 🏆 Rewards System
- **Achievement Badges**: Unlock rewards for different milestones
- **Progress Tracking**: Visual progress bars and completion status
- **Motivational Messages**: Encouraging feedback for continued success

### 🌍 Multi-Language Support
- **English**: Full localization
- **Arabic**: Complete Arabic translation
- **Norwegian**: Full Norwegian translation
- **Real-time Switching**: Instant language changes throughout the app

### ⚙️ Settings
- **Language Selection**: Choose from 3 supported languages
- **Notification Preferences**: Customize reminder settings
- **App Information**: Version details and developer info

### 🎬 Loading Screen
- **Fun Animations**: Rotating potty emoji and bouncing animal buddies
- **Engaging Experience**: Makes app startup exciting for children
- **Multi-language**: Loading messages in all supported languages

## 🛠️ Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **State Management**: React Context API
- **Internationalization**: i18n-js
- **UI Components**: Custom components with Tailwind-inspired styling
- **Icons**: SF Symbols with Material Icons fallback
- **Storage**: AsyncStorage for language persistence

## 📱 Screenshots

### Home Screen
- Interactive potty buddy selection
- Cheering animals and encouraging messages
- Easy-to-use potty tracking buttons

### Reminders
- Daily schedule with customizable reminders
- Time-based sorting and organization
- Random icon assignment for new reminders

### Progress
- Visual progress tracking
- Weekly overview with daily statistics
- Achievement celebration

### Rewards
- Unlockable badges and achievements
- Progress visualization
- Motivational reward system

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:AdhamBanishamsah/PottyTime.git
   cd PottyTime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```

5. **Run on Android Emulator**
   ```bash
   npm run android
   ```

## 📁 Project Structure

```
PottyTime/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home screen
│   │   ├── reminders.tsx      # Reminders management
│   │   ├── progress.tsx       # Progress tracking
│   │   ├── rewards.tsx        # Rewards system
│   │   └── settings.tsx       # Settings & language
│   ├── loading.tsx            # Loading screen
│   └── _layout.tsx            # Root layout
├── components/
│   └── ui/
│       └── IconSymbol.tsx     # Cross-platform icons
├── contexts/
│   └── LanguageContext.tsx    # Language management
├── utils/
│   └── i18n.ts               # Internationalization
├── types/
│   └── index.ts              # TypeScript definitions
└── constants/
    └── Colors.ts             # Theme colors
```

## 🌍 Language Support

The app supports three languages with complete localization:

- **English**: Default language with full feature support
- **Arabic**: Right-to-left layout support with Arabic translations
- **Norwegian**: Complete Norwegian localization

All text, including:
- Navigation labels
- Screen titles and content
- Animal names
- Reminder titles
- Settings options
- Loading messages

## 🎨 Design Philosophy

- **Child-Friendly**: Bright colors, large buttons, and simple navigation
- **Accessible**: High contrast, readable fonts, and intuitive interactions
- **Responsive**: Works seamlessly across different screen sizes
- **Engaging**: Fun animations and encouraging feedback throughout

## 🔧 Customization

### Adding New Languages
1. Add translations to `utils/i18n.ts`
2. Update `types/index.ts` with new keys
3. Test layout for RTL languages if needed

### Adding New Features
1. Create new screen in `app/(tabs)/`
2. Add navigation in `app/(tabs)/_layout.tsx`
3. Update translations if needed
4. Test across all supported languages

## 📄 License

This project is developed by Adham Banishamsah. All rights reserved.

## 🤝 Contributing

For contributions or questions, please contact:
- **Website**: [www.adham.no](https://www.adham.no)
- **App Site**: [pottytime.adham-tech.com](https://pottytime.adham-tech.com)

## 📞 Support

For support, feature requests, or bug reports, please visit:
🌐 [pottytime.adham-tech.com](https://pottytime.adham-tech.com)

---

**Made with ❤️ for little potty champions!** 🚽✨
