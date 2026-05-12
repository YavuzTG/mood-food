import { Recipe, Restaurant, MenuItem, Mood } from '../types';
import { RECIPES, RESTAURANTS, MENU_ITEMS } from '../data/mockData';

export function getRecommendedRecipes(
  mood: Mood | null,
  ingredients: string[]
): { recipe: Recipe; score: number }[] {
  if (!mood) return [];

  return RECIPES.filter((recipe) => recipe.moods.includes(mood.id))
    .map((recipe) => {
      const moodMatch = recipe.moodScore;
      const ingredientMatch =
        (recipe.ingredients.filter((ing) =>
          ingredients.some((userIng) =>
            userIng.toLowerCase().includes(ing.toLowerCase())
          )
        ).length /
          recipe.ingredients.length) *
        100;

      const score = (moodMatch * 0.7 + ingredientMatch * 0.3);
      return { recipe, score };
    })
    .sort((a, b) => b.score - a.score);
}

export function getRecommendedRestaurants(
  mood: Mood | null,
  budget: number
): { restaurant: Restaurant; score: number }[] {
  if (!mood) return [];

  return RESTAURANTS.filter((restaurant) => {
    if (budget > 0) {
      const priceMultiplier =
        restaurant.price === 'low' ? 1 : restaurant.price === 'medium' ? 1.5 : 2;
      return budget >= restaurant.minOrder * priceMultiplier;
    }
    return true;
  })
    .filter((restaurant) => restaurant.moods.includes(mood.id))
    .map((restaurant) => ({
      restaurant,
      score: restaurant.moodScore,
    }))
    .sort((a, b) => b.score - a.score);
}

export function getRecommendedMenuItems(
  mood: Mood | null,
  budget: number,
  restaurantId?: string
): { item: MenuItem; score: number }[] {
  if (!mood) return [];

  return MENU_ITEMS.filter((item) => {
    if (restaurantId && item.restaurantId !== restaurantId) return false;
    if (budget > 0 && item.price > budget) return false;
    return item.moods.includes(mood.id);
  })
    .map((item) => ({
      item,
      score: item.moodScore,
    }))
    .sort((a, b) => b.score - a.score);
}

export function getMatchingIngredientsForRecipes(
  userIngredients: string[]
): { recipe: Recipe; matchPercentage: number }[] {
  return RECIPES.map((recipe) => {
    const matching = recipe.ingredients.filter((ing) =>
      userIngredients.some((userIng) =>
        userIng.toLowerCase().includes(ing.toLowerCase())
      )
    ).length;

    const matchPercentage = (matching / recipe.ingredients.length) * 100;
    return { recipe, matchPercentage };
  })
    .filter((r) => r.matchPercentage > 0)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
