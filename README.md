nazuma Foro ⚡
Un foro web completo construido con Next.js y Supabase para los fans de Inazuma Eleven. El corazón del proyecto es un Creador de Alineaciones interactivo que permite a los usuarios diseñar, publicar y discutir sus formaciones y estrategias de equipo.

Características Principales
Autenticación de Usuarios: Sistema completo de registro e inicio de sesión gestionado por Supabase Auth.

Creación de Hilos: Los usuarios pueden crear nuevos hilos de discusión (alineaciones).

Constructor de Alineaciones: Una interfaz de Drag & Drop para arrastrar jugadores desde una base de datos a una formación en el campo.

Gestión de Perfiles: Tabla profiles conectada a la autenticación para gestionar roles y estados (como baneos).

Visualización de Hilos y Posts: Consulta de datos en tiempo real desde Supabase para mostrar las alineaciones y sus respuestas.

Seguridad: Implementación de Row Level Security (RLS) en Supabase para proteger los datos (ej: solo los usuarios pueden crear hilos, los usuarios baneados no pueden postear).

Tecnologías Utilizadas
Este proyecto utiliza un stack de desarrollo moderno y escalable:

Framework: Next.js (con App Router)

Lenguaje: TypeScript

Backend y Base de Datos: Supabase

Base de Datos: PostgreSQL

Autenticación: Supabase Auth

Almacenamiento: Supabase Storage (para avatares, etc.)

Estilos: Tailwind CSS

Componentes UI: shadcn/ui

Drag & Drop: @hello-pangea/dnd

Iconos: Lucide React