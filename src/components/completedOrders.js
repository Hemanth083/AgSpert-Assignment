import React, { useState } from 'react';
import { Box, Stack, Text, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import ModalForm from './ModalForm';

const sampleCompletedOrders = [
    {
        id: 2,
        customer_profile: {
            id: 11908,
            name: 'Ram',
            email: 'jesus_christ@church.com',
            location_name: 'Mumbai, Maharashtra, India',
        },
        items: [{ sku_id: 248, price: 54, quantity: 2 }],
        paid: true,
        invoice_no: 'Invoice - 1212122',
        invoice_date: '2024-06-05',
        updated_on: '2024-06-10',
    },
];

function CompletedOrders() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleView = (order) => {
        setSelectedOrder(order);
        onOpen();
    };

    return (
        <Box>
            <Stack spacing={4} mt={4}>
                {sampleCompletedOrders.map((order) => (
                    <Box key={order.id} p={4} borderWidth={1} borderRadius="md" position="relative">
                        <Text>Invoice No: {order.invoice_no}</Text>
                        <Text>Customer: {order.customer_profile.name}</Text>
                        <Text>Last Modified: {new Date(order.updated_on).toLocaleDateString()}</Text>
                        <Text>Total Price: {order.items.reduce((total, item) => total + item.price * item.quantity, 0)}</Text>
                        <IconButton
                            icon={<HamburgerIcon />}
                            position="absolute"
                            top={2}
                            right={2}
                            aria-label="View order"
                            onClick={() => handleView(order)}
                        />
                    </Box>
                ))}
            </Stack>
            {isOpen && (
                <ModalForm
                    isOpen={isOpen}
                    onClose={onClose}
                    order={selectedOrder}
                    readOnly={true}
                />
            )}
        </Box>
    );
}

export default CompletedOrders;
