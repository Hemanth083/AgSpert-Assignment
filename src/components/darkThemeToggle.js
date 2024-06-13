// src/components/DarkThemeToggle.js
import React from 'react';
import { Button, useColorMode } from '@chakra-ui/react';

function DarkThemeToggle() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
    );
}

export default DarkThemeToggle;
