import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import { RESTAURANTS } from '@/app/data/mockData';

const DineOutDetailScreen = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  const restaurant = RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Mekan bulunamadı</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const getEnvironmentInfo = (env: string) => {
    const envMap: { [key: string]: { emoji: string; name: string; description: string } } = {
      calm: {
        emoji: '☕',
        name: 'Sakin',
        description: 'Huzurlu ve rahatlatıcı ortam. Dinlenmek ve konuşmak için ideal.',
      },
      social: {
        emoji: '👥',
        name: 'Sosyal',
        description: 'Arkadaşlarla buluşmak ve sosyalleşmek için mükemmel.',
      },
      vibrant: {
        emoji: '🎉',
        name: 'Canlı',
        description: 'Enerjik ve eğlenceli ortam. Keyif çıkarmak isteyenler için.',
      },
      cozy: {
        emoji: '🛋️',
        name: 'Rahat',
        description: 'Uygun ve confortlu bir ortam. Ailece zaman geçirmek için harika.',
      },
    };
    return envMap[env] || { emoji: '✨', name: 'Harika', description: 'Mükemmel bir mekan' };
  };

  const envInfo = getEnvironmentInfo(restaurant.environment);

  const handleVisit = () => {
    Alert.alert(
      'Ziyarete Hazırlanıyor',
      `${restaurant.name} restoranına gitmek üzere hazırlanıyorsunuz. Harika bir deneyim geçireceksiniz!`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Devam Et',
          onPress: () => {
            Alert.alert(
              'Başarılı!',
              'Harika bir deneyim geçirmek dileğiyle. Keyfini çıkar! 🎉'
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Geri</Text>
        </TouchableOpacity>

        {/* Restaurant Image */}
        <Image source={{ uri: restaurant.image }} style={styles.image} />

        {/* Restaurant Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
            <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
          </View>

          {/* Environment Info */}
          <View style={styles.environmentBox}>
            <Text style={styles.environmentEmoji}>{envInfo.emoji}</Text>
            <View style={styles.environmentTextContainer}>
              <Text style={styles.environmentName}>{envInfo.name} Ortam</Text>
              <Text style={styles.environmentDescription}>
                {envInfo.description}
              </Text>
            </View>
          </View>

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Mutfak</Text>
              <Text style={styles.infoValue}>{restaurant.cuisine}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Fiyat</Text>
              <Text style={styles.infoValue}>
                {restaurant.price === 'low'
                  ? 'Düşük'
                  : restaurant.price === 'medium'
                  ? 'Orta'
                  : 'Yüksek'}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Puan</Text>
              <Text style={styles.infoValue}>{restaurant.rating}/5</Text>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Özellikler</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureEmoji}>🍽️</Text>
                <Text style={styles.featureText}>Çeşitli Menü</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureEmoji}>🎵</Text>
                <Text style={styles.featureText}>Müzik</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureEmoji}>👨‍🍳</Text>
                <Text style={styles.featureText}>Deneyimli Şefler</Text>
              </View>
            </View>
          </View>

          {/* Why Recommended */}
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationTitle}>
              🎯 Neden Önerildi?
            </Text>
            <Text style={styles.recommendation}>
              {restaurant.environment === 'calm'
                ? 'Stresli zamanlarınızda rahatlayacağınız, huzurlu bir ortamıdır.'
                : restaurant.environment === 'social'
                ? 'Mutlu olduğunuzda sosyal geçmek için mükemmel bir mekanıdır.'
                : restaurant.environment === 'vibrant'
                ? 'Enerjik zamanlarınız için canlı ve eğlenceli bir ortamıdır.'
                : 'Rahat ve uygun ortamıyla yorgun olduğunuzda ideal bir seçimdir.'}
            </Text>
          </View>

          {/* Suggestions */}
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>💡 İpuçları</Text>
            <Text style={styles.suggestion}>
              • Rezervasyon yapmayı düşünmeyin{'\n'}
              • Mutlaka menüyü göz atınız{'\n'}
              • Ortamın tadını çıkarınız
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Visit Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.visitButton} onPress={handleVisit}>
          <Text style={styles.visitButtonText}>🎉 Ziyarete Git</Text>
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
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 15,
  },
  rating: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  cuisine: {
    fontSize: 14,
    color: '#666',
  },
  environmentBox: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
    padding: 12,
    borderRadius: 10,
    gap: 12,
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  environmentEmoji: {
    fontSize: 28,
  },
  environmentTextContainer: {
    flex: 1,
  },
  environmentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 3,
  },
  environmentDescription: {
    fontSize: 12,
    color: '#555',
    lineHeight: 16,
  },
  quickInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  featuresList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  featureItem: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  featureEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  recommendationContainer: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  recommendationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 6,
  },
  recommendation: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  suggestionsContainer: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB74D',
    padding: 12,
    borderRadius: 10,
  },
  suggestionsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 6,
  },
  suggestion: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  visitButton: {
    backgroundColor: '#81C784',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  visitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default DineOutDetailScreen;
