import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function RootIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/screens/home');
  }, [router]);

  return null;
}
