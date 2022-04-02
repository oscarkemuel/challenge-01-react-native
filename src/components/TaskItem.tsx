import React, { useState, useRef, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Task } from "./TasksList";

import trashIcon from '../assets/icons/trash/trash.png'

interface TaskItemProps {
  index: number;
  item: Task;
  removeTask: (id: number) => void;
  toggleTaskDone: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(item.title);

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing(){
    setIsEditing(true)
  }

  function handleCancelEditing(){
    setTask(item.title)
    setIsEditing(false)
  }

  function handleSubmitEditing(){
    editTask(item.id, task)
    setIsEditing(false)
  }

  useEffect(() => {
    if(textInputRef.current){
      if(isEditing){
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])
  
  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            //TODO - use style prop 
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput 
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={task}
            onChangeText={setTask}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', flexDirection: "row" }}>
        {isEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <AntDesign name="close" size={20} color="#B2B2B2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <AntDesign name="edit" size={20} color="#B2B2B2" />
          </TouchableOpacity>
        )}

          <TouchableOpacity
            style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
            onPress={() => removeTask(item.id)}
            disabled={isEditing}
          >
            <Image source={trashIcon} />
          </TouchableOpacity>
        
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})