import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Keyboard , TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Product, useProductContext } from '@/context/ProductContext';
import CustomNavbar from '@/components/Navbar';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- Import AsyncStorage

export default function HomeScreen() {
  const router = useRouter();
  const { products } = useProductContext();
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('All');
  const [open, setOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [items, setItems] = useState([
    { label: 'All', value: 'All' },
    { label: 'football', value: 'football' },
    { label: 'basketball', value: 'basketball' },
    { label: 'volleyball', value: 'volleyball' },
    { label: 'tennis', value: 'tennis' },
    { label: 'golf', value: 'golf' },
  ]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) {
          router.replace('/');
        }
      } catch (error) {
        // En cas d'erreur, on peut aussi rediriger
        router.replace('/');
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsNavbarVisible(false);
    });
  
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsNavbarVisible(true);
    });
  
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedValue === 'All' || p.category === selectedValue)
  );

  const renderItem = ({ item }: { item: Product }) => {
    const imageSource = item.image.startsWith('https') ? { uri: item.image } : require('../../../assets/images/null.png'); // Use nullImage if the URL is invalid
  
    return (
      <TouchableOpacity style={styles.card} onPress={() => router.push(`/Product/${item.id}`)}>
        <Image source={imageSource} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price} €</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Product Catalog</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.search}
              placeholder="Search Product ..."
              value={search}
              onChangeText={setSearch}
            />
            <DropDownPicker
              open={open}
              value={selectedValue}
              items={items}
              setOpen={setOpen}
              setValue={setSelectedValue}
              setItems={setItems}
              style={styles.select}
              placeholder="All Categories"
            />
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 120 }} // important pour scroll + navbar
            showsVerticalScrollIndicator={false}
          />
        </View>

        {isNavbarVisible && <CustomNavbar />}
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', position: 'relative' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', padding: 40 },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    width: '50%',
    paddingHorizontal: 16,
    paddingVertical: 15,
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
  cardContent: { flex: 1, padding: 10, height: 100 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { color: '#007bff', marginTop: 4 },
  select: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    outline: 'none',
    width: '50%',
    height: 50,
    color: '#000',
    borderRadius: 8,
    fontSize: 12,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
    gap: 10,
    marginLeft: 80,
    paddingHorizontal: 10,
  },
});