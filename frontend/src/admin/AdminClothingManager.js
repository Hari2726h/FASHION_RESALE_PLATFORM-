import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function AdminClothingManager() {
  const [clothingItems, setClothingItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState({ description: '', size: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchClothingItems();
  }, []);

  const fetchClothingItems = async () => {
    try {
      const res = await axios.get('/api/clothing-items');
      setClothingItems(res.data);
    } catch (err) {
      alert('Error fetching clothing items');
    }
  };

  const handleShowAddModal = () => {
    setCurrentItem({ description: '', size: '' });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleShowEditModal = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/api/clothing-items/${id}`);
      fetchClothingItems();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/clothing-items/${currentItem.id}`, currentItem);
      } else {
        await axios.post('/api/clothing-items', currentItem);
      }
      fetchClothingItems();
      setShowModal(false);
    } catch (err) {
      alert('Error saving clothing item');
    }
  };

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h2>Admin Clothing Manager</h2>
      <Button className="mb-3" onClick={handleShowAddModal}>Add Clothing Item</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clothingItems.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>{item.size}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleShowEditModal(item)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Clothing Item' : 'Add Clothing Item'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={currentItem.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Size</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={currentItem.size}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">{isEditing ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminClothingManager;
