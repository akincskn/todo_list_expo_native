import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, completeTask, removeTask } from './taskSlice';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function TodoScreen() {
    const [task, setTask] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [reminderDateTime, setReminderDateTime] = useState(new Date());
    const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);
    const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);

    const tasks = useSelector((state) => state.task.tasks);
    const dispatch = useDispatch();

    const onChangeReminderDate = (event, date) => {
        const selectedDate = date || reminderDateTime;
        setShowReminderDatePicker(false);
        if (event.type !== "dismissed") {
            setReminderDateTime(selectedDate);
            setShowReminderTimePicker(true);
        }
    };

    const onChangeReminderTime = (event, time) => {
        const selectedTime = time || reminderDateTime;
        setShowReminderTimePicker(false);
        if (event.type !== "dismissed") {
            setReminderDateTime(selectedTime);
        }
    };

    const onChangeDate = (event, date) => {
        const currentDate = date || selectedDate;
        setShowDatePicker(false);
        setSelectedDate(currentDate);
    };

    const handleAddTask = () => {
        if (task !== '' && selectedCategory !== '') {
            const newTask = {
                id: Date.now().toString(),
                value: task,
                category: selectedCategory,
                dueDate: selectedDate.toISOString(),
                reminderTime: reminderDateTime.toISOString(),
                completed: false,
            };
            dispatch(addTask(newTask));
            setTask('');
            setSelectedCategory('');
            setSelectedDate(new Date());
            setReminderDateTime(new Date());
        } else {
            Alert.alert('Hata', 'Lütfen bir görev ve kategori girin.');
        }
    };

    const handleCompleteTask = (id) => {
        dispatch(completeTask(id));
    };

    const handleRemoveTask = (id) => {
        Alert.alert('Sil', 'Bu görevi silmek istediğinize emin misiniz?', [
            { text: 'Hayır', style: 'cancel' },
            { text: 'Evet', onPress: () => dispatch(removeTask(id)) },
        ]);
    };

    const sortedTasks = tasks.filter(task => !task.completed).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const item = sortedTasks
    return (
        <>
            {/* <View style={[styles.taskItem, item.completed && styles.completedItem]}>
                <View style={styles.taskContent}>
                    <Text style={[styles.taskText, item.completed && styles.completedText]}>
                        {item.value} - {item.category}
                    </Text>
                    <Text style={styles.dateText}>
                        Bitiş Tarihi: {new Date(item.dueDate).toLocaleDateString()}
                    </Text>
                    <Text style={styles.dateText}>
                        Hatırlatma Zamanı: {new Date(item.reminderTime).toLocaleString()}
                    </Text>
                </View>
                <View style={styles.actionButtons}>
                    {item.completed ? (
                        <Icon name="check-circle" size={24} color="green" />
                    ) : (
                        <TouchableOpacity onPress={() => handleCompleteTask(item.id)}>
                            <Text style={styles.actionText}>Tamamla</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
                        <Text style={styles.actionText}>Sil</Text>
                    </TouchableOpacity>
                </View>
            </View> */}

            <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
                <Text style={styles.header}>Görevlerinizi Planlayın</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Yeni görev ekleyin"
                    value={task}
                    onChangeText={setTask}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.dateText}>Kategori Seç: {selectedCategory}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 15 }} onPress={() => setShowReminderDatePicker(true)}>
                    <Text style={styles.dateText}>Hatırlatma Zamanı: {reminderDateTime.toLocaleString()}</Text>
                    {showReminderDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', paddingVertical: 15 }} onPress={() => setShowReminderDatePicker(true)}>
                    <Text style={styles.dateText}>Hatırlatma Zamanı: {reminderDateTime.toLocaleString()}</Text>
                    {showReminderDatePicker && (
                        <DateTimePicker
                            value={reminderDateTime}
                            mode="date"
                            display="default"
                            onChange={onChangeReminderDate}
                        />
                    )}
                </TouchableOpacity>

                {showReminderTimePicker && (
                    <DateTimePicker
                        value={reminderDateTime}
                        mode="time"
                        display="default"
                        onChange={onChangeReminderTime}
                    />
                )}
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                    <Text style={styles.addButtonText}>Görev Ekle</Text>
                </TouchableOpacity>
                {showDatePicker && <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => {
                        setSelectedCategory(itemValue)
                        setShowDatePicker(false)
                    }}
                    style={styles.picker}
                    display={false}
                >
                    <Picker.Item label="Kategori Seç" value="" />
                    <Picker.Item label="İş" value="iş" />
                    <Picker.Item label="Spor" value="spor" />
                    <Picker.Item label="Kişisel" value="kişisel" />
                    <Picker.Item label="Alışveriş" value="alışveriş" />
                    <Picker.Item label="Okul" value="okul" />

                </Picker>}
            </SafeAreaView>

        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: '#fff',
        width: '100%',
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 8,
    },
    dateText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'left', // Sağ kaymanın önüne geçmek için sola hizala
        marginVertical: 10,
    },
    addButton: {
        backgroundColor: '#ff5a5f',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',

    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center', // Dikeyde ortalayarak düzeltiyoruz
    },
    completedItem: {
        backgroundColor: '#e0ffe0',
    },
    taskContent: {
        flex: 1, // Görev içeriği daha fazla alan kaplayacak
        marginRight: 10, // Butonlara yer bırakmak için sağa biraz boşluk ekliyoruz
    },
    taskText: {
        fontSize: 16,
        color: '#333',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#999',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Yazıları sola hizalıyoruz
        alignItems: 'center',
    },
    actionText: {
        fontSize: 14,
        color: '#ff5a5f',
        marginLeft: 0, // margin'i sıfırlıyoruz
        textAlign: 'left', // Yazıyı tamamen sola çekiyoruz
        paddingRight: 10, // Butonların daha rahat görünmesi için sağa biraz boşluk bırakıyoruz
    },
});




// // const tasks = [
//     //     { id: 1, value: 'Görev 1', category: 'iş', completed: false, dueDate: '2024-10-24T08:30:00' },
//     //     { id: 2, value: 'Görev 2', category: 'spor', completed: true, dueDate: '2024-10-23T10:00:00' },
//     //   ];

//     // tamamlanmışları gösteriyo
//     const incompleteTasks = tasks.filter(task => !task.completed);

//     // bitiş tarihine göre
//     const sortedTasks = incompleteTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

//     // tüm görevlerin bitip bitmediği
//     const allTasksCompleted = tasks.every(task => task.completed);

//     // en az bir görev tamamlandı mı
//     const hasCompletedTasks = tasks.some(task => task.completed);

//     // const firstCompletedTask = tasks.find(task => task.completed);




// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTask, completeTask, removeTask } from './taskSlice';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// export default function TodoScreen() {
//     const [task, setTask] = useState('');
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);

//     const tasks = useSelector((state) => state.task.tasks);
//     const dispatch = useDispatch();

//     const onChangeDate = (event, date) => {
//         const currentDate = date || selectedDate;
//         setShowDatePicker(false);
//         setSelectedDate(currentDate);
//     };

//     const handleAddTask = () => {
//         if (task !== '' && selectedCategory !== '') {
//             const newTask = {
//                 id: Date.now().toString(),
//                 value: task,
//                 category: selectedCategory,
//                 dueDate: selectedDate.toISOString(),
//                 completed: false,
//             };
//             dispatch(addTask(newTask));
//             setTask('');
//             setSelectedCategory('');
//             setSelectedDate(new Date());
//         } else {
//             Alert.alert('Hata', 'Lütfen bir görev ve kategori girin.');
//         }
//     };

//     const handleCompleteTask = (id) => {
//         dispatch(completeTask(id));
//     };

//     const handleRemoveTask = (id) => {
//         Alert.alert('Sil', 'Bu görevi silmek istediğinize emin misiniz?', [
//             { text: 'Hayır', style: 'cancel' },
//             { text: 'Evet', onPress: () => dispatch(removeTask(id)) },
//         ]);
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Yeni görev ekleyin"
//                 value={task}
//                 onChangeText={setTask}
//             />

//             <Picker
//                 selectedValue={selectedCategory}
//                 onValueChange={(itemValue) => setSelectedCategory(itemValue)}
//                 style={styles.picker}
//             >
//                 <Picker.Item label="Kategori Seç" value="" />
//                 <Picker.Item label="İş" value="iş" />
//                 <Picker.Item label="Spor" value="spor" />
//                 <Picker.Item label="Kişisel" value="kişisel" />
//                 <Picker.Item label="Alışveriş" value="alışveriş" />
//             </Picker>

//             <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//                 <Text style={styles.dateText}>Tarih Seç: {selectedDate.toLocaleDateString()}</Text>
//             </TouchableOpacity>

//             {showDatePicker && (
//                 <DateTimePicker
//                     value={selectedDate}
//                     mode="date"
//                     display="default"
//                     onChange={onChangeDate}
//                 />
//             )}

//             <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
//                 <Text style={styles.addButtonText}>Görev Ekle</Text>
//             </TouchableOpacity>

//             <FlatList
//                 data={tasks}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={[styles.taskItem, item.completed && styles.completedItem]}>
//                         <View style={styles.taskContent}>
//                             <Text style={[styles.taskText, item.completed && styles.completedText]}>
//                                 {item.value} - {item.category}
//                             </Text>
//                             <Text style={styles.dateText}>
//                                 Bitiş Tarihi: {new Date(item.dueDate).toLocaleDateString()}
//                             </Text>
//                         </View>
//                         <View style={styles.actionButtons}>
//                             {item.completed ? (
//                                 <Icon name="check-circle" size={24} color="green" />
//                             ) : (
//                                 <TouchableOpacity onPress={() => handleCompleteTask(item.id)}>
//                                     <Text style={styles.actionText}>Tamamla</Text>
//                                 </TouchableOpacity>
//                             )}
//                             <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
//                                 <Text style={styles.actionText}>Sil</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f5f5f5',
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingLeft: 8,
//         borderRadius: 5,
//         backgroundColor: '#fff',
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//         marginBottom: 10,
//     },
//     dateText: {
//         fontSize: 16,
//         marginVertical: 10,
//         color: '#333',
//     },
//     addButton: {
//         backgroundColor: '#007bff',
//         padding: 10,
//         alignItems: 'center',
//         borderRadius: 5,
//     },
//     addButtonText: {
//         color: 'white',
//         fontSize: 16,
//     },
//     taskItem: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: 'gray',
//         backgroundColor: '#fff',
//         borderRadius: 5,
//         marginVertical: 5,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     completedItem: {
//         backgroundColor: '#d4edda',
//     },
//     taskContent: {
//         flex: 1,
//     },
//     taskText: {
//         fontSize: 16,
//     },
//     completedText: {
//         textDecorationLine: 'line-through',
//         color: 'gray',
//         fontStyle: 'italic',
//     },
//     actionButtons: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     actionText: {
//         color: '#007bff',
//         marginLeft: 10,
//     },
// });