const express = require('express'); 

const app = express();
const PORT = 3001;

app.use(express.json());

const productosRoutes = require('./routers/productos');
const inventarioRoutes = require('./routers/inventario');
const ordenRoutes = require('./routers/ordenes'); 

// se usa las rutas
app.use('/api/productos', productosRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/ordenes', ordenRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
