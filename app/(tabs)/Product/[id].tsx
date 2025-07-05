import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useProductContext, Product } from '@/context/ProductContext';
import React, { useState } from 'react';

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Retrieve the product ID from the URL
  const { products, setProducts } = useProductContext(); // Access products and setProducts from the context

  const product = products.find((p) => p.id === id); // Find the product by ID

  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedProduct, setEditedProduct] = useState(product); // State to store edited product data

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }
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
  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete "${product.name}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            const updatedProducts = products.filter((p) => p.id !== id); // Remove the product from the list
            setProducts(updatedProducts); // Update the context
            router.push('/Home/welcomePage'); // Navigate back to the welcome page
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleSave = () => {
    if (!editedProduct || !editedProduct.name || !editedProduct.price || !editedProduct.stock || !editedProduct.category || !editedProduct.description) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
    const updatedProducts = products.map((p) =>
      p.id === id
        ? {
            id: editedProduct.id || p.id, // Ensure ID is preserved
            name: editedProduct.name,
            description: editedProduct.description,
            price: editedProduct.price,
            stock: editedProduct.stock,
            category: editedProduct.category,
            vendeurs: editedProduct.vendeurs || p.vendeurs, // Preserve vendeurs if not edited
            image: editedProduct.image || p.image, // Preserve image if not edited
            isActive: editedProduct.isActive !== undefined ? editedProduct.isActive : p.isActive, // Preserve isActive if not edited
          }
        : p
    );
  
    setProducts(updatedProducts); // Update the context
    setIsEditing(false); // Exit edit mode
    Alert.alert('Success', 'Product updated successfully');
  };
  const handleFieldChange = (field: keyof Product, value: string | number | boolean) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    } as Product)); // Ensure the updated object matches the Product type
  };
  return (
    <View style={styles.containerDetail}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {isEditing ? (
          <View>
            <Text style={styles.name}>
              Modify Product: {product.name}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editedProduct?.name || ''}
              onChangeText={(text) => handleFieldChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={editedProduct?.price?.toString() || ''}
              onChangeText={(text) => handleFieldChange('price', parseFloat(text))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Stock"
              value={editedProduct?.stock?.toString() || ''}
              onChangeText={(text) => handleFieldChange('stock', parseInt(text, 10))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={editedProduct?.category || ''}
              onChangeText={(text) => handleFieldChange('category', text)}
            />
            <TextInput
              style={styles.textarea}
              placeholder="Description"
              value={editedProduct?.description || ''}
              onChangeText={(text) => handleFieldChange('description', text)}
              multiline={true}
              textAlignVertical="top"
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Image
              source={
                product.image.startsWith('https')
                  ? { uri: product.image }
                  : require('../../../assets/images/null.png') // Use placeholder image if URL is invalid
              }
              style={styles.image}
            />
            <Text style={styles.name}>{product.name}</Text>

            <View style={styles.containerModification}>
              <TouchableOpacity
                style={styles.modify}
                onPress={() => setIsEditing(true)}
              >
                <Text>Modify</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.delete} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerPrice}>
              <Text style={styles.price}>
                <Text style={styles.titleDescription}>Price </Text>: {product.price} €
              </Text>
              <Text style={styles.description}>
                <Text style={styles.titleDescription}>Category</Text>: {product.category}
              </Text>
            </View>

            <View style={styles.containerDescription}>
              <Text style={styles.titleDescription}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>

            <TouchableOpacity
              style={styles.backToMenu}
              onPress={() => router.push(`/Home/welcomePage`)}
            >
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 40, flex: 1, marginTop: 80 },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20 },
  name: { fontSize: 30, fontWeight: 'bold', textAlign: 'center' },
  price: { fontSize: 18, color: '#007bff', marginVertical: 8 },
  description: { fontSize: 16, color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  textarea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
    height: 100,
  },
  saveButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerModification: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    padding: 10,
    marginTop: 10,
  },
  modify: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  delete: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f00',
  },
  deleteText: {
    color: '#fff',
  },
  containerDetail: {
    marginTop: 10,
    padding: 30,
  },

  backToMenu: {
    borderWidth: 1,
    borderBlockColor: '#000',
    padding: 10,
    margin: 20,
    backgroundColor: '#000',
    borderRadius: 8,
  },

  back: {
    textAlign: 'center',
    color: '#fff',
  },

  containerDescription: {
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    padding: 20,
    borderRadius: 8,
  },

  titleDescription: {
    textDecorationLine: 'underline',
    paddingBottom: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },

  containerPrice: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginVertical: 20,
    borderRadius: 8,
    textAlign: 'center',
  },

});