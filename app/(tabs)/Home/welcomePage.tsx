import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker'; // Installe ceci avec npm/yarn
import productsData from '../../../data/products.json';
import CustomNavbar from '@/components/Navbar';

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
  const [selectedValue, setSelectedValue] = useState('')

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/`)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>product catalog</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Search Product ..."
          value={search}
          onChangeText={setSearch}
        /> 

        <Picker
          selectedValue={selectedValue}
          style={styles.select}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="All" value="All" />
          <Picker.Item label="football" value="football" />
          <Picker.Item label="basketball" value="basketball" />
          <Picker.Item label="volleyball" value="volleyball" />
        </Picker>

      </View>
 
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <CustomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', padding:40 },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    width:'50%',
    height:40,
    paddingHorizontal: 16,
  },
  list: { paddingBottom: 80 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  image: { width: 100, height: 100 },
  cardContent: { flex: 1, padding: 10, height:100},
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
  select: {
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 3,
    borderColor: '#000',
    outline: 'none',
    width:'40%',
    height: 50,
    color: '#000',
    borderRadius:8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    width:'100%',
    gap: 30,
  }
});
