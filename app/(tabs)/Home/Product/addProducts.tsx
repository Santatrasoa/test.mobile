import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import productsData from '../../../../data/products.json';
import CustomNavbar from '@/components/Navbar';
import { Picker } from '@react-native-picker/picker';

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
  const [productName, setProductName] = useState('')
  const [selectedValue, setSelectedValue] = useState('')


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

    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                value={productName}
                onChangeText={setProductName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Stock"
                value={productName}
                onChangeText={setProductName}
                autoCapitalize="none"
            />


            <Picker
            selectedValue={selectedValue}
            style={styles.select}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            >
            <Picker.Item label="Categories" value="All" />
            <Picker.Item label="football" value="football" />
            <Picker.Item label="basketball" value="jbasketballs" />
            <Picker.Item label="volleyball" value="volleyball" />
            </Picker>

            <TextInput 
                style={styles.textarea}
                placeholder="Description"
                value={productName}
                onChangeText={setProductName}
                autoCapitalize="none"    
                multiline={true}
                textAlignVertical='top'
            />


            <TouchableOpacity style={styles.button} onPress={()=>{}}>
                <Text style={styles.buttonText}>Add new product</Text>
            </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
        <CustomNavbar></CustomNavbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff', height:1000 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', padding:50 },
    search: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        // backgroundColor: '#00f',
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginHorizontal: 20,
        marginTop: 10,
        fontSize: 12,
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        margin: 10,
    },
    select : {
        backgroundColor: '#fff',
        padding: 12,
        borderWidth: 3,
        borderColor: '#000',
        width:'100%',
        height: 60,
        color: '#000',
        borderRadius:8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerAddProject : {
        justifyContent: 'center',
        paddingHorizontal: 3,
        paddingVertical: 20,
        borderWidth:1,
        borderRadius:8,
        marginTop: 70,
        marginBottom: 100,
    },
    textarea : {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        margin: 10,
        height:100,
    }
});
