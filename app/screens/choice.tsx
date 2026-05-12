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
import { useAppStore } from '@/app/stores/appStore';

const ChoiceScreen = () => {
  const router = useRouter();
  const { selectedChoice, setSelectedChoice, selectedMood, budget } = useAppStore();

  const handleChoice = (choice: 'order' | 'dineOut') => {
    setSelectedChoice(choice);
    if (choice === 'order') {
      router.push('/screens/recommendations/order');
    } else {
      router.push('/screens/recommendations/dine-out');
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
          <Text style={styles.title}>Ne Yapmak İstiyorsun?</Text>
          <Text style={styles.subtitle}>
            Bütçen: ₺{budget} • Ruh Halin: {selectedMood?.name}
          </Text>
        </View>

        {/* Choice Cards */}
        <View style={styles.choicesContainer}>
          {/* Order Option */}
          <TouchableOpacity
            style={[styles.choiceCard, styles.orderCard]}
            onPress={() => handleChoice('order')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardEmoji}>🛵</Text>
              <Text style={styles.cardTitle}>Sipariş Ver</Text>
              <Text style={styles.cardDescription}>
                En yakın restoranlardan siparişin
              </Text>
            </View>
            <View style={styles.cardBenefits}>
              <Text style={styles.benefit}>✓ Hızlı teslimat</Text>
              <Text style={styles.benefit}>✓ Çeşitli seçenekler</Text>
              <Text style={styles.benefit}>✓ Menü inceleyebilirsin</Text>
            </View>
          </TouchableOpacity>

          {/* Dine Out Option */}
          <TouchableOpacity
            style={[styles.choiceCard, styles.dineOutCard]}
            onPress={() => handleChoice('dineOut')}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardEmoji}>🍽️</Text>
              <Text style={styles.cardTitle}>Dışarıda Ye</Text>
              <Text style={styles.cardDescription}>
                Yakındaki restoran ve kafe önerileri
              </Text>
            </View>
            <View style={styles.cardBenefits}>
              <Text style={styles.benefit}>✓ Ortam önerileri</Text>
              <Text style={styles.benefit}>✓ Yakın mekanlar</Text>
              <Text style={styles.benefit}>✓ Deneyim paylaşımları</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Fark Nedir?</Text>
          <View style={styles.comparisonBox}>
            <Text style={styles.comparisonText}>
              <Text style={{ fontWeight: '700' }}>Sipariş Ver:</Text>
              {'\n'}Evinde rahat bekle, sıcak yemeğin kapında olsun.{'\n\n'}
              <Text style={{ fontWeight: '700' }}>Dışarıda Ye:</Text>
              {'\n'}Harika ortamlara çık, sosyalleş, keyfini çıkar.
            </Text>
          </View>
        </View>
      </ScrollView>
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
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  choicesContainer: {
    gap: 16,
    marginBottom: 30,
  },
  choiceCard: {
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    borderLeftWidth: 6,
  },
  orderCard: {
    backgroundColor: '#FFE5D9',
    borderLeftWidth: 5,
    borderLeftColor: '#FF6B35',
  },
  dineOutCard: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 5,
    borderLeftColor: '#81C784',
  },
  cardContent: {
    marginBottom: 16,
  },
  cardEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardBenefits: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    padding: 12,
    borderRadius: 10,
  },
  benefit: {
    fontSize: 12,
    color: '#333',
    marginVertical: 4,
    fontWeight: '500',
  },
  infoSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  comparisonBox: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB74D',
    padding: 15,
    borderRadius: 10,
  },
  comparisonText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 22,
  },
});

export default ChoiceScreen;
