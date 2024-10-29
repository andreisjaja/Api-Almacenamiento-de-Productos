const express = require('express');
const router = express.Router();

let productos = [
  { id: 1, nombre: 'laptod', precio: 100 },
  { id: 2, nombre: 'auriculares', precio: 150 }
];

// Obtener todos los productos
router.get('/', (req, res) => {
  res.json(productos);
});

// Obtener producto por si id
router.get('/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Añadir nuevo producto
router.post('/add', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

// Actualizar producto por ID
router.put('/actualizar/:id', (req, res) => {
  const productoId = parseInt(req.params.id, 10); // Asegúrate de que esté bien definido
  const productoIndex = productos.findIndex(p => p.id === productoId);

  if (productoIndex !== -1) {
    productos[productoIndex] = { ...productos[productoIndex], ...req.body };
    res.json(productos[productoIndex]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});


// Eliminar producto por ID
router.delete('/eliminar/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  productos = productos.filter(p => p.id !== productoId);
  res.status(204).send();
});

module.exports = router;
