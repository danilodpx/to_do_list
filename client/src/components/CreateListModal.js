import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';

const CreateListModal = ({ isOpen, onClose, onListCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#FFFFFF'); // Cor padrão
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // A lógica de chamada do serviço será feita na página do Dashboard
      await onListCreated({ name, description, color });
      onClose(); // Fecha o modal em caso de sucesso
    } catch (error) {
      console.error("Erro ao criar a lista:", error);
    } finally {
      setLoading(false);
      // Limpa os campos após a submissão
      setName('');
      setDescription('');
      setColor('#FFFFFF');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Criar Nova Lista</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Nome da Lista</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Descrição</FormLabel>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Cor do Card</FormLabel>
            <Input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
            Criar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateListModal;
