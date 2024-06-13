import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import ModalForm from './ModalForm';

const sampleOrders = [
    {
        id: 1,
        customer_id: 11908,
        customer_profile: {
            id: 11908,
            name: 'Ram',
            email: 'jesus_christ@church.com',
            location_name: 'Mumbai, Maharashtra, India',
        },
        items: [
            { sku_id: 248, price: 54, quantity: 2 },
        ],
        paid: false,
        invoice_no: 'Invoice - 1212121',
        invoice_date: '2024-07-05',
        updated_on: '2024-06-05',
    },
];

function ActiveOrders() {
    const [orders, setOrders] = useState(sampleOrders);
    const ordersRef = useRef(sampleOrders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleEdit = (order) => {
        const orderToEdit = {
            ...order,
            customer_name: order.customer_profile?.name || '',
        };
        setSelectedOrder(orderToEdit);
        onOpen();
    };

    const handleAdd = () => {
        setSelectedOrder({
            customer_name: '',
            items: [{ sku_id: '', price: '', quantity: '' }],
            paid: false,
            invoice_no: '',
            invoice_date: '',
        });
        onOpen();
    };

    const handleSave = (newOrder) => {
        const newOrderWithProfile = {
            ...newOrder,
            customer_profile: { ...newOrder.customer_profile, name: newOrder.customer_name },
        };

        if (newOrder.id) {
            const updatedOrders = ordersRef.current.map((order) =>
                order.id === newOrder.id
                    ? { ...order, ...newOrderWithProfile, updated_on: new Date().toISOString() }
                    : order
            );
            ordersRef.current = updatedOrders;
            setOrders(updatedOrders);
        } else {
            const newId = Math.max(...ordersRef.current.map((o) => o.id), 0) + 1;
            const updatedOrders = [
                ...ordersRef.current,
                {
                    ...newOrderWithProfile,
                    id: newId,
                    updated_on: new Date().toISOString(),
                },
            ];
            ordersRef.current = updatedOrders;
            setOrders(updatedOrders);
        }
        onClose();
    };

    return (
        <Box>
            <Button onClick={handleAdd} colorScheme="blue" mb={4}>
                Add New Order
            </Button>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Customer Name</Th>
                        <Th>Total Price</Th>
                        <Th>Last Modified</Th>
                        <Th>Edit</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.map((order) => (
                        <Tr key={order.id}>
                            <Td>{order.customer_profile?.name || 'Unknown'}</Td>
                            <Td>
                                {order.items.reduce((total, item) => total + item.price * item.quantity, 0)}
                            </Td>
                            <Td>{new Date(order.updated_on).toLocaleDateString()}</Td>
                            <Td>
                                <IconButton
                                    icon={<HamburgerIcon />}
                                    aria-label="Edit order"
                                    onClick={() => handleEdit(order)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {isOpen && (
                <ModalForm
                    isOpen={isOpen}
                    onClose={onClose}
                    order={selectedOrder}
                    onSave={handleSave}
                    readOnly={false}
                />
            )}
        </Box>
    );
}

export default ActiveOrders;
