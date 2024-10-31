import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function SecondScreen() {
    const completedTasks = useSelector((state) => state.tasks.completedTasks);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Biten İşler</Text>

            <FlatList
                data={completedTasks}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>{item.value}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#e9ecef',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
    },
    taskItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        elevation: 3,
    },
    taskText: {
        fontSize: 16,
    },
});









// import React from 'react'; // React import ediliyor
// import { View, Text, FlatList, StyleSheet } from 'react-native'; // Gerekli bileşenler import ediliyor

// function SecondScreen({ completedTasks }) {
//   // completedTasks props olarak alınıyor ve ekranda listeleniyor
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Biten İşler</Text> {/* Ekranın başlığı */}

//       {/* Silinen görevler listesi */}
//       <FlatList
//         data={completedTasks} // Silinen görevler completedTasks'ten geliyor
//         renderItem={({ item }) => (
//           <View style={styles.taskItem}>
//             <Text style={styles.taskText}>{item.value}</Text> {/* Silinen görevlerin içeriği */}
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20,
//     paddingHorizontal: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   taskItem: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//   },
//   taskText: {
//     fontSize: 16,
//   },
// });

// export default SecondScreen; // SecondScreen bileşeni dışa aktarılıyor
