import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  VStack,
  Spinner,
  Center,
  Text,
  useToast,
  Link,
} from '@chakra-ui/react';
import taskService from '../services/taskService';
// O TaskComponent será criado a seguir
// import TaskComponent from '../components/TaskComponent';

const TaskPage = () => {
  const { listId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasksByList(listId);
        setTasks(data);
      } catch (error) {
        toast({
          title: 'Erro ao buscar tarefas',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [listId, toast]);

  return (
    <Box p={8}>
      <Link as={RouterLink} to="/">
        &larr; Voltar para o Dashboard
      </Link>
      <Heading mt={4}>Tarefas da Lista</Heading>

      {loading ? (
        <Center mt={8}><Spinner size="xl" /></Center>
      ) : (
        <VStack spacing={4} mt={8} align="stretch">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              // Substituir por <TaskComponent />
              <Box key={task._id} p={4} shadow="md" borderWidth="1px">
                <Text>{task.text}</Text>
              </Box>
            ))
          ) : (
            <Text>Nenhuma tarefa nesta lista ainda.</Text>
          )}
        </VStack>
      )}
    </Box>
  );
};

export default TaskPage;
