import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/app/stores/appStore';
import { COMMON_INGREDIENTS } from '@/app/data/mockData';
import { getMatchingIngredientsForRecipes } from '@/app/utils/recommendations';

const CreateRecipeScreen = () => {
  const router = useRouter();
  const { ingredients, addIngredient, removeIngredient, clearIngredients } =
    useAppStore();
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState(COMMON_INGREDIENTS);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = COMMON_INGREDIENTS.filter((ing) =>
      ing.toLowerCase().includes(text.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleAddIngredient = (ingredient: string) => {
    if (!ingredients.includes(ingredient)) {
      addIngredient(ingredient);
    }
    setSearchText('');
    setSuggestions(COMMON_INGREDIENTS);
  };

  const handleFindRecipes = () => {
    if (ingredients.length > 0) {
      router.push('/screens/recommendations/recipes');
    }
  };

  const matchedRecipes = getMatchingIngredientsForRecipes(ingredients);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Geri</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Malzemeleri Gir</Text>
          <Text style={styles.subtitle}>
            Elindeki malzemeleri seç, uygun tarifleri bulunuz
          </Text>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Malzeme ara..."
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>

        {/* Suggestions */}
        {searchText && suggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>Öneriler</Text>
            <View style={styles.suggestionsList}>
              {suggestions.slice(0, 5).map((ingredient) => (
                <TouchableOpacity
                  key={ingredient}
                  style={styles.suggestionItem}
                  onPress={() => handleAddIngredient(ingredient)}
                >
                  <Text style={styles.suggestionText}>{ingredient}</Text>
                  <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Selected Ingredients */}
        {ingredients.length > 0 && (
          <View style={styles.selectedContainer}>
            <View style={styles.selectedHeader}>
              <Text style={styles.selectedTitle}>
                Seçilen Malzemeler ({ingredients.length})
              </Text>
              <TouchableOpacity onPress={clearIngredients}>
                <Text style={styles.clearButton}>Temizle</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ingredientsList}>
              {ingredients.map((ingredient) => (
                <View key={ingredient} style={styles.ingredientTag}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                  <TouchableOpacity
                    onPress={() => removeIngredient(ingredient)}
                  >
                    <Text style={styles.removeButton}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Matching Recipes */}
            {matchedRecipes.length > 0 && (
              <View style={styles.matchingContainer}>
                <Text style={styles.matchingTitle}>
                  Uygun Tarifler ({matchedRecipes.length})
                </Text>
                <View style={styles.matchingList}>
                  {matchedRecipes.slice(0, 3).map((match) => (
                    <View key={match.recipe.id} style={styles.recipeCard}>
                      <View style={styles.recipeInfo}>
                        <Text style={styles.recipeName}>
                          {match.recipe.name}
                        </Text>
                        <Text style={styles.recipeMatch}>
                          {Math.round(match.matchPercentage)}% uyumlu
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.matchPercentage,
                          {
                            backgroundColor:
                              match.matchPercentage > 70
                                ? '#81C784'
                                : match.matchPercentage > 40
                                ? '#FFB74D'
                                : '#FF6B35',
                          },
                        ]}
                      >
                        <Text style={styles.percentText}>
                          {Math.round(match.matchPercentage)}%
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Quick Add Buttons */}
        <View style={styles.quickAddContainer}>
          <Text style={styles.quickAddTitle}>Popüler Malzemeler</Text>
          <View style={styles.quickAddButtons}>
            {['Tavuk', 'Makarna', 'Pirinç', 'Balık'].map((ingredient) => (
              <TouchableOpacity
                key={ingredient}
                style={[
                  styles.quickAddButton,
                  ingredients.includes(ingredient) && styles.quickAddButtonActive,
                ]}
                onPress={() =>
                  ingredients.includes(ingredient)
                    ? removeIngredient(ingredient)
                    : addIngredient(ingredient)
                }
              >
                <Text
                  style={[
                    styles.quickAddButtonText,
                    ingredients.includes(ingredient) &&
                      styles.quickAddButtonTextActive,
                  ]}
                >
                  {ingredient}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Find Recipes Button */}
      {ingredients.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.findButton}
            onPress={handleFindRecipes}
          >
            <Text style={styles.findButtonText}>
              Tarifleri Bulunuz ({ingredients.length} malzeme)
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  suggestionsContainer: {
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
  },
  suggestionsList: {
    gap: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 10,
    borderRadius: 8,
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  addIcon: {
    fontSize: 18,
    color: '#FF6B35',
    fontWeight: '700',
  },
  selectedContainer: {
    marginBottom: 25,
  },
  selectedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  clearButton: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
  },
  ingredientsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  ingredientTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  ingredientText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  removeButton: {
    fontSize: 18,
    color: '#81C784',
    fontWeight: 'bold',
  },
  matchingContainer: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
  },
  matchingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  matchingList: {
    gap: 10,
  },
  recipeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  recipeMatch: {
    fontSize: 11,
    color: '#666',
  },
  matchPercentage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  quickAddContainer: {
    marginBottom: 30,
  },
  quickAddTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  quickAddButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickAddButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
    backgroundColor: '#fff',
  },
  quickAddButtonActive: {
    backgroundColor: '#FF6B35',
  },
  quickAddButtonText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  quickAddButtonTextActive: {
    color: '#fff',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  findButton: {
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
  findButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default CreateRecipeScreen;
