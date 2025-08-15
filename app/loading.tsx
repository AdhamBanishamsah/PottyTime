import { Colors } from '@/constants/Colors';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  
  console.log('Loading screen rendered!');
  
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const logoBounce = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;
  const starRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    const startAnimations = () => {
      // Logo scale and bounce animation
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(logoBounce, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(logoBounce, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();

      // Logo rotation animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(logoRotation, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(logoRotation, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Text fade in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }).start();

      // Bouncing animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Star rotation animation
      Animated.loop(
        Animated.timing(starRotation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimations();

    // Navigate to main app after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, logoScale, logoRotation, logoBounce, textOpacity, bounceValue, starRotation]);

  const spin = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const bounce = bounceValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const logoBounceY = logoBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const starSpin = starRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.content}>
        {/* Main Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [
                { scale: logoScale },
                { translateY: logoBounceY },
              ],
            },
          ]}
        >
          <Image 
            source={require('../assets/images/AppIcons/appstore.png')} 
            style={styles.logoImage}
            resizeMode="contain"
            onError={(error) => console.log('Logo loading error:', error)}
            onLoad={() => console.log('Logo loaded successfully!')}
          />
          
          {/* Rotating Stars */}
          <Animated.View
            style={[
              styles.starLeft,
              {
                transform: [{ rotate: starSpin }],
              },
            ]}
          >
            <Text style={styles.starEmoji}>⭐</Text>
          </Animated.View>
          
          <Animated.View
            style={[
              styles.starRight,
              {
                transform: [{ rotate: starSpin }],
              },
            ]}
          >
            <Text style={styles.starEmoji}>⭐</Text>
          </Animated.View>
        </Animated.View>

        {/* Bouncing Potty Buddies */}
        <View style={styles.buddiesContainer}>
          <Animated.Text
            style={[
              styles.buddyEmoji,
              {
                transform: [{ translateY: bounce }],
              },
            ]}
          >
            🐻
          </Animated.Text>
          <Animated.Text
            style={[
              styles.buddyEmoji,
              {
                transform: [{ translateY: bounce }],
              },
            ]}
          >
            🐰
          </Animated.Text>
          <Animated.Text
            style={[
              styles.buddyEmoji,
              {
                transform: [{ translateY: bounce }],
              },
            ]}
          >
            🦁
          </Animated.Text>
          <Animated.Text
            style={[
              styles.buddyEmoji,
              {
                transform: [{ translateY: bounce }],
              },
            ]}
          >
            🐘
          </Animated.Text>
        </View>

        {/* Loading Text */}
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
          <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('loadingTitle')}
          </Text>
          <Text style={[styles.subtitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {t('loadingSubtitle')}
          </Text>
        </Animated.View>

        {/* Loading Dots */}
        <View style={styles.dotsContainer}>
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                transform: [{ scale: bounceValue }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                transform: [{ scale: bounceValue }],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: Colors[colorScheme ?? 'light'].tint,
                transform: [{ scale: bounceValue }],
              },
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  starLeft: {
    position: 'absolute',
    left: -30,
    top: 20,
  },
  starRight: {
    position: 'absolute',
    right: -30,
    top: 20,
  },
  starEmoji: {
    fontSize: 30,
  },
  buddiesContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    gap: 20,
  },
  buddyEmoji: {
    fontSize: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
