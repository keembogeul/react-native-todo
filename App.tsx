import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface Task {
  key: string;
  task: string;
  completed: boolean;
}
export default function App() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.length > 0) {
      setTasks([
        ...tasks,
        {key: Math.random().toString(), task, completed: false},
      ]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (taskKey: string) => {
    setTasks(
      tasks.map(item =>
        item.key === taskKey ? {...item, completed: !item.completed} : item,
      ),
    );
  };

  const deleteTask = (taskKey: string) => {
    setTasks(tasks.filter(item => item.key !== taskKey));
  };

  const renderItem = ({item}: {item: Task}) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTaskCompletion(item.key)}>
        <Text style={[styles.task, item.completed && styles.completedTask]}>
          {item.task}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.key)}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={task}
            onChangeText={setTask}
            onSubmitEditing={addTask}
            returnKeyType={'done'}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  task: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  delete: {
    fontSize: 18,
    color: 'red',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
