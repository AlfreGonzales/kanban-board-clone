# Kanban Board Clone

Aplicación tipo **Kanban** construida en **React**, que permite gestionar tareas con roles y validaciones específicas. Incluye autenticación, selección de rol y personalización del tema.

## 🚀 Funcionalidades principales

- **Login** usando la API de Platzi, con selección de rol: **DEV** o **QA**.
- **Gestión del estado con Redux**, persistiendo datos en **LocalStorage**.
- **Tablero Kanban** con columnas y tareas cargadas desde LocalStorage.
- **Crear tareas** mediante un formulario sencillo con validaciones.
- **Actualizar tareas** haciendo clic en cualquier parte del card _excepto en el nombre_.
- **Drag & Drop**:
  - Solo se puede arrastrar haciendo clic en el **nombre** de la tarea.
  - Validaciones según el rol del usuario para mover tareas entre columnas.
- **Filtros** por nombre de tarea o usuario asignado.
- **Cambio de tema** (claro / oscuro) clic en el icono superior derecho.
- **Cerrar sesión** haciendo clic en el avatar del usuario actual.

## 🛠️ Herramientas utilizadas

- **React**
- **Redux Toolkit**
- **LocalStorage**
- **API de Platzi** para:
  - Autenticación
  - Listado de usuarios asignables

## ▶️ Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```
