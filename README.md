
<p align="center">
  <img src="public/logo.png" width="120" alt="Logo del Foro">
</p>

<h1 align="center"> Inazuma Foro ⚡⚽ </h1>

<p align="center"> El foro definitivo para crear, compartir y discutir alineaciones del universo Inazuma Eleven. </p>

<p align="center"> <a href="https://nextjs.org/"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"> </a> <a href="https://supabase.com/"> <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"> </a> <a href="https://www.typescriptlang.org/"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"> </a> <a href="https://tailwindcss.com/"> <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"> </a> </p>

<p align="center"> <a href="#demo">Ver Demo</a> · <a href="#%EF%B8%8F-características-clave">Características</a> · <a href="#-instalación">Instalación</a> </p>

📖 Sobre el Proyecto
Este proyecto es un foro web completo construido desde cero con el App Router de Next.js y Supabase como backend. La funcionalidad estrella es un Creador de Alineaciones interactivo que permite a los usuarios diseñar visualmente sus formaciones soñadas usando un sistema de drag-and-drop, para luego publicarlas y discutirlas con la comunidad.

✨ Características Clave
⚡ Creador de Alineaciones: Interfaz de Drag & Drop para arrastrar jugadores desde una base de datos de jugadores a posiciones en el campo.

🔐 Autenticación Segura: Sistema completo de registro e inicio de sesión gestionado por Supabase Auth.

🛡️ Seguridad RLS: Implementación de Row Level Security (RLS) para un control granular de los permisos (ej: solo usuarios activos pueden postear, los admins pueden banear).

✍️ Foros Dinámicos: Creación y visualización de hilos y posts, con datos obtenidos directamente de la base de datos PostgreSQL de Supabase.

🎨 Diseño Moderno: Interfaz de usuario limpia y responsiva construida con Tailwind CSS y shadcn/ui.

🔩 Base de Datos Relacional: Estructura de tablas (profiles, threads, posts) conectadas con claves foráneas para mantener la integridad de los datos.

## 🚀 Stack Tecnológico

* **Framework:** [Next.js (App Router)](https://nextjs.org/)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
* **Backend (BaaS):** [Supabase](https://supabase.com/)
    * **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)
    * **Autenticación:** [Supabase Auth](https://supabase.com/docs/guides/auth)
    * **Seguridad:** [Row Level Security (RLS)](https://supabase.com/docs/guides/database/row-level-security)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
* **Drag & Drop:** [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
* **Iconos:** [Lucide React](https://lucide.dev/)
* **Control de Versiones:** [Git](https://git-scm.com/) & [GitHub](https://github.com/)

## 🔧 Instalación y Puesta en Marcha

Sigue estos pasos para levantar el proyecto en tu máquina local.

### 1. Prerrequisitos

* [Node.js](https://nodejs.org/es/) (v18 o superior)
* [Git](https://git-scm.com/)
* Una cuenta gratuita de [Supabase](https://supabase.com)

### 2. Clonar el Repositorio

```bash
git clone [https://github.com/julexo/inazuma-foro.git](https://github.com/julexo/inazuma-foro.git)
cd inazuma-foro
```
## 🔧 Instalación y Puesta en Marcha

Sigue estos pasos para levantar el proyecto en tu máquina local y empezar a desarrollar:

### 1️⃣ Prerrequisitos

Asegúrate de tener instaladas las siguientes herramientas:

* **[Node.js](https://nodejs.org/es/)** (v18 o superior recomendado)
* **[Git](https://git-scm.com/)**
* Una cuenta gratuita de **[Supabase](https://supabase.com)**

### 2️⃣ Clonar el Repositorio

Abre tu terminal y clona el proyecto:
<p align="center">
  <img src="C:\Users\HomePC\Pictures\Screenshots\clonar.png" width="120" alt="Imagen de clonar en shell">
</p>



### 3️⃣ Instalar Dependencias
Instala todas las librerías necesarias con npm:

<p align="center">
  <img src="C:\Users\HomePC\Pictures\Screenshots\dependecias.png" width="120" alt="Instalar dependencia">
</p>


### 4️⃣ Configurar Supabase Backend ☁️
Este es el paso más crucial para conectar tu foro a la base de datos:

🚀 **Crear Proyecto:** Ve a [Supabase](https://supabase.com) y crea un nuevo proyecto.

📝 **Configurar Tablas:**

1. Navega al "Table Editor".

2. **Crea las tablas:** profiles, threads, posts (y las que necesites en el futuro).

**Importante: La tabla threads debe tener una columna formation_data (tipo jsonb). La tabla profiles debe tener role y status (tipo text).**

🔗 **Añadir Trigger de Perfil:**

1. Ve al "SQL Editor".

2. Ejecuta el script SQL que encontrarás en el archivo **[`SETUP.md`](./SETUP.md)** para crear perfiles automáticamente.

**🛡️Configurar RLS (Row Level Security):**

1. Activa RLS en todas tus tablas sensibles (profiles, threads, posts).

2. Añade las políticas necesarias para permitir SELECT, INSERT, etc., según los permisos de usuario (ej: solo usuarios logueados pueden crear hilos).

### 5️⃣ Variables de Entorno 🔑
1. Conecta tu proyecto local con tu backend de Supabase:

2. Busca tus claves API en "Configuración > API" dentro de tu proyecto Supabase.

3. En la raíz de tu proyecto "inazuma-foro", crea un archivo llamado .env.local.

4. Pega tus claves dentro del archivo:

# .env.local

NEXT_PUBLIC_SUPABASE_URL="PEGA_TU_URL_DE_SUPABASE_AQUI"
NEXT_PUBLIC_SUPABASE_ANON_KEY="PEGA_TU_LLAVE_ANON_PUBLICA_AQUI"

**(Recuerda reiniciar el servidor si ya estaba corriendo después de crear este archivo).**

### 6️⃣ ¡A Correr! 🏃
Inicia el servidor de desarrollo de Next.js:


**🎉 ¡Abre http://localhost:3000 en tu navegador y disfruta del foro! 🎉**
<p align="center">
  <img src="C:\Users\HomePC\Pictures\Screenshots\correr.png" width="120" alt="npm run dev">
</p>

<p align="center"> Creado con 🔥 y ⚽ por <a href="https://github.com/julexo">julexo</a> </p>