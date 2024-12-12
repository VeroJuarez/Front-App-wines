const API_URL = 'http://localhost:5000/api/productos';

// Funciones CRUD para productos cargados desde el servidor
async function cargarProductos() {
    const response = await fetch(API_URL);
    const productos = await response.json();
    const tbody = document.getElementById('productosTabla');
    tbody.innerHTML = '';

    console.log(productos);
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>${producto.tipo}</td>
            <td><img src="${producto.imagen || ''}"style="width: 50px; height: 50px; object-fit: cover;"></td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarProducto(${producto.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

//Inicializar la tabla al cargar la página
document.addEventListener('DOMContentLoaded',cargarProductos);

const formProducto = document.getElementById('formProducto');
const tablaProductos = document.getElementById('productosTabla');
let productoEnEdicion = null; //variable para almacenar el producto que se está editando

//Funcion para convertir las imagenes a base64
function convertirImagenABase64(file){
    return new Promise((resolve,reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file); 
    });
}

//Agregar o actualizar un producto
formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombreVino').value;
    const precio = Number(document.getElementById('precio').value);
    const stock = Number(document.getElementById('stock').value);
    const tipo = document.getElementById('tipo').value;
    const imagenInput = document.getElementById('imagen');
    const previewImagen = document.getElementById('previewImagen');
    let imagenBase64;

    if(imagenInput.files[0]){
        imagenBase64 = await convertirImagenABase64(imagenInput.files[0]);
    }else if(previewImagen.getAttribute('src')){
        imagenBase64 = previewImagen.getAttribute('src');
    }

    const producto = { nombre, precio, stock, tipo, imagen: imagenBase64};

    if(productoEnEdicion){
        //Actualizar producto existente
        await fetch(API_URL + '/' + productoEnEdicion.id,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(producto)
        });
        productoEnEdicion = null;
        document.querySelector('button[type="submit"]').textContent = 'Guardar Producto';
    }else{
        //Agregar nuevo producto
        await fetch(API_URL,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(producto)
    });
}
    formProducto.reset();
    cargarProductos();
});

formProducto.addEventListener('reset', async (e) => {
    const previewImagen = document.getElementById('previewImagen');
    previewImagen.removeAttribute('src');
    previewImagen.style.display = 'none';
    productoEnEdicion = null;
    document.querySelector('button[type="submit"]').textContent = 'Guardar Producto';
    document.querySelector('button[type="reset"]').style.display = 'none';
    document.querySelector('.card-title').innerHTML = 'Agregar Producto';
});

// Editar producto
async function editarProducto(id) {
    const response = await fetch(API_URL);
    const productos = await response.json();
    productoEnEdicion = productos.find(p => p.id === id);

    if(productoEnEdicion) {
        document.getElementById('nombreVino').value = productoEnEdicion.nombre;
        document.getElementById('precio').value = productoEnEdicion.precio;
        document.getElementById('stock').value = productoEnEdicion.stock;
        document.getElementById('tipo').value = productoEnEdicion.tipo;
        document.getElementById('previewImagen').setAttribute('src', productoEnEdicion.imagen);
        document.querySelector('button[type="submit"]').textContent = 'Actualizar Producto';
        document.querySelector('button[type="reset"]').style.display = 'inline';
        previewImagen.style.display = 'block';
        document.querySelector('.card-title').innerHTML = 'Editar Producto';
    }
}

//Eliminar un producto
async function eliminarProducto(id) {
    await fetch(`${API_URL}/${id}`,{ method: 'DELETE' });
    cargarProductos();
}


