import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import usersData from '../../data/users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  

  useEffect(() => {
    setUsers(usersData);
  }, []);

  
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all the fields');
    } 
    else {
      const existing = users.find((u) => u.email.trim() === email.trim() || u.username.trim() === email.trim());
      if (existing === undefined || existing?.password.trim() !== password.trim()) {
        Alert.alert('Error', 'Please verify your username or mail\nPlease Verify your password');
        return;
      }
      else {
        try {
          AsyncStorage.setItem('user', JSON.stringify(existing));
        } catch (error) {
          console.error('Error saving user data:', error);
        }
        router.push('/Home/welcomePage');
      }
    }
  }
  
  
  return (

    <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <View style={styles.container}>
        <View style={styles.containerLogin}>
        <Text style={styles.title}>Connexion</Text>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpContainer}  onPress={() => router.push('/SignUp')}>
          <Text style={styles.textSignUp}>Don't have account ?</Text>
          <Text style={styles.link}>sign up</Text>
        </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    margin: 10,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 20,
  },  
  link: {
    marginTop: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
    color: '#007bff',
  },
  textSignUp:{
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
  },
  containerLogin : {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 50,
    borderRadius: 8,
  },
});
