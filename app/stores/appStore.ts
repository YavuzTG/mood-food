import { create } from 'zustand';
import { Mood, Recipe, Restaurant, MenuItem } from '../types';

interface AppStore {
  selectedMood: Mood | null;
  budget: number;
  ingredients: string[];
  selectedChoice: 'order' | 'dineOut' | null;
  
  setSelectedMood: (mood: Mood | null) => void;
  setBudget: (budget: number) => void;
  addIngredient: (ingredient: string) => void;
  removeIngredient: (ingredient: string) => void;
  clearIngredients: () => void;
  setSelectedChoice: (choice: 'order' | 'dineOut' | null) => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  selectedMood: null,
  budget: 0,
  ingredients: [],
  selectedChoice: null,

  setSelectedMood: (mood) => set({ selectedMood: mood }),
  setBudget: (budget) => set({ budget }),
  
  addIngredient: (ingredient) =>
    set((state) => ({
      ingredients: [...new Set([...state.ingredients, ingredient])],
    })),

  removeIngredient: (ingredient) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i !== ingredient),
    })),

  clearIngredients: () => set({ ingredients: [] }),

  setSelectedChoice: (choice) => set({ selectedChoice: choice }),

  reset: () =>
    set({
      selectedMood: null,
      budget: 0,
      ingredients: [],
      selectedChoice: null,
    }),
}));
