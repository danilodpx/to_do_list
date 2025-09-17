import { extendTheme } from '@chakra-ui/react';

// Paleta de cores e fontes customizadas, seguindo as especificações do design
const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
    // Cores de sistema
    success: '#38A169', // green.500
    danger: '#E53E3E',  // red.500
    info: '#3182CE',    // blue.500
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.50',
        lineHeight: 'tall',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'lg', // Bordas mais arredondadas
      },
    },
    Card: { // Supondo que usaremos um componente Card customizado ou o do Chakra
        baseStyle: {
            borderRadius: 'xl',
            boxShadow: 'md',
        }
    }
  }
});

export default theme;
