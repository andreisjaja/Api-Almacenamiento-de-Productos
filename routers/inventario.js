
const express = require('express');
const router = express.Router();

let inventario = {
  productosDisponibles: 100
};
//ver ive
router.get('/', (req, res) => {
  res.json(inventario);
});

// Actualizar inventario
router.put('/actualizar', (req, res) => {
  inventario = { ...inventario, ...req.body };
  res.json(inventario);
});


router.put('/actualizar', (req, res) => {
  inventario = { ...inventario, ...req.body };
  res.json(inventario);
});

router.delete('/eliminar/:id', (req, res) => {
  const inventario = parseInt(req.params.id);
  inventario = inventario.filter(o => o.id !== ordenId);
});

module.exports = router;
