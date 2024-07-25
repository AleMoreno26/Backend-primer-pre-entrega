// servidor express que, en su archivo app.js importe al archivo de productManager.

const express = require("express"); 
const app = express(); 
const PUERTO = 8080;
const productRouter = require("./routes/products.router.js");
const cartsRouter = require ("./routes/carts.router.js");


//Middleware: 
app.use(express.json()); 


//Rutas
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el http://localhost:${PUERTO}`); 
})