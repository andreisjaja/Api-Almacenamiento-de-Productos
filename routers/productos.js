const express = require('express');
const router = express.Router();

let productos = [
  { id: 1, nombre: 'laptop', precio: 100 },
  { id: 2, nombre: 'auriculares', precio: 150 }
];

// Obtener todos los productos
router.get('/prod', (req, res) => {
  res.json(productos);
});

// Obtener producto por ID
router.get('/prod/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id, 10));
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Añadir nuevo producto
router.post('/prod/add', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Actualizar producto por ID
router.put('/prod/actualizar/:id', (req, res) => {
  const productoId = parseInt(req.params.id, 10);
  const productoIndex = productos.findIndex(p => p.id === productoId);
  if (productoIndex !== -1) {
    productos[productoIndex] = { ...productos[productoIndex], ...req.body };
    res.json(productos[productoIndex]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Eliminar producto por ID
router.delete('/prod/eliminar/:id', (req, res) => {
  const productoId = parseInt(req.params.id, 10);
  productos = productos.filter(p => p.id !== productoId);
  res.status(204).send();
});

module.exports = router;
