import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const WelcomeScreen = ({ route, navigation }) => {
    const { username } = route.params;

    const handleStart = () => {
        navigation.navigate('TodoScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.redShape}></View>

            <Image source={require('../assets/loginvector.png')} style={styles.illustration} />

            <Text style={styles.title}>Hoşgeldin {username}</Text>
            <Text style={styles.description}>
                Bu uygulama, görevlerinizi organize etmenize yardımcı olmak için tasarlandı.
                Görevlerinizi ekleyin, kategorilere ayırın ve belirlediğiniz tarihlerde tamamlayın.
                İster iş, ister kişisel, spor veya alışveriş gibi kategorilerle görevlerinizi
                daha
            </Text>

            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                <Text style={styles.buttonText}>Hadi Başlayalım...</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        paddingTop: 40,
    },
    redShape: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 150,
        height: 150,
        backgroundColor: '#ff3d3d',
        borderBottomRightRadius: 75,
    },
    illustration: {
        width: 250,
        height: 250,
        marginTop: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginHorizontal: 30,
        marginTop: 10,
    },
    startButton: {
        backgroundColor: '#ff3d3d',
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 30,
        marginTop: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
