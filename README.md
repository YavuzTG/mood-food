# 🍽️ Mood Food - Ruh Haline Göre Yemek & Mekan Asistanı

**Mood Food**, kullanıcıların o anki ruh haline, bütçesine ve tercihlerine göre yemek, mekan ve tarif önerileri sunan akıllı bir mobil uygulama ve web platformudur.

## 🎯 Uygulamanın Amacı

Kullanıcıların **"Şu an bana ne iyi gelir?"** sorusuna cevap verebilen bir asistan olmak. Sadece yemek önermek değil, psikolojik durum göz önüne alınarak uygun yemek, mekan ve deneyim sunmak.

---

## ✨ Temel Özellikler

### 1. **Nasıl Hissediyorsun?** (Ana Özellik)
Kullanıcı ruh halini seçer:
- 😊 Mutlu → Sosyal mekanlar, eğlenceli restoranlar
- 😢 Mutsuz → Rahatlatıcı tarifler, sakin kafeler
- 😰 Stresli → Rahatlayan ortamlar, çorba ve ısıtıcı yemekler
- 😴 Yorgun → Enerji verici tarifler, hafif yemekler
- 😔 Depresif → Moral verici, besleyici seçenekler
- ⚡ Enerjik → Canlı ortamlar, sosyal mekanlar
- 🥱 Uykulu → Hafif, hazımsız olmayan yemekler

### 2. **Kendin Oluştur** (Tarif Bulma)
Kullanıcı elindeki malzemeleri girer:
- Tavuk, Makarna, Kaşar gibi malzemeleri seçer
- Sistem uygun tarifler gösterir (uyum yüzdesiyle)
- Her tarif için yapılış adımlarını ve süreyi gösterir
- Eksik malzemeleri gösterir

### 3. **Sipariş Ver**
- Ruh haline uygun restoranlar
- Teslimat süresi ve fiyat bilgisi
- Minimum sipariş tutarı

### 4. **Dışarıda Ye**
- Ortam önerileri: Sakin ☕, Sosyal 👥, Canlı 🎉, Rahat 🛋️
- Ruh haline uygun mekanlar
- Puan ve değerlendirmeler

---

## 🚀 Başlangıç

### Kurulum

```bash
cd mood-food
npm install
```

### Web'te Çalıştırma (Development)

```bash
npm run web
```

Tarayıcıda: `http://localhost:8081`

### Mobil'de Çalıştırma (Expo Go)

```bash
npm start
```

**Expo Go uygulamasında QR code taratınız**

### Web'e Deploy (Vercel)

```bash
npm install -g vercel
vercel deploy
```

---

## 📂 Proje Yapısı

```
app/
├── screens/
│   ├── home.tsx                        # Ana sayfa
│   ├── mood-select.tsx                 # Ruh hal seçimi
│   ├── budget.tsx                      # Bütçe girdisi
│   ├── choice.tsx                      # Sipariş ver / Dışarıda ye
│   ├── create-recipe.tsx               # Malzeme girişi
│   └── recommendations/
│       ├── order.tsx                   # Sipariş önerileri
│       ├── dine-out.tsx                # Dışarıda ye önerileri
│       ├── recipes.tsx                 # Tarif önerileri
│       ├── order-detail.tsx            # Restoran detayı
│       ├── dine-out-detail.tsx         # Mekan detayı
│       └── recipe-detail.tsx           # Tarif detayı
├── types/
│   └── index.ts                        # TypeScript interfaces
├── stores/
│   └── appStore.ts                     # Zustand state management
├── data/
│   └── mockData.ts                     # Mock data (Recipes, Restaurants)
├── utils/
│   └── recommendations.ts              # Recommendation algorithms
└── _layout.tsx                         # Root navigation
```

---

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: #FF6B35 (Turuncu) - CTA, önemli butonlar
- **Success**: #81C784 (Yeşil) - Başarı, uyumlu
- **Warning**: #FFB74D (Sarı) - Bilgi, uyarı
- **Background**: #FEFAF0 (Krem) - Ana arka plan

### Tipografi
- Başlıklar: 700 (bold)
- Normal metin: 400
- Küçük metinler: 300

---

## 🎯 Uygulama Akışı

### Senaryo: "Nasıl Hissediyorsun?"

```
Başlangıç → Ruh Hal Seçimi → Bütçe → Seçim (Sipariş/Dışarıda)
                                          ↓
                    ┌───────────────────┴────────────────────┐
                    ↓                                         ↓
            SIPARIŞ VER'İ SEÇ                    DIŞARIDA YE'Yİ SEÇ
            ┌─ Restoran Listesi                 ┌─ Mekan Listesi
            ├─ Minimum Sipariş                  ├─ Ortam Bilgisi
            └─ Teslimat Süresi                  └─ Puan & Değerlendirmeler
```

### Senaryo: "Kendin Oluştur"

```
Başlangıç → Malzeme Girdisi → Uygun Tarifler → Tarif Detayı → Pişirmeye Başla
```

---

## 💾 State Management

Zustand ile merkezi state:

```typescript
interface AppStore {
  selectedMood: Mood | null;
  budget: number;
  ingredients: string[];
  selectedChoice: 'order' | 'dineOut' | null;
}
```

---

## 🔧 Teknolojiler

- **React Native**: Cross-platform UI
- **Expo**: Development & deployment
- **Expo Router**: File-based routing
- **Zustand**: Lightweight state management
- **TypeScript**: Type safety
- **React Native Web**: Web support
- **Axios**: HTTP client

---

## 📊 Mock Data

Uygulamada çalışan örnek veriler:

- **7 Ruh Hali**: Mutlu, Mutsuz, Stresli, Yorgun, Depresif, Enerjik, Uykulu
- **4 Tarif**: Tavuk Makarnası, Rahat Çorbası, Enerji Kasesi, Hafif Salata
- **4 Restoran**: Sakin Kahve, Sosyal Bistro, Canlı Restoran, Rahat Mekan
- **15+ Popüler Malzeme**: Tavuk, Makarna, Pirinç, Balık vb.

---

## 🚀 Gelecek Özellikler

- [ ] Gerçek API entegrasyonu
- [ ] Konum tabanlı öneriler (Google Maps)
- [ ] Kullanıcı profili ve favoriler
- [ ] AI tabanlı tarif önerileri
- [ ] Alerjiler ve diyetler filtresi
- [ ] Push notifications
- [ ] Sosyal paylaşım
- [ ] Yapay zeka chatbot asistan

---

## 📝 Notlar

- Mock data kullanılmaktadır. Gerçek veri için API entegrasyonu yapılmalıdır.
- Web deployment için Vercel önerilir
- Mobile testing için Expo Go kullanınız

---

## 🎉 Keyifli Pişirmeler! 👨‍🍳

**Mood Food** ile ruh haline uygun yemek ve mekan bulunuz!
