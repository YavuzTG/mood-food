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
import { getMatchingIngredientsForRecipes } from '@/app/utils/recommendations';

const RecipesScreen = () => {
  const router = useRouter();
  const { ingredients } = useAppStore();

  const matchedRecipes = getMatchingIngredientsForRecipes(ingredients);

  const handleSelectRecipe = (recipeId: string) => {
    router.push(`/screens/recommendations/recipe-detail?id=${recipeId}`);
  };

  const handleHome = () => {
    router.push('/screens/home');
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.title}>👨‍🍳 Uygun Tarifler</Text>
          <Text style={styles.subtitle}>
            {ingredients.length} malzemeye uygun {matchedRecipes.length} tarif bulundu
          </Text>
        </View>

        {/* Ingredients Summary */}
        <View style={styles.ingredientsSummary}>
          <Text style={styles.summaryTitle}>Seçilen Malzemeler:</Text>
          <View style={styles.ingredientsTagsList}>
            {ingredients.map((ingredient) => (
              <View key={ingredient} style={styles.ingredientTag}>
                <Text style={styles.ingredientTagText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recipes List */}
        <View style={styles.recipesContainer}>
          {matchedRecipes.length > 0 ? (
            matchedRecipes.map(({ recipe, matchPercentage }) => {
              const diffColor = getDifficultyColor(recipe.difficulty);
              return (
                <TouchableOpacity
                  key={recipe.id}
                  style={styles.recipeCard}
                  onPress={() => handleSelectRecipe(recipe.id)}
                >
                  <View style={styles.recipeImage}>
                    <Image
                      source={{ uri: recipe.image }}
                      style={styles.image}
                    />
                    <View style={styles.difficultyBadge}>
                      <View style={[styles.difficultyBadgeContent, { backgroundColor: diffColor.bg }]}>
                        <Text style={[styles.difficultyText, { color: diffColor.text }]}>
                          {diffColor.label}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.recipeInfo}>
                    <View style={styles.nameRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.recipeName}>{recipe.name}</Text>
                        <Text style={styles.prepTime}>⏱️ {recipe.prepTime} dakika</Text>
                      </View>
                      <View style={styles.matchPercentageCircle}>
                        <Text style={styles.percentageText}>
                          {Math.round(matchPercentage)}%
                        </Text>
                      </View>
                    </View>

                    {/* Ingredients Used */}
                    <View style={styles.matchedIngredientsContainer}>
                      <Text style={styles.matchedIngredientsTitle}>Uygun Malzemelerin:</Text>
                      <View style={styles.matchedIngredientsList}>
                        {recipe.ingredients
                          .filter((ing) =>
                            ingredients.some((userIng) =>
                              userIng.toLowerCase().includes(ing.toLowerCase())
                            )
                          )
                          .slice(0, 3)
                          .map((ingredient, idx) => (
                            <Text
                              key={idx}
                              style={styles.matchedIngredient}
                            >
                              ✓ {ingredient}
                            </Text>
                          ))}
                      </View>
                    </View>

                    {/* Missing Ingredients */}
                    {recipe.ingredients.filter(
                      (ing) =>
                        !ingredients.some((userIng) =>
                          userIng.toLowerCase().includes(ing.toLowerCase())
                        )
                    ).length > 0 && (
                      <View style={styles.missingIngredientsContainer}>
                        <Text style={styles.missingIngredientsTitle}>
                          Eksik Malzeme:
                        </Text>
                        <Text style={styles.missingCount}>
                          +{recipe.ingredients.filter(
                            (ing) =>
                              !ingredients.some((userIng) =>
                                userIng.toLowerCase().includes(ing.toLowerCase())
                              )
                          ).length} malzeme gerekli
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🔍</Text>
              <Text style={styles.emptyTitle}>Sonuç Bulunamadı</Text>
              <Text style={styles.emptyText}>
                Seçilen malzemelere uygun tarif bulunamadı. Daha fazla malzeme ekleyin.
              </Text>
            </View>
          )}
        </View>

        {/* Tips */}
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💡 İpuçları</Text>
          <Text style={styles.tipsText}>
            • Uyum yüzdesi yüksek olan tarifler tüm veya çoğu malzemeyi içerir{'\n'}
            • Eksik malzemeleri alabilir veya yerine koymayı deneyebilirsiniz{'\n'}
            • Her tarifi görmek için tıklayınız
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
  ingredientsSummary: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
  },
  ingredientsTagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  ingredientTag: {
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ingredientTagText: {
    fontSize: 11,
    color: '#1B5E20',
    fontWeight: '600',
  },
  recipesContainer: {
    gap: 15,
    marginBottom: 20,
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
  },
  recipeImage: {
    height: 160,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  difficultyBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  difficultyBadgeContent: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '700',
  },
  recipeInfo: {
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  prepTime: {
    fontSize: 12,
    color: '#666',
  },
  matchPercentageCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFE5D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B35',
  },
  matchedIngredientsContainer: {
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  matchedIngredientsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  matchedIngredientsList: {
    gap: 3,
  },
  matchedIngredient: {
    fontSize: 11,
    color: '#1B5E20',
    fontWeight: '500',
  },
  missingIngredientsContainer: {
    backgroundColor: '#FFF3E0',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missingIngredientsTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E65100',
  },
  missingCount: {
    fontSize: 11,
    color: '#E65100',
    fontWeight: '600',
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
  tipsBox: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB74D',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 6,
  },
  tipsText: {
    fontSize: 11,
    color: '#666',
    lineHeight: 16,
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

export default RecipesScreen;
