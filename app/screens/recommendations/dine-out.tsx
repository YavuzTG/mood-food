import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/app/stores/appStore';
import { getRecommendedRestaurants } from '@/app/utils/recommendations';

const DineOutScreen = () => {
  const router = useRouter();
  const { selectedMood, budget } = useAppStore();

  const recommendedRestaurants = getRecommendedRestaurants(selectedMood, budget);

  const handleSelectRestaurant = (restaurantId: string) => {
    router.push(`/screens/recommendations/dine-out-detail?id=${restaurantId}`);
  };

  const handleHome = () => {
    router.push('/screens/home');
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'calm':
        return { bg: '#E3F2FD', text: '#1565C0', emoji: '☕' };
      case 'social':
        return { bg: '#F3E5F5', text: '#6A1B9A', emoji: '👥' };
      case 'vibrant':
        return { bg: '#FFF3E0', text: '#E65100', emoji: '🎉' };
      case 'cozy':
        return { bg: '#E8F5E9', text: '#2E7D32', emoji: '🛋️' };
      default:
        return { bg: '#f5f5f5', text: '#666', emoji: '✨' };
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
          <Text style={styles.title}>🍽️ Dışarıda Ye</Text>
          <Text style={styles.subtitle}>
            {selectedMood?.name} Ruh Haline Uygun Ortamlar
          </Text>
        </View>

        {/* Restaurants List */}
        <View style={styles.restaurantsContainer}>
          {recommendedRestaurants.length > 0 ? (
            recommendedRestaurants.map(({ restaurant, score }) => {
              const envColor = getEnvironmentColor(restaurant.environment);
              return (
                <TouchableOpacity
                  key={restaurant.id}
                  style={styles.restaurantCard}
                  onPress={() => handleSelectRestaurant(restaurant.id)}
                >
                  <View style={styles.restaurantImage}>
                    <Image
                      source={{ uri: restaurant.image }}
                      style={styles.image}
                    />
                    <View style={styles.overlay}>
                      <View style={styles.overlayContent}>
                        <Text style={styles.overlayTitle}>{restaurant.name}</Text>
                        <View style={[styles.environmentBadge, { backgroundColor: envColor.bg }]}>
                          <Text style={[styles.environmentBadgeText, { color: envColor.text }]}>
                            {envColor.emoji} {getEnvironmentName(restaurant.environment)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.restaurantDetails}>
                    <View style={styles.detailsTop}>
                      <View>
                        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
                        <Text style={styles.rating}>⭐ {restaurant.rating} (Harika)</Text>
                      </View>
                      <View style={styles.scoreCircle}>
                        <Text style={styles.scoreText}>{Math.round(score)}%</Text>
                      </View>
                    </View>

                    <View style={styles.features}>
                      <View style={styles.feature}>
                        <Text style={styles.featureEmoji}>💰</Text>
                        <Text style={styles.featureText}>
                          {restaurant.price === 'low'
                            ? 'Uygun'
                            : restaurant.price === 'medium'
                            ? 'Orta'
                            : 'Lüks'}
                        </Text>
                      </View>
                      <View style={styles.feature}>
                        <Text style={styles.featureEmoji}>👥</Text>
                        <Text style={styles.featureText}>Sosyal</Text>
                      </View>
                      <View style={styles.feature}>
                        <Text style={styles.featureEmoji}>✨</Text>
                        <Text style={styles.featureText}>
                          {restaurant.environment === 'calm'
                            ? 'Sakin'
                            : restaurant.environment === 'vibrant'
                            ? 'Eğlenceli'
                            : 'Keyifli'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.description}>
                      {getMoodDescription(selectedMood?.id, restaurant.environment)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
              <Text style={styles.emptyText}>
                Ruh haline uygun mekan bulunamadı. Başka bir seçim yapabileceğiniz.
              </Text>
            </View>
          )}
        </View>

        {/* Mood Info */}
        <View style={styles.moodInfoBox}>
          <Text style={styles.moodInfoTitle}>
            {selectedMood?.emoji} {selectedMood?.name} için önerimiz
          </Text>
          <Text style={styles.moodInfoText}>
            {getMoodAdvice(selectedMood?.id)}
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
          <Text style={styles.homeButtonText}>← Ana Sayfaya Dön</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getEnvironmentName = (env: string) => {
  switch (env) {
    case 'calm':
      return 'Sakin';
    case 'social':
      return 'Sosyal';
    case 'vibrant':
      return 'Canlı';
    case 'cozy':
      return 'Rahat';
    default:
      return 'Harika';
  }
};

const getMoodDescription = (moodId: string | undefined, env: string) => {
  const descriptions: { [key: string]: { [key: string]: string } } = {
    happy: {
      social: 'Neşeli ve eğlenceli bir ortamda sosyalleş, keyfi bol geç!',
      vibrant: 'Enerjik ve canlı bir mekanda mutluluğunu kutla!',
      calm: 'İdeal bir ortamda güzel anılar oluştur.',
      cozy: 'Rahat ortamda sevinçli zamanlar geçir.',
    },
    sad: {
      calm: 'Sakin bir ortamda kendine iyi bak, rahatlayan bir mekan seç.',
      cozy: 'Rahat bir köşede vaktini geçir, moral verici yemekler ye.',
      social: 'İyi arkadaşlarla zaman geçir, sosyalleş.',
      vibrant: 'Biraz eğlence seni iyi yapabilir.',
    },
    stressed: {
      calm: 'Stres almayan sakin bir mekan, rahatlamak için ideal.',
      cozy: 'Rahat ortamda rahatlayacaksın, keyfini çıkar.',
      social: 'Arkadaşlarla olmak seni rahatlatabilir.',
      vibrant: 'Biraz dikkati dağıt, eğlence bul.',
    },
    tired: {
      calm: 'Dinlendirici sakin bir ortamda istirahat et.',
      cozy: 'Rahat bir mekan, yorgunluğu atabilirsin.',
      social: 'Hafif sosyalleşme sana iyi gelebilir.',
      vibrant: 'Enerji almak için enerjik ortama git.',
    },
    depressed: {
      cozy: 'Rahat bir ortamda kendine iyi bak.',
      calm: 'Huzurlu bir mekanda vakit geçir.',
      social: 'Sevdiklerinle zaman geçir, destek al.',
      vibrant: 'Biraz eğlence ve enerji kazanabilirsin.',
    },
    energetic: {
      vibrant: 'Enerjiye harika, canlı bir mekan tam sana!',
      social: 'Sosyal ve eğlenceli ortamlarda parti yap!',
      calm: 'Rahat düşün ve planla enerji için.',
      cozy: 'Kısa bir ara ver, dinlen.',
    },
    sleepy: {
      calm: 'Sakin bir ortamda hafif enerji al.',
      cozy: 'Rahat bir mekan, rahatlayabilirsin.',
      social: 'Hafif sosyalleşme seni uyandırabilir.',
      vibrant: 'Enerji almak için canlı bir mekan dene.',
    },
  };

  return (
    descriptions[moodId || '']?.[env] ||
    'Muhteşem bir deneyim yaşa!'
  );
};

const getMoodAdvice = (moodId: string | undefined) => {
  const advice: { [key: string]: string } = {
    happy: '😊 Mutluluğunu paylaş ve keyfi bol geç!',
    sad: '😢 Kendine iyi bak, sevdiklerinle zaman geçir.',
    stressed: '😰 Rahatlayan bir ortamda stresten uzaklaş.',
    tired: '😴 Dinlendirici bir mekan seç, şarj et.',
    depressed: '😔 Destek almak önemli, iyi insanlarla ol.',
    energetic: '⚡ Enerjini sosyalleşerek paylaş!',
    sleepy: '🥱 Hafif enerji alacak bir mekan seç.',
  };

  return advice[moodId || ''] || 'Harika bir deneyim yaşa!';
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
    marginBottom: 25,
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
  restaurantsContainer: {
    gap: 20,
    marginBottom: 20,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  restaurantImage: {
    height: 200,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 15,
  },
  overlayContent: {
    gap: 8,
  },
  overlayTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  environmentBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  environmentBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  restaurantDetails: {
    padding: 15,
  },
  detailsTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cuisine: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  rating: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6B35',
  },
  features: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  feature: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  featureEmoji: {
    fontSize: 16,
  },
  featureText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '500',
  },
  description: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
  moodInfoBox: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  moodInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  moodInfoText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  homeButton: {
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6B35',
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
});

export default DineOutScreen;
