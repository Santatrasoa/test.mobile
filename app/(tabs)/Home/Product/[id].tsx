import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet } from 'react-native';
import products from '../../../../data/products.json';

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams(); // récupère l'id depuis l'URL

  const product = products.find((p) => p.id === id); // cherche le produit

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} €</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20 },
  name: { fontSize: 22, fontWeight: 'bold' },
  price: { fontSize: 18, color: '#007bff', marginVertical: 8 },
  description: { fontSize: 16, color: '#333' },
});
