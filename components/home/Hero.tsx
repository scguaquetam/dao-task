import Head from 'next/head'
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from '@chakra-ui/react'


export default function Hero() {
  const textColor = useColorModeValue('gray.500', 'gray.300'); 
  const headingColor = useColorModeValue('#3107DA', 'white')// Cambia el color del texto
  const buttonBgColor = useColorModeValue('#3107DA', 'white'); // Cambia el color del fondo del botón
  const buttonHoverBgColor = useColorModeValue('#A83BDB', '#A83BDB'); // Cambia

  return (
    <>
      <Container maxW={'6xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 4 }}
          py={{ base: 20, md: 2 }}
          mx={{ base: 4, md: 2 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: 'xl', sm: '4xl', md: '5xl' }}
            lineHeight={'100%'}
            color={headingColor}>
            Web3 representation and meritocracy with flexible and agile task management systems
          </Heading>
          <Text 
          color={'gray.600'}
          fontSize={{ base: 'md', sm: 'md', md: 'xl' }}
          fontWeight={600}
           >
          Create a template that fits the tasks of your own DAO and facilitates the way of contribution
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={buttonBgColor}
              rounded={'full'}
              px={6}
              _hover={{
                bg: buttonHoverBgColor
              }}>
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
