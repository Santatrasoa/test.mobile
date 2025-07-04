import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import productsData from '../../../data/products.json';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  vendeurs: string;
  image: string;
  isActive: boolean;
};

export default function HomeScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  // useEffect(() => {
  //   setProducts(productsData);
  // }, []);

  // const filteredProducts = products.filter((p) =>
  //   p.name.toLowerCase().includes(search.toLowerCase())
  // );

  // const renderItem = ({ item }: { item: Product }) => (
  //   <TouchableOpacity style={styles.card} onPress={() => router.push(`/`)}>
  //     <Image source={{ uri: item.image }} style={styles.image} />
  //     <View style={styles.cardContent}>
  //       <Text style={styles.name}>{item.name}</Text>
  //       <Text style={styles.price}>{item.price} €</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Catalogue de produits</Text>

      <TextInput
        style={styles.search}
        placeholder="Rechercher un produit..."
        value={search}
        onChangeText={setSearch}
      />
{/* 
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      /> */}

      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/')}>
        <Text style={styles.addButtonText}>+ Ajouter un produit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  list: { paddingBottom: 80 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: { width: 80, height: 80 },
  cardContent: { flex: 1, padding: 10 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { color: '#007bff', marginTop: 4 },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 30,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
