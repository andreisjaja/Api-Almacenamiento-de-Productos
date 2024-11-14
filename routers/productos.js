const express = require('express');
const fs = require('fs');
const router = express.Router();

const filePath = './productos.json';


let productos = [];
if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, 'utf8');
  productos = JSON.parse(data);
}


const saveProductos = () => {
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2), 'utf8');
};

router.get('/prod', (req, res) => {
  res.json(productos);
});

router.get('/prod/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id, 10));
  if (producto) {
    res.json(producto);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

router.post('/prod/add', (req, res) => {
  const nuevoProducto = req.body;
  productos.push(nuevoProducto);
  saveProductos(); 
  res.status(201).json(nuevoProducto);
});

router.put('/prod/actualizar/:id', (req, res) => {
  const productoId = parseInt(req.params.id, 10);
  const productoIndex = productos.findIndex(p => p.id === productoId);
  if (productoIndex !== -1) {
    productos[productoIndex] = { ...productos[productoIndex], ...req.body };
    saveProductos();
    res.json(productos[productoIndex]);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

router.delete('/prod/eliminar/:id', (req, res) => {
  const productoId = parseInt(req.params.id, 10);
  productos = productos.filter(p => p.id !== productoId);
  saveProductos(); 
  res.status(204).send();
});

module.exports = router;
