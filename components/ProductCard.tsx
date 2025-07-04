// components/ProductCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, name, price, image }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/Home/Product/${id}`)} // navigue avec l'id
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price} €</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    color: '#007bff',
    marginTop: 4,
  },
});
