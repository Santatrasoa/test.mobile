import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, FlatList, Alert } from 'react-native';
import CustomNavbar from '@/components/Navbar';
import DropDownPicker from 'react-native-dropdown-picker';
import { useProductContext } from '@/context/ProductContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- Import AsyncStorage
import { useRouter } from 'expo-router';

export default function AddProduct() {
    const { products, setProducts } = useProductContext(); // Access products and setProducts from context
    const [selectedValue, setSelectedValue] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [productName, setProductName] = useState('');
    const [open, setOpen] = useState(false); // State for dropdown visibility
    const [items, setItems] = useState([
        { label: 'football', value: 'football' },
        { label: 'basketball', value: 'basketball' },
        { label: 'volleyball', value: 'volleyball' },
        { label: 'tennis', value: 'tennis' },
        { label: 'golf', value: 'golf' },
    ]);

    const router = useRouter();

    // Vérifie si l'utilisateur est connecté via AsyncStorage
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

    const handleAddProduct = () => {
        if (!productName || !price || !stock || !description || !selectedValue) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const newProduct = {
            id: (products.length + 1).toString(), // Generate a new ID based on the length of the products array
            name: productName,
            description,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            category: selectedValue,
            vendeurs: 'Default Vendor', // You can customize this field
            image: '../../../assets/images/null.png', // Placeholder image URL
            isActive: true,
        };

        setProducts([...products, newProduct]); // Add the new product to the context
        Alert.alert('Success', 'Product added successfully');
        // Reset fields
        setProductName('');
        setPrice('');
        setStock('');
        setDescription('');
        setSelectedValue('');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[]} // Empty data for now
                    ListHeaderComponent={
                        <View style={styles.container}>
                            <View style={styles.containerAddProject}>
                                <Text style={styles.title}>Add a new product</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="name of product"
                                    value={productName}
                                    onChangeText={setProductName}
                                    autoCapitalize="none"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="price"
                                    value={price}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        const numericValue = text.replace(/[^0-9.]/g, ''); // Allow numbers and decimal points only
                                        setPrice(numericValue);
                                    }}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Stock"
                                    value={stock}
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        const numericValue = text.replace(/[^0-9]/g, ''); // Allow numbers only
                                        setStock(numericValue);
                                    }}
                                    keyboardType="numeric"
                                />
                                <View style={styles.containerCategory}>
                                    <DropDownPicker
                                        open={open}
                                        value={selectedValue}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setSelectedValue}
                                        setItems={setItems}
                                        style={styles.select}
                                        placeholder="Select a category"
                                    />
                                </View>
                                <TextInput
                                    style={styles.textarea}
                                    placeholder="Description"
                                    value={description}
                                    onChangeText={setDescription}
                                    autoCapitalize="none"
                                    multiline={true}
                                    textAlignVertical="top"
                                />
                                <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
                                    <Text style={styles.buttonText}>Add new product</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1 }}
                />
                <CustomNavbar />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', padding: 50 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        margin: 10,
    },
    select: {
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        outline: 'none',
        width: '70%',
        height: 50,
        color: '#000',
        borderRadius: 8,
        fontSize: 12,
        margin: 10,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerAddProject: {
        justifyContent: 'center',
        paddingHorizontal: 3,
        paddingVertical: 20,
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 70,
        marginBottom: 100,
    },
    textarea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        margin: 10,
        height: 100,
    },
    containerCategory: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 60,
    },
});