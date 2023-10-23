<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' alt="Logo del Proyecto" />
</p>

# Proyecto Individual - Drivers

<p align="center">
  <img height="200" src="./client/public/f1.svg" alt="Imagen del Proyecto" />
</p>

## Descripción

Este proyecto es una Single Page Application (SPA) que proporciona información detallada sobre los pilotos de Fórmula 1 utilizando una API local. Permite realizar las siguientes acciones:

- Buscar pilotos.
- Agregar un nuevo piloto.
- Filtrar por equipos.
- Ordenar alfabéticamente y por fecha de nacimiento.

## Tecnologías Utilizadas

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [React](https://reactjs.org/)
- [Redux](https://redux.js.org)
- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [PostgreSQL](https://www.postgresql.org)
- [CSS](https://www.w3schools.com/css/)

## Requisitos para Ejecutar Localmente

Asegúrate de cumplir con los siguientes requisitos antes de ejecutar el proyecto localmente:

1. Debes tener instalado Node.js y npm. Las versiones requeridas son:

   - Node.js: 12.18.3 o superior
   - npm: 6.14.16 o superior

2. Debes tener PostgreSQL instalado en tu sistema.

3. Crea una base de datos con el nombre `"drivers"` en PostgreSQL.

4. En la carpeta `server`, crea un archivo `.env` con tus credenciales y configuraciones necesarias. Puedes seguir el siguiente formato de ejemplo:

```
DB_USER=usuario_de_base_de_datos
DB_PASSWORD=contraseña_de_base_de_datos
DB_HOST=host_de_base_de_datos
```

# Instalación

Para instalar las dependencias, utiliza el administrador de paquetes `npm`. Asegúrate de ejecutar este comando dentro de las carpetas `client` y `server` de tu proyecto:

```
npm install
```

# Ejecución Local

- En la carpeta `client`

```
npm run dev
```

- En la carpeta `server`

```
npm start
```
