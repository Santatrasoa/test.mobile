import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Alert, StyleSheet, Image, ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomNavbar from '@/components/Navbar';

// Import d'images locales
import Avatar from '../../../assets/images/user.png';
import Logout from '../../../assets/images/logout.png';

type User = {
  id: string;
  username: string;
  email: string;
};

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null); // utilisateur connecté
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isModifying, setIsModifying] = useState(false); // mode édition
  const router = useRouter();

  // Active le mode modification
  const handleModify = () => setIsModifying(true);

  // Annule la modification
  const handleCancel = () => {
    setIsModifying(false);
    setUsername(user?.username || '');
    setEmail(user?.email || '');
  };

  // Déconnexion avec confirmation
  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              router.replace('/'); // retour à la page de connexion
            } catch (error) {
              console.error("Error removing user data:", error);
            }
          }
        }
      ]
    );
  };

  // Récupère les données utilisateur depuis AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) {
          // Pas de donnée utilisateur, on redirige vers la page de connexion
          router.replace('/');
          return;
        }
        const userInfo = JSON.parse(userData);
        setUser(userInfo);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // En cas d'erreur aussi on peut rediriger pour éviter blocage
        router.replace('/');
      }
    };
    fetchUserData();
  }, []);
  
  // Remplit les champs de formulaire après chargement des données
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  // Enregistre les nouvelles informations utilisateur
  const handleSave = async () => {
    if (!username || !email) {
      Alert.alert('Error', 'Username and Email cannot be empty');
      return;
    }
    try {
      if (user) {
        const updatedUser: User = { ...user, username, email };
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsModifying(false);
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  return (
    <View style={styles.root}>
      {/* Bouton Logout en haut à droite */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image source={Logout} style={styles.logoutImage} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <Image source={Avatar} style={styles.image} />

        {/* Formulaire utilisateur */}
        <View
          style={[
            styles.containerInfo,
            isModifying && styles.containerInfoModifying,
          ]}
        >
          <TextInput
            style={[
              styles.input,
              isModifying && styles.inputModifying,
            ]}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            editable={isModifying}
          />
          <TextInput
            style={[
              styles.input,
              isModifying && styles.inputModifying,
            ]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            editable={isModifying}
          />

          {/* Boutons */}
          {!isModifying ? (
            <TouchableOpacity style={styles.button} onPress={handleModify}>
              <Text style={styles.buttonText}>Modify</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navbar toujours visible */}
      <CustomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30, // pour éviter le chevauchement avec la barre de statut
  },
  container: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  containerInfo: {
    padding: 30,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  containerInfoModifying: {
    borderColor: '#000',
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  inputModifying: {
    borderColor: '#000',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
  },
  cancel: {
    backgroundColor: '#f00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  logoutImage: {
    width: 30,
    height: 30,
  },
});
