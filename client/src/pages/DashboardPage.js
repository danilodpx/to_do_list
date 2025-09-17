import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  SimpleGrid,
  useDisclosure,
  useToast,
  Spinner,
  Center,
  IconButton,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import listService from '../services/listService';
import ListComponent from '../components/ListComponent';
import CreateListModal from '../components/CreateListModal';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Para o modal

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const data = await listService.getLists();
        setLists(data);
      } catch (error) {
        toast({
          title: 'Erro ao buscar listas',
          description: 'Não foi possível carregar suas listas.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [toast]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateList = async (listData) => {
    try {
      const newList = await listService.createList(listData);
      setLists([...lists, newList]);
      toast({
        title: 'Lista criada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro ao criar lista',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteList = async (listId) => {
    if (window.confirm('Tem certeza que deseja deletar esta lista e todas as suas tarefas?')) {
      try {
        await listService.deleteList(listId);
        setLists(lists.filter((list) => list._id !== listId));
        toast({
          title: 'Lista deletada!',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: 'Erro ao deletar lista',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Suas Listas</Heading>

      {loading ? (
        <Center><Spinner size="xl" /></Center>
      ) : lists.length === 0 ? (
        <Text>Você ainda não tem nenhuma lista. Crie uma no botão +</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {lists.map((list) => (
            <ListComponent key={list._id} list={list} onDelete={handleDeleteList} onEdit={() => {}} />
          ))}
        </SimpleGrid>
      )}

      <CreateListModal isOpen={isOpen} onClose={onClose} onListCreated={handleCreateList} />

      <IconButton
        aria-label="Criar nova lista"
        icon={<FaPlus />}
        colorScheme="blue"
        isRound
        size="lg"
        position="fixed"
        bottom={8}
        right={8}
        onClick={onOpen}
        boxShadow="lg"
      />

      <Button mt={8} colorScheme="red" onClick={handleLogout} position="absolute" top={8} right={8}>
        Sair
      </Button>
    </Box>
  );
};

export default DashboardPage;
