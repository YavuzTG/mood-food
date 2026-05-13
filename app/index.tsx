import { Redirect } from 'expo-router';

export default function Index() {
  // Uygulama açılınca direkt senin ana ekranına yönlendirecek
  return <Redirect href="/screens/home.tsx" />; 
}