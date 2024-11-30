# 🎨 SmartMemo AI - Frontend

<div align="center">
  <img src="path/to/your/logo.png" alt="SmartMemo AI Logo" width="200"/>
  <p>Transforma tus reuniones en conocimiento accionable con una interfaz moderna y elegante</p>
</div>

## 📖 Tabla de Contenidos
- [✨ Características](#-características)
- [🚀 Tecnologías](#-tecnologías)
- [📋 Requisitos](#-requisitos)
- [🛠️ Instalación](#️-instalación)
- [🔑 Configuración](#-configuración)
- [📁 Estructura](#-estructura)
- [🎯 Uso](#-uso)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)
- [👥 Autores](#-autores)

## ✨ Características

### 🎯 Gestión de Reuniones
- **Creación y Edición**
  - Formularios intuitivos para gestionar reuniones
  - Validación en tiempo real
  - Selección de fecha y hora con calendario integrado

- **Transcripciones**
  - Visualización clara de transcripciones
  - Identificación de participantes
  - Búsqueda y filtrado de contenido

- **Audio**
  - Grabación en tiempo real
  - Carga de archivos de audio
  - Integración con AWS S3

### 🎨 Interfaz de Usuario
- **Diseño Moderno**
  - Tema personalizado con Tailwind CSS
  - Modo claro/oscuro (próximamente)
  - Animaciones y transiciones suaves

- **Responsive**
  - Diseño mobile-first
  - Navegación adaptativa
  - Optimización para todos los dispositivos

### 🔐 Seguridad
- **Autenticación**
  - Login y registro de usuarios
  - Recuperación de contraseña
  - Persistencia de sesión

- **Autorización**
  - Rutas protegidas
  - Manejo de roles
  - Tokens JWT

## 🚀 Tecnologías

- **Core**
  - React 18
  - Vite
  - React Router 6

- **Estilos**
  - Tailwind CSS
  - PostCSS
  - CSS Modules

- **Estado y Datos**
  - Context API
  - Axios
  - WebSocket

- **Utilidades**
  - React Hook Form
  - Date-fns
  - UUID

## 📋 Requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0


## 🛠️ Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/manuelcastro95/smartmemo-ai-frontend.git
cd smartmemo-ai-frontend
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

4. **Iniciar la aplicación**

```bash
npm run dev # Desarrollo
npm run build # Producción
npm run preview # Previsualizar build
```

## 🔑 Configuración

### Variables de Entorno

API
- VITE_API_URL=http://localhost:5000/api
- VITE_WS_URL=ws://localhost:5000


App
- VITE_APP_NAME=SmartMemo AI
- VITE_APP_VERSION=1.0.0

## 📁 Estructura

src/
├── components/          # Componentes reutilizables
│   ├── Button/
│   ├── Navbar/
│   └── Form/
├── context/            # Contextos de React
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── pages/              # Componentes de página
│   ├── Dashboard/
│   ├── Meeting/
│   └── Auth/
├── services/           # Servicios API
│   ├── api.js
│   └── auth.js
├── styles/             # Estilos CSS
│   ├── globals.css
│   └── components/
├── assets/             # Recursos estáticos
│   ├── images/
│   └── icons/


## 🎯 Uso

### Autenticación

```jsx
import { useAuth } from '../context/AuthContext';
function LoginPage() {
    const { login } = useAuth();
    const handleLogin = async (credentials) => {
        await login(credentials);
    };
}
```

### Creación de Reuniones

```jsx
import { createMeeting } from '../services/meetingService';
function MeetingForm() {
    const handleSubmit = async (data) => {
        await createMeeting(data);
    };
}
```


### Transcripción de Audio

```jsx
import { AudioTranscription } from '../components';
function MeetingDetail() {
    return (
    <AudioTranscription
        meetingId={id}
        onTranscriptionComplete={handleComplete}
        />
    );
}
```


## 🤝 Contribución

1. Fork el repositorio
2. Crea tu rama de feature
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit tus cambios
   ```bash
   git commit -m 'Add: Amazing Feature'
   ```
4. Push a la rama
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Abre un Pull Request

### Guías de Contribución

- Sigue el estilo de código existente
- Actualiza el README.md con los detalles de los cambios
- Aumenta los números de versión en los archivos de ejemplo
- El PR será fusionado una vez revisado

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👥 Autores

- **Manuel Castro**  - [manuelcastro95](https://github.com/manuelcastro95)

## 🙏 Agradecimientos

- React y el equipo de Vite por las excelentes herramientas
- Tailwind CSS por el increíble framework de estilos
- Todos los contribuyentes que ayudan a mejorar este proyecto

## 📊 Estado del Proyecto

![GitHub stars](https://img.shields.io/github/stars/manuelcastro95/smartmemo-ai-frontend)
![GitHub forks](https://img.shields.io/github/forks/manuelcastro95/smartmemo-ai-frontend)
![GitHub issues](https://img.shields.io/github/issues/manuelcastro95/smartmemo-ai-frontend)
![GitHub license](https://img.shields.io/github/license/manuelcastro95/smartmemo-ai-frontend)

---

<div align="center">
  ⌨️ con ❤️ por <a href="https://github.com/manuelcastro95">Manuel Castro</a>
</div>