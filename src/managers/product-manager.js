const fs = require("fs").promises;


class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;

        this.inicializarProductos();
    }

    async inicializarProductos() {
        try {
            const productosExistentes = await this.leerArchivo();
            if (productosExistentes.length > 0) {
                this.products = productosExistentes;
                ProductManager.ultId = Math.max(...productosExistentes.map(prod => prod.id));
            }
        } catch (error) {
            console.log("Error al inicializar los productos:", error);
        }
    }

    async addProduct({ titulo, descripcion, precio, imagen, codigo, stock }) {

        if (!titulo || !descripcion || !precio || !imagen || !codigo || !stock) {
            console.log("Campos obligatorios");
            return;
        }

        // Validar

        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }

        //Crear el producto con  id autoincrementable. 
        const nuevoProducto = {
            id: ++ProductManager.ultId,
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            stock
        }

        // pushiamos el producto al array. 
        this.products.push(nuevoProducto);

        // guardo en el archivo: 
        await this.guardarArchivo(this.products);
    }

    async getProducts() {
        try {
            const arrayProductos = await this.leerArchivo(); 
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer el archivo", error); 
        }

    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id); 

            if (!buscado) {
                console.log("producto no encontrado"); 
                return null; 
            } else {
                console.log("Producto encontrado"); 
                return buscado; 
            }
        } catch (error) {
            console.log("Error al buscar por id", error); 
        } 
    }

    //Métodos auxiliares: 
    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
    }

    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }

    //Método actualizar productos: 

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo(); 

            const index = arrayProductos.findIndex( item => item.id === id); 

            if(index !== -1) {
                arrayProductos[index] = {...arrayProductos[index], ...productoActualizado} ; 
                await this.guardarArchivo(arrayProductos); 
                console.log("Producto actualizado"); 
            } else {
                console.log("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al actualizar productos"); 
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo(); 

            const index = arrayProductos.findIndex( item => item.id === id); 

            if(index !== -1) {
                arrayProductos.splice(index, 1); 
                await this.guardarArchivo(arrayProductos); 
                console.log("Producto eliminado"); 
            } else {
                console.log("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al eliminar productos"); 
        }
    }

}

module.exports = ProductManager;  