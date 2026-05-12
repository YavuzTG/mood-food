import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🍽️ Mood Food</Text>
          <Text style={styles.subtitle}>
            Ruh haline göre yemek ve mekan önerileri
          </Text>
        </View>

        {/* Hero Image Area */}
        <View style={styles.heroArea}>
          <Text style={styles.heroEmoji}>😋</Text>
        </View>

        {/* Main Options */}
        <View style={styles.optionsContainer}>
          {/* Option 1: Create Your Own */}
          <TouchableOpacity
            style={[styles.optionButton, styles.createButton]}
            onPress={() => router.push('/screens/create-recipe')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionEmoji}>🍳</Text>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Kendin Oluştur</Text>
                <Text style={styles.optionDescription}>
                  Elindeki malzemeleri gir, tarif önerileri al
                </Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>

          {/* Option 2: How are you feeling */}
          <TouchableOpacity
            style={[styles.optionButton, styles.moodButton]}
            onPress={() => router.push('/screens/mood-select')}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionEmoji}>🎯</Text>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>Nasıl Hissediyorsun?</Text>
                <Text style={styles.optionDescription}>
                  Ruh haline uygun yemek ve mekan bulunuz
                </Text>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Neden Mood Food?</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>✨</Text>
              <Text style={styles.featureText}>Akıllı öneriler</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>💰</Text>
              <Text style={styles.featureText}>Bütçe dostu</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>⚡</Text>
              <Text style={styles.featureText}>Hızlı sonuçlar</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    marginBottom: 35,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FF6B35',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    lineHeight: 24,
    fontWeight: '500',
  },
  heroArea: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#FF6B35',
    elevation: 5,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  heroEmoji: {
    fontSize: 70,
  },
  optionsContainer: {
    gap: 16,
    marginBottom: 35,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 22,
    borderRadius: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  createButton: {
    backgroundColor: '#fff3e0',
    borderLeftWidth: 5,
    borderLeftColor: '#FF6B35',
  },
  moodButton: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 5,
    borderLeftColor: '#5A67D8',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 18,
  },
  optionEmoji: {
    fontSize: 44,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '750',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  optionDescription: {
    fontSize: 13,
    color: '#777',
    lineHeight: 19,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 26,
    color: '#FF6B35',
    marginLeft: 12,
    fontWeight: '800',
  },
  featuresSection: {
    marginTop: 30,
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '750',
    color: '#1a1a1a',
    marginBottom: 18,
    letterSpacing: -0.2,
  },
  featuresList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    backgroundColor: '#fafafa',
  },
  featureEmoji: {
    fontSize: 32,
  },
  featureText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default HomeScreen;
