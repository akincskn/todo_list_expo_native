import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ onLogout }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Ana Sayfa</Text>
            <Button title="Oturumu Kapat" onPress={onLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});









// import React from 'react'; // React import ediliyor
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'; // Gerekli bileşenler import ediliyor

// function HomeScreen({ tasks, task, setTask, addTask, deleteTask, navigation }) {
//   // props olarak gönderilen tasks, task, setTask, addTask, deleteTask, navigation kullanılıyor
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>To-Do List</Text> {/* Başlık */}

//       {/* Input ve Ekle Butonu */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Yeni görev giriniz"
//           value={task} // TextInput değeri task state'inden geliyor
//           onChangeText={(text) => setTask(text)} // Girilen metin task state'ine kaydediliyor
//         />
//         <Button title="Ekle" onPress={addTask} /> {/* Ekle butonu, addTask fonksiyonunu çalıştırır */}
//       </View>

//       {/* Görev Listesi */}
//       <FlatList
//         data={tasks} // Görev listesi tasks state'inden geliyor
//         renderItem={({ item }) => (
//           <View style={styles.taskItem}>
//             <Text style={styles.taskText}>{item.value}</Text> {/* Görev içeriği gösteriliyor */}
//             <TouchableOpacity onPress={() => deleteTask(item.key)}>
//               <Text style={styles.deleteButton}>Sil</Text> {/* Sil butonu, deleteTask fonksiyonunu çalıştırır */}
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       {/* SecondScreen'e gitme butonu */}
//       <Button
//         title="Biten İşlere Git"
//         onPress={() => navigation.navigate('SecondScreen')} // SecondScreen'e yönlendirilir
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 10,
//   },
//   taskItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
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
//   deleteButton: {
//     color: 'red',
//   },
// });

// export default HomeScreen; // HomeScreen bileşeni dışa aktarılıyor
