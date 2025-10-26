
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



<p align="center"> Creado con 🔥 y ⚽ por <a href="https://github.com/julexo">julexo</a> </p>