import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UseStore from './UseStore';

export default function LoginScreen({ navigation }) {
    const { tasks } = UseStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const [storedEmail, storedPassword, storedUsername] = await Promise.all([
                AsyncStorage.getItem('userEmail'),
                AsyncStorage.getItem('userPassword'),
                AsyncStorage.getItem('storedUsername')
            ]);
            const checkCredentials = new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (email === storedEmail && password === storedPassword) {
                        resolve(true);
                    } else {
                        reject('Email veya şifre hatalı!');
                    }
                }, 2000);
            });

            const isValid = await checkCredentials;
            if (isValid) {
                navigation.navigate('WelcomeScreen', { username: storedUsername });
            }
        } catch (error) {
            alert(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topLeftCorner}>
                <View style={styles.redShape} />
            </View>
            <Image source={require('../assets/loginvector.png')} style={styles.image} />
            <Text style={styles.header}>Tekrar Hoşgeldin</Text>
            <Text style={styles.subHeader}>Hatırlatıcı Uygulamasına hoşgeldin...</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
                <Text style={styles.loginButtonText}>
                    {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </Text>
            </TouchableOpacity>
            {/* "Hesap Oluştur" metni ve tıklandığında RegistrationScreen'e yönlendirme */}
            <Text style={styles.createAccount} onPress={() => navigation.navigate('RegistrationScreen')}>
                Hesap Oluştur
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    topLeftCorner: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    redShape: {
        width: 100,
        height: 100,
        backgroundColor: '#ff3d3d',
        borderBottomRightRadius: 50,
    },
    image: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subHeader: {
        fontSize: 14,
        color: '#7c7c7c',
        textAlign: 'center',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginVertical: 8,
        borderRadius: 25,
        backgroundColor: '#fff',
    },
    loginButton: {
        backgroundColor: '#ff3d3d',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    createAccount: {
        color: '#7c7c7c',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});





// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import axiosInstance from './axiosInstance';  // Axios instance'ı import et

// export default function LoginScreen({ navigation }) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleLogin = async () => {
//         setIsLoading(true);
//         try {
//             const response = await axiosInstance.post('/login', { email, password });
//             if (response.data.token) {
//                 // Giriş başarılı, yönlendirme yapabilirsiniz
//                 navigation.navigate('TodoScreen');
//             }
//         } catch (error) {
//             console.error('Login error: ', error);
//             alert('Giriş yapılamadı, lütfen bilgilerinizi kontrol edin.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Giriş Yap</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//             />
//             <TextInput
//                 style={styles.input}
//                 placeholder="Şifre"
//                 value={password}
//                 secureTextEntry
//                 onChangeText={setPassword}
//             />
//             <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
//                 <Text style={styles.loginButtonText}>
//                     {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     header: {
//         fontSize: 24,
//         marginBottom: 24,
//         textAlign: 'center',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         padding: 12,
//         marginVertical: 8,
//         borderRadius: 4,
//     },
//     loginButton: {
//         backgroundColor: '#007bff',
//         padding: 12,
//         borderRadius: 4,
//         alignItems: 'center',
//     },
//     loginButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
// });
