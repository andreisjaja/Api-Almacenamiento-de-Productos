const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = './routers/ordenes.json'; // Asegúrate de que esta ruta es correcta

// Leer órdenes desde el archivo JSON
let ordenes = [];
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf8');
  ordenes = JSON.parse(data);
}

// Función para guardar órdenes en el archivo JSON
const saveOrdenes = () => {
  fs.writeFileSync(filePath, JSON.stringify(ordenes, null, 2), 'utf8');
};

// Obtener todas las órdenes
router.get('/', (req, res) => {
  res.json(ordenes);
});

// Obtener orden por ID
router.get('/:id', (req, res) => {
  const orden = ordenes.find(o => o.id === parseInt(req.params.id, 10));
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
  saveOrdenes();
  res.status(201).json(nuevaOrden);
});

// Actualizar orden por ID
router.put('/actualizar/:id', (req, res) => {
  const ordenId = parseInt(req.params.id, 10);
  const ordenIndex = ordenes.findIndex(o => o.id === ordenId);
  if (ordenIndex !== -1) {
    ordenes[ordenIndex] = { ...ordenes[ordenIndex], ...req.body }; // Correct reference to 'ordenIndex'
    saveOrdenes();
    res.json(ordenes[ordenIndex]);
  } else {
    res.status(404).send('Orden no encontrada');
  }
});

// Eliminar orden por ID
router.delete('/eliminar/:id', (req, res) => {
  const ordenId = parseInt(req.params.id, 10);
  ordenes = ordenes.filter(o => o.id !== ordenId);
  saveOrdenes();
  res.status(204).send();
});

module.exports = router;
