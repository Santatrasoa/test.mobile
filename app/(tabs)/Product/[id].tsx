import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import products from '../../../data/products.json';
import { useRouter } from 'expo-router';


export default function ProductDetailPage() {
    const router = useRouter()
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
    <View style={styles.containerDetail}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false} 
      >
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.containerModification}>
          <TouchableOpacity style={styles.modify}>
            <Text>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.delete}>
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

        <TouchableOpacity style={styles.backToMenu} onPress={() => router.push(`/Home/welcomePage`)}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 40, flex: 1, marginTop:80 },
  image: { width: '100%', height: 200, resizeMode: 'contain', marginBottom: 20 },
  name: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', },
  price: { fontSize: 18, color: '#007bff', marginVertical: 8 },
  description: { fontSize: 16, color: '#333' },
  
  containerDetail : {
    marginTop: 10,
    padding: 30,
  },

  backToMenu: {
    borderWidth:1,
    borderBlockColor: '#000',
    padding:10,
    margin:20,
    backgroundColor: '#000',
    borderRadius: 8,
  },

  back : {
    textAlign: 'center',
    color: '#fff',
  },  
  
  containerDescription: {
    borderWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    padding: 20,
    borderRadius:8,
  },

  titleDescription : {
    textDecorationLine: 'underline',
    paddingBottom: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },

  containerPrice : {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 8,
    marginVertical: 20,
    borderRadius: 8,
    textAlign:'center',
  },

  containerModification : {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    padding: 10,
    marginTop: 10,
  },
  
  modify : {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },

  delete : {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f00',
  },

  deleteText : {
    color: '#fff'
  }
});
