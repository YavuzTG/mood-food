import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/app/stores/appStore';

const BudgetScreen = () => {
  const router = useRouter();
  const { budget, setBudget, selectedMood } = useAppStore();
  const [inputValue, setInputValue] = useState(budget.toString());

  const budgetPresets = [50, 100, 150, 200, 300];

  const handleBudgetSelect = (amount: number) => {
    setBudget(amount);
    setInputValue(amount.toString());
  };

  const handleCustomBudget = (value: string) => {
    const numValue = parseInt(value) || 0;
    setInputValue(value);
    setBudget(numValue);
  };

  const handleContinue = () => {
    if (budget > 0 && selectedMood) {
      router.push('/screens/choice');
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
          <Text style={styles.title}>Bütçen Ne Kadar?</Text>
          <Text style={styles.subtitle}>
            Önerilerinizi bu bütçeye göre sunacağız
          </Text>
        </View>

        {/* Budget Presets */}
        <View style={styles.presetsContainer}>
          <Text style={styles.presetsTitle}>Hızlı Seçim</Text>
          <View style={styles.presetButtons}>
            {budgetPresets.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.presetButton,
                  {
                    backgroundColor: budget === amount ? '#FF6B35' : '#fff',
                    borderColor: budget === amount ? '#FF6B35' : '#ddd',
                  },
                ]}
                onPress={() => handleBudgetSelect(amount)}
              >
                <Text
                  style={[
                    styles.presetButtonText,
                    { color: budget === amount ? '#fff' : '#333' },
                  ]}
                >
                  ₺{amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Budget */}
        <View style={styles.customBudgetContainer}>
          <Text style={styles.customBudgetTitle}>Özel Bütçe Gir</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₺</Text>
            <TextInput
              style={styles.input}
              placeholder="Miktarı giriniz"
              keyboardType="number-pad"
              value={inputValue}
              onChangeText={handleCustomBudget}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Info Box */}
        {budget > 0 && (
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Seçilen Bütçe: ₺{budget}</Text>
            <Text style={styles.infoText}>
              Bu bütçeye uygun yemek ve mekanlar gösterilecek.
            </Text>
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 İpuçları</Text>
          <Text style={styles.tipsText}>
            • Minimum: ₺50{'\n'}
            • Sipariş vermek için daha yüksek bütçe önerilir{'\n'}
            • Dışarıda yemek için esnektir
          </Text>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            { opacity: budget > 0 ? 1 : 0.5 },
          ]}
          onPress={handleContinue}
          disabled={budget <= 0}
        >
          <Text style={styles.buttonText}>Devam Et</Text>
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
    marginBottom: 30,
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
  presetsContainer: {
    marginBottom: 30,
  },
  presetsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  presetButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  presetButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 14,
    borderWidth: 2.5,
    alignItems: 'center',
    minWidth: '32%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  presetButtonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  customBudgetContainer: {
    marginBottom: 30,
  },
  customBudgetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
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
    color: '#555',
    lineHeight: 18,
  },
  tipsContainer: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 4,
    borderLeftColor: '#FFB74D',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  continueButton: {
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
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default BudgetScreen;
