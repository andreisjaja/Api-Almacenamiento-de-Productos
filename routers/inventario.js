
const express = require('express');
const router = express.Router();

let inventario = {
  productosDisponibles: 100
};

router.get('/', (req, res) => {
  res.json(inventario);
});

// Actualizar inventario
router.put('/actualizar', (req, res) => {
  inventario = { ...inventario, ...req.body };
  res.json(inventario);
});

module.exports = router;
