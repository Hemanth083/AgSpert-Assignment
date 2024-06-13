import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
} from '@chakra-ui/react';

function ModalForm({ isOpen, onClose, order, onSave, readOnly }) {
    const [formData, setFormData] = useState(order || {
        customer_name: '',
        items: [{ sku_id: '', price: '', quantity: '' }],
        paid: false,
        invoice_no: '',
        invoice_date: '',
    });

    useEffect(() => {
        setFormData(order || {
            customer_name: '',
            items: [{ sku_id: '', price: '', quantity: '' }],
            paid: false,
            invoice_no: '',
            invoice_date: '',
        });
    }, [order]);

    const handleChange = (e) => {
        if (readOnly) return;
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleItemChange = (index, e) => {
        if (readOnly) return;
        const { name, value } = e.target;
        const items = [...formData.items];
        items[index] = { ...items[index], [name]: value };
        setFormData({ ...formData, items });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{readOnly ? 'View Order' : order ? 'Edit Order' : 'Add New Order'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Customer Name</FormLabel>
                        <Input
                            name="customer_name"
                            value={formData.customer_name}
                            onChange={handleChange}
                            isReadOnly={readOnly}
                        />
                    </FormControl>
                    {formData.items.map((item, index) => (
                        <VStack key={index} mt={4} spacing={2}>
                            <FormControl>
                                <FormLabel>Product SKU</FormLabel>
                                <Input
                                    name="sku_id"
                                    value={item.sku_id}
                                    onChange={(e) => handleItemChange(index, e)}
                                    isReadOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    type="number"
                                    name="price"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, e)}
                                    isReadOnly={readOnly}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Quantity</FormLabel>
                                <Input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    onChange={(e) => handleItemChange(index, e)}
                                    isReadOnly={readOnly}
                                />
                            </FormControl>
                        </VStack>
                    ))}
                    <FormControl mt={4}>
                        <FormLabel>Invoice No</FormLabel>
                        <Input
                            name="invoice_no"
                            value={formData.invoice_no}
                            onChange={handleChange}
                            isReadOnly={readOnly}
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Invoice Date</FormLabel>
                        <Input
                            type="date"
                            name="invoice_date"
                            value={formData.invoice_date}
                            onChange={handleChange}
                            isReadOnly={readOnly}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    {!readOnly && (
                        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                    )}
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalForm;
