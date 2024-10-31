return (
    <View style={styles.container}>
        <Text style={styles.header}>To-Do List</Text>

        {/* Input ve Ekle Butonu */}
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Yeni görev giriniz"
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            <Button title="Ekle" onPress={addTask} />
        </View>

        {/* Görev Listesi */}
        <ScrollView>
            <FlatList
                data={tasks}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text style={styles.taskText}>{item.value}</Text>
                        <TouchableOpacity onPress={() => deleteTask(item.key)}>
                            <Text style={styles.deleteButton}>Sil</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </ScrollView>
    </View>
);