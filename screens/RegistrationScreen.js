import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegistrationScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Kullanıcı adı

    const handleSignUp = async () => {
        if (email !== '' && password !== '' && name !== '') {
            if (!validateEmail(email)) {
                alert('Geçerli bir email adresi girin.');
                return;
            }
            if (!validatePassword(password)) {
                alert('Şifre en az 4 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir.');
                return;
            }
            try {
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);
                await AsyncStorage.setItem('storedUsername', name); // Kullanıcı adını da kaydediyoruz

                Alert.alert('Başarılı', 'Kayıt başarılı!', [
                    { text: 'Tamam', onPress: () => navigation.navigate('WelcomeScreen', { username: name }) } // Kayıt sonrası WelcomeScreen'e yönlendir
                ]);
            } catch (error) {
                Alert.alert('Hata', 'Kayıt sırasında bir hata oluştu.');
                console.error('Kayıt sırasında hata oluştu:', error);
            }
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{4,}$/;
        return re.test(password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Kayıt Ol</Text>
            <TextInput
                style={styles.input}
                placeholder="Adınız"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <Text style={styles.signUpButtonText}>Kayıt Ol</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
                Zaten bir hesabınız var mı?{' '}
                <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
                    Giriş Yap
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#f5f5f5',
    },
    signUpButton: {
        backgroundColor: '#ff5a5f',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 15,
    },
    signUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginText: {
        textAlign: 'center',
        color: '#888',
    },
    loginLink: {
        color: '#ff5a5f',
        fontWeight: 'bold',
    },
});

