// src/pages/Dashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Box, Flex, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import ActiveOrders from '../components/ActiveOrders';
import CompletedOrders from '../components/completedOrders';
import DarkThemeToggle from '../components/darkThemeToggle';

function Dashboard() {
    return (
        <Box p={4}>
            <DarkThemeToggle />
            <Tabs>
                <TabList>
                    <Tab>Active Orders</Tab>
                    <Tab>Completed Orders</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ActiveOrders />
                    </TabPanel>
                    <TabPanel>
                        <CompletedOrders />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default Dashboard;
