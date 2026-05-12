import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/screens/home');
  }, [router]);

  return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
}
