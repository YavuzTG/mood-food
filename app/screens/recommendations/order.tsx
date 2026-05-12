import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/app/stores/appStore';
import { getRecommendedRestaurants, getRecommendedMenuItems } from '@/app/utils/recommendations';
import { RESTAURANTS } from '@/app/data/mockData';

const OrderScreen = () => {
  const router = useRouter();
  const { selectedMood, budget } = useAppStore();

  const recommendedRestaurants = getRecommendedRestaurants(selectedMood, budget);

  const handleSelectRestaurant = (restaurantId: string) => {
    router.push(`/screens/recommendations/order-detail?id=${restaurantId}`);
  };

  const handleHome = () => {
    router.push('/screens/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.title}>🛵 Sipariş Önerileri</Text>
          <Text style={styles.subtitle}>
            {selectedMood?.name} Ruh Haline Uygun Restoranlar
          </Text>
        </View>

        {/* Restaurants List */}
        <View style={styles.restaurantsContainer}>
          {recommendedRestaurants.length > 0 ? (
            recommendedRestaurants.map(({ restaurant, score }) => (
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
                  <View style={styles.ratingBadge}>
                    <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
                  </View>
                </View>
                <View style={styles.restaurantInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.restaurantName}>{restaurant.name}</Text>
                    <View style={styles.matchScore}>
                      <Text style={styles.matchScoreText}>{Math.round(score)}%</Text>
                    </View>
                  </View>
                  <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
                  <View style={styles.detailsRow}>
                    <Text style={styles.detail}>
                      💰 {restaurant.price === 'low' ? 'Düşük' : restaurant.price === 'medium' ? 'Orta' : 'Yüksek'}
                    </Text>
                    <Text style={styles.detail}>
                      🚗 {restaurant.deliveryTime}dk
                    </Text>
                  </View>
                  <View style={styles.environmentTag}>
                    <Text style={styles.environmentText}>
                      {restaurant.environment === 'calm'
                        ? '☕ Sakin'
                        : restaurant.environment === 'social'
                        ? '👥 Sosyal'
                        : restaurant.environment === 'vibrant'
                        ? '🎉 Canlı'
                        : '🛋️ Rahat'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
              <Text style={styles.emptyText}>
                Bütçenize uygun restoran bulunamadı. Lütfen bütçenizi artırınız.
              </Text>
            </View>
          )}
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 İpucu</Text>
          <Text style={styles.infoText}>
            Uyum yüzdesi yüksek olanlar, ruh haline daha uygun önerilerdir.
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
    gap: 15,
    marginBottom: 20,
  },
  restaurantCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
  },
  restaurantImage: {
    height: 180,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rating: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '600',
  },
  restaurantInfo: {
    padding: 15,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
  },
  matchScore: {
    backgroundColor: '#FFE5D9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  matchScoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B35',
  },
  cuisine: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
  },
  detail: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  environmentTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  environmentText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB74D',
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
    color: '#666',
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

export default OrderScreen;
