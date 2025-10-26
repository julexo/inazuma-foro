# Configuración del Trigger de Perfiles de Usuario en Supabase

Este script SQL es esencial para asegurar que cada vez que un nuevo usuario se registra a través de Supabase Auth, se cree automáticamente una entrada correspondiente en tu tabla `public.profiles`.

## Instrucciones

1.  Asegúrate de haber creado primero tu tabla `public.profiles` con al menos las columnas `id` (tipo `uuid`, clave primaria, enlazada a `auth.users.id`), `username` (tipo `text`), `role` (tipo `text`) y `status` (tipo `text`).
2.  Ve al **SQL Editor** en tu panel de Supabase.
3.  Copia y pega el siguiente código completo.
4.  Haz clic en el botón **RUN**.

## Script SQL

```sql
-- Script para crear el trigger handle_new_user

-- 1. Define la función que se ejecutará al crear un usuario nuevo
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserta una nueva fila en la tabla 'profiles'.
  -- Asegúrate de que tu tabla 'profiles' tenga estas columnas.
  INSERT INTO public.profiles (id, username, role, status)
  VALUES (
    new.id,       -- Copia el ID del nuevo usuario desde auth.users
    new.email,    -- Usa el email como 'username' inicial (puedes cambiarlo)
    'user',       -- Asigna el rol 'user' por defecto
    'active'      -- Asigna el estado 'active' por defecto
  );
  RETURN new;     -- Devuelve el nuevo registro de auth.users (requerido por el trigger)
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; -- 'SECURITY DEFINER' permite a la función escribir en 'public.profiles'

-- 2. Elimina el trigger antiguo (si existe) para evitar errores al re-ejecutar
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. Crea el trigger que llama a la función DESPUÉS de insertar en auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users       -- Se activa después de que un usuario se inserte en la tabla de autenticación
  FOR EACH ROW                     -- Se ejecuta una vez por cada nuevo usuario
  EXECUTE PROCEDURE public.handle_new_user(); -- Llama a la función que hemos definido arriba

-- Mensaje de éxito (opcional, para el editor SQL)
SELECT 'Trigger handle_new_user creado/actualizado correctamente.';