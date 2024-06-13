import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    VStack,
    Heading,
} from '@chakra-ui/react';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bg="gray.50"
        >
            <Box p={8} maxWidth="md" borderWidth={1} borderRadius="lg" boxShadow="lg">
                <VStack as="form" onSubmit={handleLogin} spacing={4}>
                    <Heading>Login</Heading>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" width="full">
                        Login
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
}

export default LoginPage;
