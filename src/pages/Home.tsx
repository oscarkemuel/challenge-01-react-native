import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const taskIndex = tasks.findIndex(task => task.title === newTaskTitle)

    if(taskIndex >= 0){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const data: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
  
      setTasks([...tasks, data])
    }
    
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const taskIndex = tasks.findIndex(task => task.id === id)

    if(taskIndex >= 0){
      let taskChanged = [...tasks];

      if(!taskChanged[taskIndex].done){
        taskChanged[taskIndex].done = true;
      } else {
        taskChanged[taskIndex].done = false;
      }

      setTasks(taskChanged)
    }
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'NÃO',
      },
      {
        text: 'SIM',
        onPress: () => setTasks([...tasks.filter(task => task.id !== id)])
      }
    ] )
    
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if(taskIndex >= 0){
      let taskChanged = [...tasks];

      taskChanged[taskIndex].title = taskNewTitle;

      setTasks(taskChanged);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})