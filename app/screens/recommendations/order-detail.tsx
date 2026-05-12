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

const OrderDetailScreen = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  const restaurant = RESTAURANTS.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Restoran bulunamadı</Text>
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

  const handleOrder = () => {
    Alert.alert(
      'Sipariş Başlatıldı!',
      `${restaurant.name} restoranından sipariş vermeyi başlatıyorsunuz. Menüyü seçebilirsiniz.`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Devam Et',
          onPress: () => {
            // Placeholder for order flow
            Alert.alert('Menü', 'Menü sayfası burada gösterilecek');
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

          {/* Quick Info */}
          <View style={styles.quickInfo}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Teslimat</Text>
              <Text style={styles.infoValue}>{restaurant.deliveryTime} dk</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Fiyat</Text>
              <Text style={styles.infoValue}>
                {restaurant.price === 'low' ? '💰' : restaurant.price === 'medium' ? '💰💰' : '💰💰💰'}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Min. Sipariş</Text>
              <Text style={styles.infoValue}>₺{restaurant.minOrder}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Hakkında</Text>
            <Text style={styles.description}>
              {restaurant.name}, {restaurant.cuisine} mutfağında uzmanlaşmış bir
              restorandır. {restaurant.environment === 'calm'
                ? 'Sakin ve huzurlu'
                : 'Sosyal ve eğlenceli'}{' '}
              bir ortamı ile bilinmektedir.
            </Text>
          </View>

          {/* Why Recommended */}
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationTitle}>
              🎯 Neden Önerildi?
            </Text>
            <Text style={styles.recommendation}>
              Bu restoran ruh haline uygun ortam ve yemekler sunmaktadır.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>🛵 Sipariş Ver</Text>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
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
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  recommendationContainer: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
    padding: 12,
    borderRadius: 10,
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
  orderButton: {
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
  orderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default OrderDetailScreen;
