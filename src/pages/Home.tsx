import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const data: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const taskIndex = tasks.findIndex(task => task.id === id)
    console.log(id, taskIndex)

    if(typeof taskIndex === 'number'){
      let taskChanged = [...tasks];

      if(!taskChanged[taskIndex].done){
        console.log('false')
        taskChanged[taskIndex].done = true;
      } else {
        console.log('true')
        taskChanged[taskIndex].done = false;
      }

      setTasks(taskChanged)
    }
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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