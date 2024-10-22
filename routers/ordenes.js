const express = require('express');
const router = express.Router();

let ordenes = [
  { id: 1, producto: 'Producto 1', cantidad: 2 },
  { id: 2, producto: 'Producto 2', cantidad: 1 }
];

// Obtener todas las órdenes
router.get('/', (req, res) => {
  res.json(ordenes);
});

// Obtener orden por ID
router.get('/:id', (req, res) => {
  const orden = ordenes.find(o => o.id === parseInt(req.params.id));
  if (orden) {
    res.json(orden);
  } else {
    res.status(404).send('Orden no encontrada');
  }
});

// Añadir nueva orden
router.post('/add', (req, res) => {
  const nuevaOrden = req.body;
  ordenes.push(nuevaOrden);
  res.status(201).json(nuevaOrden);
});

// Actualizar orden por ID
router.put('/actualizar/:id', (req, res) => {
  const ordenId = parseInt(req.params.id);
  const ordenIndex = ordenes.findIndex(o => o.id === ordenId);
  if (ordenIndex !== -1) {
    ordenes[ordenIndex] = { ...ordenes[ordenIndex], ...req.body };
    res.json(ordenes[ordenIndex]);
  } else {
    res.status(404).send('Orden no encontrada');
  }
});

// Eliminar orden por ID
router.delete('/eliminar/:id', (req, res) => {
  const ordenId = parseInt(req.params.id);
  ordenes = ordenes.filter(o => o.id !== ordenId);
  res.status(204).send();
});

module.exports = router;
