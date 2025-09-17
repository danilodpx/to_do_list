import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  Text,
  Link,
} from '@chakra-ui/react';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
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
      const userData = await authService.login(email, password);
      login(userData);
      toast({
        title: 'Login bem-sucedido!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro no login',
        description: error.response?.data?.message || 'Email ou senha inválidos.',
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
          <Heading>Login</Heading>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Senha</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
            Entrar
          </Button>
          <Text>
            Novo por aqui?{' '}
            <Link as={RouterLink} to="/register" color="blue.500">
              Crie uma conta
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default LoginPage;
