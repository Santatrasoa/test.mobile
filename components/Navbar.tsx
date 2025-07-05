import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeIcon from '../assets/images/home.png';
import AddIcon from '../assets/images/plus.png';
import ProfileIcon from '../assets/images/user.png';

export default function Navbar() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <View style={styles.navbar}>
        {/* Home Button */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Home/welcomePage')}>
          <Image source={HomeIcon} style={styles.icon} />
          <Text style={styles.link}>Home</Text>
        </TouchableOpacity>

        {/* Add Button */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/addProduct/addProducts')}>
          <Image source={AddIcon} style={styles.icon} />
          <Text style={styles.link}>Add</Text>
        </TouchableOpacity>

        {/* Profile Button */}
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Profile/profil')}>
          <Image source={ProfileIcon} style={styles.icon} />
          <Text style={styles.link}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  link: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});