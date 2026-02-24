# Sistema de Inventario - Prueba Técnica

Este es el repositorio completo del Sistema de Gestión de Inventario que incluye tanto el Frontend (Angular) como el Backend (Spring Boot).

## Información Relevante del Desarrollo

A continuación se especifican los datos técnicos relevantes bajo los que se desarrolló y configuró este proyecto:

   **IDE Utilizado: Visual Studio Code (recomendado para abrir la carpeta raíz y gestionar ambos entornos). También se puede utilizar IntelliJ IDEA para el backend de manera independiente.
   **Versiones de Lenguajes y Frameworks:**
    *   **Frontend:** TypeScript con Angular (CLI/Core versión 20.11.1 configuración local de mi entorno).
    *   **Backend:** Java 21, estructurado sobre el framework Spring Boot (versión 3.5.5).
*   **DBMS Utilizado y Versión:** 
    *   Motor de base de datos: MySQL versión 8.4.7.
    *   *Nota del conector:* Se utiliza `mysql-connector-j` en su versión 9.6.0.

---

## Lista de Pasos para Correr la Aplicación

Para desplegar la aplicación en tu entorno local, sigue el orden detallado a continuación:

### 1. Pre-requisitos de Entorno

- **Node.js y npm (para compilar y correr el frontend).
- **Angular CLI instalado globalmente (`npm install -g @angular/cli`).
- **Java Development Kit (JDK) 21.
- **Maven (usualmente integrado en los IDE o instalable de manera global).
- **MySQL Server corriendo localmente en el puerto `3306` para este caso yo usé Docker con la imagen `mysql:8.4.7`.

### 2. Configurar la Base de Datos
Antes de arrancar el backend, necesitas tener la base de datos lista para recibir las conexiones.
1. Abre tu cliente de MySQL (ej. MySQL Workbench, DBeaver o la consola de MySQL).
2. Crea una base de datos vacía llamada `inventario`.

3. Si tu usuario de MySQL tiene una contraseña distinta a `Contrasena`, debes modificar el archivo `application.properties` en el backend (`back-inventario/cadenasuministros/src/main/resources/application.properties`) y cambiar la regla:
   ```properties
   spring.datasource.password=Contrasena
   ```

### 3. Levantar el Backend (Spring Boot)
1. Abre una terminal y navega a la carpeta del backend:
   ```bash
   cd back-inventario/cadenasuministros
   ```
2. Ejecuta la aplicación usando el plugin de Maven para Spring Boot:
   ```bash
   mvn spring-boot:run
   ```
3. Espera a que la terminal muestre un mensaje de que la aplicación ha arrancado en el puerto `8080`.
   *(Spring Boot creará automáticamente las tablas necesarias en tu base de MySQL llamada `inventario`)*.

### 4. Levantar el Frontend (Angular)
1. Abre **otra** terminal y navega a la carpeta del frontend:
   ```bash
   cd front-inventario
   ```
2. Instala las dependencias de Node.js (solo es necesario la primera vez):
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Angular:
   ```bash
   ng serve
   ```
4. Una vez compilado de manera exitosa, abre tu navegador web y dirígete a:
   [http://localhost:4200/](http://localhost:4200/)

Estos son los pasos que se deben de seguir para poder ejecutar la aplicación en un entorno local.
