export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: string;
  ingredients: string[];
  steps: string[];
  prepTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  moods: string[]; // mood IDs
  moodScore: number; // 0-100
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  price: 'low' | 'medium' | 'high';
  moods: string[]; // mood IDs
  moodScore: number; // 0-100
  environment: 'calm' | 'social' | 'vibrant' | 'cozy';
  minOrder?: number;
  deliveryTime?: number; // in minutes
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  restaurantId: string;
  moods: string[]; // mood IDs
  moodScore: number; // 0-100
}

export interface AppState {
  selectedMood: Mood | null;
  budget: number;
  ingredients: string[];
  recommendations: Recommendation[];
}

export interface Recommendation {
  id: string;
  type: 'recipe' | 'restaurant' | 'menuItem';
  item: Recipe | Restaurant | MenuItem;
  matchScore: number; // 0-100
  reason: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
}
