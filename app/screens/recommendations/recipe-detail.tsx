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
import { RECIPES } from '@/app/data/mockData';

const RecipeDetailScreen = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  const recipe = RECIPES.find((r) => r.id === id);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Tarif bulunamadı</Text>
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

  const handleCookIt = () => {
    Alert.alert(
      'Pişirmeye Başlayın!',
      `${recipe.name} pişirmeye hazırsınız. Lezzet geçirmeler! 👨‍🍳`,
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Başla',
          onPress: () => {
            Alert.alert(
              'Başarılı!',
              'Mutlu pişirmeler! Tarifin tadını çıkar. 🍽️'
            );
          },
        },
      ]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { bg: '#E8F5E9', text: '#2E7D32', label: 'Kolay' };
      case 'medium':
        return { bg: '#FFF3E0', text: '#E65100', label: 'Orta' };
      case 'hard':
        return { bg: '#FFEBEE', text: '#C62828', label: 'Zor' };
      default:
        return { bg: '#f5f5f5', text: '#666', label: 'Bilinmeyen' };
    }
  };

  const diffColor = getDifficultyColor(recipe.difficulty);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Geri</Text>
        </TouchableOpacity>

        {/* Recipe Image */}
        <Image source={{ uri: recipe.image }} style={styles.image} />

        {/* Recipe Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.recipeName}>{recipe.name}</Text>

          {/* Quick Stats */}
          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Süre</Text>
              <Text style={styles.statValue}>⏱️ {recipe.prepTime} dk</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Zorluk</Text>
              <View
                style={[styles.difficultyBadge, { backgroundColor: diffColor.bg }]}
              >
                <Text style={[styles.difficultyText, { color: diffColor.text }]}>
                  {diffColor.label}
                </Text>
              </View>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Uygunluk</Text>
              <Text style={styles.moodScore}>🎯 {recipe.moodScore}%</Text>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Malzemeler</Text>
            <View style={styles.ingredientsList}>
              {recipe.ingredients.map((ingredient, idx) => (
                <View key={idx} style={styles.ingredientItem}>
                  <Text style={styles.ingredientBullet}>•</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Steps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👨‍🍳 Yapılış Adımları</Text>
            <View style={styles.stepsList}>
              {recipe.steps.map((step, idx) => (
                <View key={idx} style={styles.stepItem}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.stepText}>{step}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tips */}
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 İpuçları</Text>
            <Text style={styles.tipsText}>
              • Tüm malzemeleri önceden hazırlayınız{'\n'}
              • Adımları sırasıyla izleyiniz{'\n'}
              • Pişirme süresi tarifin türüne göre değişebilir{'\n'}
              • Sıcak sunmak daha lezzetli olacaktır
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Cook Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cookButton} onPress={handleCookIt}>
          <Text style={styles.cookButtonText}>👨‍🍳 Pişirmeye Başla</Text>
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
  recipeName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6B35',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700',
  },
  moodScore: {
    fontSize: 13,
    fontWeight: '700',
    color: '#81C784',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  ingredientsList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  ingredientBullet: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '700',
    marginRight: 10,
    marginTop: 2,
  },
  ingredientText: {
    fontSize: 13,
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  stepNumberText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  tipsContainer: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB74D',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 6,
  },
  tipsText: {
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
  cookButton: {
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
  cookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default RecipeDetailScreen;
