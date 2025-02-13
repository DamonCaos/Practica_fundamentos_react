# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

Nodepop es una aplicación web para comprar y vender artículos. Permite a los usuarios registrarse, iniciar sesión y gestionar anuncios de productos, incluyendo la funcionalidad de filtrado, creación, edición y eliminación.

---

## 🚀 Tecnologías utilizadas
- ⚛ **Frontend:** React + TypeScript + CSS Modules
- ⚡ **Backend:** Node.js con API REST
- 📦 **Gestor de paquetes:** npm
- 🏗 **Construcción:** Vite
- 💅 **Estilos:** CSS Modules con diseño responsive

---

## 📥 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tu-repo-nodepop.git
cd tu-repo-nodepop
2️⃣ Instalar dependencias
Ejecuta el siguiente comando en la raíz del proyecto:

bash
Mostrar siempre los detalles

Copiar
npm install
3️⃣ Configurar el backend
Asegúrate de tener el backend corriendo. Si estás usando sparrest.js:
bash
Mostrar siempre los detalles

Copiar
npm install -g sparrest
sparrest
Si usas un backend personalizado, asegúrate de ejecutarlo en http://localhost:3001.
▶️ Ejecutar la aplicación
Para iniciar el frontend en modo desarrollo:

bash
Mostrar siempre los detalles

Copiar
npm run dev
Accede a http://localhost:5173/ en tu navegador.

🛠 Configuración del entorno
Si el backend necesita un token de autenticación, guárdalo en sessionStorage o localStorage al iniciar sesión.

🖥 Funcionalidades
✅ Registro e inicio de sesión
✅ Listado de anuncios con filtros avanzados
✅ Creación, edición y eliminación de anuncios
✅ Protección de rutas con autenticación
✅ Interfaz responsive y moderna

📂 Estructura del proyecto
bash
Mostrar siempre los detalles

Copiar
📦 tu-repo-nodepop
├── 📂 src
│   ├── 📂 components    # Componentes reutilizables
│   ├── 📂 layouts       # Layout principal
│   ├── 📂 pages         # Páginas de la app
│   ├── 📂 styles        # CSS Modules
│   ├── 📂 context       # Context API (Auth)
│   ├── App.tsx         # Configuración principal de rutas
│   ├── main.tsx        # Punto de entrada
│   ├── vite.config.ts  # Configuración de Vite
├── 📄 package.json
├── 📄 README.md


# 📌 Nodepop - Advert Management App

Nodepop es una aplicación web para la gestión de anuncios de compra y venta, desarrollada con **React**, **TypeScript** y **CSS Modules**, con un backend basado en **Node.js** y una API REST.

## 🚀 Características
- 📋 Listado de anuncios con paginación.
- 🔍 Filtros avanzados (nombre, tipo, precio y tags).
- 🆕 Creación, edición y eliminación de anuncios.
- 🔐 Autenticación de usuario con JWT.
- 🖥️ Diseño responsivo y estilizado con **CSS Modules**.

---

## 📦 Instalación y configuración

### **1️⃣ Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio
2️⃣ Instalar dependencias
Ejecuta:

bash
Copiar
npm install
3️⃣ Configurar el entorno
Crea un archivo .env en la raíz del proyecto.
Agrega las siguientes variables (ajustándolas según el backend):
env
Copiar
VITE_API_URL=http://localhost:3001/api/v1
4️⃣ Iniciar la aplicación
Ejecuta:

bash
Copiar
npm run dev
Tu aplicación estará disponible en: http://localhost:5173

🔑 Autenticación
Los usuarios deben iniciar sesión para acceder a ciertas secciones.
El token JWT se almacena en localStorage o sessionStorage.
🎨 Estilos y diseño
CSS Modules para modularización de estilos.
Diseño responsivo con flexbox y grid.
Animaciones y transiciones CSS.
📄 API Endpoints usados
Método	Endpoint	Descripción
GET	/api/v1/adverts	Obtener lista de anuncios
POST	/api/v1/adverts	Crear un nuevo anuncio
GET	/api/v1/adverts/:id	Obtener detalle de un anuncio
PUT	/api/v1/adverts/:id	Editar un anuncio existente
DELETE	/api/v1/adverts/:id	Eliminar un anuncio
🛠️ Tecnologías utilizadas
React + Vite ⚡
TypeScript 🟦
CSS Modules 🎨
React Router 🔀
Axios 📡
Node.js + Express (Backend) 🟢
📝 Autor
👤 Tu Nombre 📧 Contacto: tu-email@example.com

📜 Licencia
Este proyecto está bajo la licencia MIT.
