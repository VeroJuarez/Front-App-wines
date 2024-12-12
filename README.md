#Proyecto de Gestión de vinos

Este es un proyecto de gestión de vinos que permite a los usuarios ver, agregar, editar y eliminar productos (vinos) en una tienda virtual. El proyecto consta de un fronted en HTML, CSS, JavaScript y utiliza Bootstrap para el diseño responsive.

##Descripción
La aplicación permite gestionar una lista de vinos, donde los usuarios pueden:
- Ver todos los ´roductos (vinos).
- Agregar un nuevo producto (vino) a la tienda.
- Editar un producto (vino) existente.
- Eliminar productos de la lista.

Adem{as, los usuarios pueden subir una imagen en formato Base64 al agregar o editar un producto.

##Requisitos.
Herramientas necesarias para el frontend
Antes de comenzar, asegúrate de tener las siguientes herraminetas instaladas:
1. Navegador web (Google Chrome, Firefox, etc.)
2. Editor de texto o IDE (Visual Studio Code es una opción recomendada)

##Intalación
1. Clonar el repositorio:
   Abre una terminal y ejecuta el siguiente comando para clonar este repositorio:
   git clone https://github.com/VeroJuarez/Front-App-wines.git
2. Abrir el proyecto:
   Abre el proyecto en tu editor de texto favorito

##Uso
1. Abre el archivo index.html en yu navegador
2. Navega por la aplicación, agrega, edita o elimina vinos
3. Las imágenes de los productos se cargan como Base64 para facilitar la visualización y edición

##Estructura del proyecto
La estructura de directorios es la siguente:
```
/App-wines
│
├── index.html            # Página principal con la lista de vinos         
├── style.css             # Estilos personalizados
├── package.json          # Este archivo tiene la configuración de como interactuar la aplicación
├── imagenes              # Esta carpeta tiene las imagenes de los productos (vinos)
├── js                    # Esta carpeta tiene el archivo .js
    ├── app.js            # Este archivo tiene la lógica principal en JavaScript
└── README.md             # Este archivo de documentación
```

##Funcionalidades
- Visualización de productos: Los vinos son listados en una tabla con sis detalles(nombre, precio, stock, tipo)
- Agregar vino: Permite a los usuarios agregar un nuevo vino con su nombre, precio, stock, tipo y una imagen en formato Base64
- Editar vino: Los usuarios pueden editar el nombre, precio, stock, tipo y la imagen de un vino ya existente
- Eliminar vino: Permite eliminar productos de la lista
