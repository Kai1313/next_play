// components/InventoryList.js

import React, { useEffect, useState } from 'react';
import { 
    Table, 
    TableContainer, 
    TableHead, 
    TableBody, 
    TableRow, 
    TableCell, 
    Paper, 
    CircularProgress,
    Button,
} from '@mui/material';
import AddInventoryModal from './AddInventoryModal';

const InventoryList = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Fetch data from the Golang API
    fetch('http://localhost:8080/api/inventory')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setInventoryData(data.data);
          setLoading(false);
        } else {
          console.error('Error in API response:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Define the refreshInventoryList function
  const refreshInventoryList = () => {
    // Implement the logic to refresh the inventory list
    // This can include making a GET request to fetch updated data
    // and updating the 'inventoryData' state.
    fetch('http://localhost:8080/api/inventory')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setInventoryData(data.data);
        } else {
          console.error('Error in API response:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1>Inventory List</h1>
      <Button variant="contained" onClick={handleOpenModal}>
        Add Inventory
      </Button>

      {loading ? (
        <CircularProgress />
      ) : (
            <>
                <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Inventory ID</TableCell>
                                    <TableCell>Inventory Code</TableCell>
                                    <TableCell>Inventory Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {inventoryData.map((item) => (
                                    <TableRow key={item.inventory_id}>
                                        <TableCell>{item.inventory_id}</TableCell>
                                        <TableCell>{item.inventory_code}</TableCell>
                                        <TableCell>{item.inventory_name}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                </TableContainer>
                <AddInventoryModal open={modalOpen} handleClose={handleCloseModal} refreshInventoryList={refreshInventoryList} />
            </>
      )}
    </div>
  );
};

export default InventoryList;
