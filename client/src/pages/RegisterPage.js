import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await authService.register(name, email, password);
      login(userData); // Atualiza o contexto de autenticação
      toast({
        title: 'Cadastro realizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Redireciona para o dashboard
    } catch (error) {
      toast({
        title: 'Erro no cadastro',
        description: error.response?.data?.message || 'Ocorreu um erro. Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Container centerContent>
      <Box w="full" maxW="md" p={8} mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
        <VStack spacing={4} as="form" onSubmit={handleSubmit}>
          <Heading>Cadastro</Heading>
          <FormControl isRequired>
            <FormLabel>Nome</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Senha</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
            Cadastrar
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default RegisterPage;
