import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Username: </Text>
      <Text style={styles.title}>Email:</Text>
      <CustomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff', marginTop:50, },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'left' },
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
