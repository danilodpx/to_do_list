import React from 'react';
import { Box, Heading, Text, IconButton } from '@chakra-ui/react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const ListComponent = ({ list, onDelete, onEdit }) => {
  const cardBgColor = list.color || 'white';

  const handleEdit = (e) => {
    e.stopPropagation(); // Impede a navegação ao clicar no botão
    onEdit(list);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Impede a navegação ao clicar no botão
    onDelete(list._id);
  };

  return (
    <Box as={RouterLink} to={`/list/${list._id}`} _hover={{ textDecoration: 'none' }}>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        backgroundColor={cardBgColor}
        position="relative"
        _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
        transition="all 0.2s"
      >
        <Heading fontSize="xl">{list.name}</Heading>
        <Text mt={4}>{list.description || 'Sem descrição'}</Text>

        <Box position="absolute" top={2} right={2}>
          <IconButton
            aria-label="Editar lista"
            icon={<FaEdit />}
            size="sm"
            variant="ghost"
            onClick={handleEdit}
            mr={2}
          />
          <IconButton
            aria-label="Deletar lista"
            icon={<FaTrash />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={handleDelete}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ListComponent;
