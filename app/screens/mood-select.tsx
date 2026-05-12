import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/app/stores/appStore';
import { MOODS } from '@/app/data/mockData';

const MoodSelectScreen = () => {
  const router = useRouter();
  const { selectedMood, setSelectedMood } = useAppStore();

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood);
  };

  const handleContinue = () => {
    if (selectedMood) {
      router.push('/screens/budget');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Nasıl Hissediyorsun?</Text>
          <Text style={styles.subtitle}>
            Ruh haline uygun yemek ve mekan önerileri alabilirsin
          </Text>
        </View>

        {/* Mood Grid */}
        <View style={styles.moodGrid}>
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodCard,
                {
                  backgroundColor: selectedMood?.id === mood.id ? mood.color : '#f5f5f5',
                  borderWidth: selectedMood?.id === mood.id ? 3 : 0,
                  borderColor: selectedMood?.id === mood.id ? '#333' : 'transparent',
                },
              ]}
              onPress={() => handleMoodSelect(mood)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodName}>{mood.name}</Text>
              <Text style={styles.moodDescription}>{mood.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Box */}
        {selectedMood && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Seçim Yapıldı: {selectedMood.name}</Text>
            <Text style={styles.infoText}>
              {selectedMood.description} - sana uygun seçenekler sunacağız.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { opacity: selectedMood ? 1 : 0.5 },
          ]}
          onPress={handleContinue}
          disabled={!selectedMood}
        >
          <Text style={styles.buttonText}>Devam Et</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAF0',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    marginBottom: 30,
  },
  backButton: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 30,
  },
  moodCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderWidth: 2.5,
  },
  moodEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  moodName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  moodDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default MoodSelectScreen;
