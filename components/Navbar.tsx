// components/CustomNavbar.tsx
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context'
// import HomePng from '../assets/images/home.png'

export default function Navbar() {
  const router = useRouter();

  return (
    <SafeAreaProvider>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.replace('/Home/welcomePage')}>
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/Home/Product/addProducts')}>
          <Text style={styles.link}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/Home/profil')}>
          <Text style={styles.link}>Profil</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0 ,
    width: '100%',
  },
  link: {
    fontSize: 16,
    color: 'black',
    padding: 16,
    textAlign: 'center',
  },
});
