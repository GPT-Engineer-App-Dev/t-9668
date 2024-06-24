import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, VStack, HStack, Text, IconButton, useToast } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);
  const toast = useToast();

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
      toast({
        title: "Task added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    toast({
      title: "Task deleted",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setNewTask(tasks[index].text);
  };

  const saveEdit = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = newTask;
      setTasks(updatedTasks);
      setEditingIndex(-1);
      setNewTask("");
      toast({
        title: "Task updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.md" centerContent py={8}>
      <VStack spacing={8} width="100%">
        <Heading>Todo App</Heading>
        <HStack width="100%">
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (editingIndex === -1 ? addTask() : saveEdit())}
          />
          <Button colorScheme="blue" onClick={editingIndex === -1 ? addTask : saveEdit}>
            {editingIndex === -1 ? "Add" : "Save"}
          </Button>
        </HStack>
        <VStack width="100%" align="stretch" spacing={4}>
          {tasks.map((task, index) => (
            <HStack key={index} bg="gray.100" p={4} borderRadius="md" justifyContent="space-between">
              <HStack spacing={4}>
                <IconButton
                  icon={<FaCheck />}
                  colorScheme={task.completed ? "green" : "gray"}
                  onClick={() => toggleComplete(index)}
                  aria-label="Toggle complete"
                />
                <Text as={task.completed ? "s" : "span"}>{task.text}</Text>
              </HStack>
              <HStack>
                <IconButton
                  icon={<FaEdit />}
                  colorScheme="blue"
                  onClick={() => startEditing(index)}
                  aria-label="Edit task"
                />
                <IconButton
                  icon={<FaTrash />}
                  colorScheme="red"
                  onClick={() => deleteTask(index)}
                  aria-label="Delete task"
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;