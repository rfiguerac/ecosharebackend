# 🌍 EcoShare - Plataforma de Donación de Bienes

EcoShare es una aplicación web cliente-servidor que conecta **donantes** y **receptores** de bienes no usados (alimentos, muebles, ropa, libros y más).  
Su objetivo es fomentar la **donación responsable** y la **reutilización de recursos**, construyendo una comunidad solidaria y comprometida.

---

## 🚀 Características principales
- Registro y autenticación de usuarios.
- Publicación de donaciones con imágenes, estado y categoría.
- Búsqueda avanzada con filtros y geolocalización.
- Chat interno en tiempo real entre donantes y receptores.
- Panel administrativo para gestión de usuarios, donaciones y reportes.

---

## 🛠️ Tecnologías utilizadas
**Frontend**
- React + TypeScript  
- Tailwind CSS + DaisyUI  
- Vite  

**Backend**
- Node.js + Express  
- Prisma (ORM) + PostgreSQL  
- WebSockets (chat y notificaciones)  
- Docker (contenedores y despliegue)  

**Servicios externos** 
- Zustand

---

## 📂 Estructura del proyecto
- Ecoshare/ → Frontend (React + TS)
- Ecosharebackend/ → Backend (Node + Express + Prisma)

---

## ⚙️ Instalación y uso

### 1. Clonar repositorios
- git clone https://github.com/rfiguerac/ecoshare.git
- git clone https://github.com/rfiguerac/ecosharebackend.git

### 2. Configuración del backend
- cd ecosharebackend
- cp .env.template .env  
- npm install
- npm run dev\
La API estará disponible en: http://localhost:3002

### 3. Configuración del frontend
- cd ecoshare
- npm install
- npm run dev\
La app estará disponible en: http://localhost:5173

---

## 🔗 Endpoints
- 📡 **POST** `/auth/register` → Registro de usuario  
- 🔑 **POST** `/auth/login` → Inicio de sesión  
- 🎁 **GET** `/donations` → Listar donaciones  
- ➕ **POST** `/donations` → Crear donación  
- 💬 **POST** `/chat/message` → Enviar mensaje  
- 👥 **GET** `/admin/users` → Gestión de usuarios (admin)  

---

## 🗺️ Roadmap
- **Etapa 1 (MVP):** Registro/login, perfiles, donaciones básicas, búsqueda, chat y panel admin.  
- **Etapa 2:** Alertas personalizadas, moderación, métricas y mejoras UX/UI.  
- **Etapa 3:** Escalabilidad, seguridad avanzada y despliegue en la nube.  

---

## 🤝 Contribución
- Haz un **fork** del repositorio.  
- Crea una **rama** (`feature/nueva-funcionalidad`).  
- Haz commit siguiendo **Conventional Commits**.  
- Envía un **Pull Request** a la rama `dev`.  
