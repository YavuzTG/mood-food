import { Redirect } from 'expo-router';

export default function Index() {
  // .tsx uzantısını sildik, sadece dosya yolunu yazdık
  return <Redirect href="/screens/home" />; 
}