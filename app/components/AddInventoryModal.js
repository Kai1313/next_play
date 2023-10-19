// components/AddInventoryModal.js

import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
} from '@mui/material';

const AddInventoryModal = ({ open, handleClose, refreshInventoryList }) => {
  const [inventoryCode, setInventoryCode] = useState('');
  const [inventoryName, setInventoryName] = useState('');

  const handleAddClick = () => {
    // Create the data to be sent in the POST request
    const newInventory = {
      inventory_code: inventoryCode,
      inventory_name: inventoryName,
    };

    // Send a POST request to the API
    fetch('http://localhost:8080/api/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInventory),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, e.g., show a success message or handle errors
        if (data.success) {
          console.log('Inventory added successfully');
          // Close the modal and refresh the inventory list
          handleClose();
          refreshInventoryList();
        } else {
          console.error('Error adding inventory:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error sending POST request:', error);
      });

    // Reset the form
    setInventoryCode('');
    setInventoryName('');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 3,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add Inventory
        </Typography>
        <TextField
          label="Inventory Code"
          fullWidth
          value={inventoryCode}
          onChange={(e) => setInventoryCode(e.target.value)}
        />
        <TextField
          label="Inventory Name"
          fullWidth
          value={inventoryName}
          onChange={(e) => setInventoryName(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddClick}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};

export default AddInventoryModal;
