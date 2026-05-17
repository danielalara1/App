# Informe Técnico: Persistencia de Datos y Arquitectura de Catálogo

Este documento consolida el análisis arquitectónico, de consultas y la auditoría de seguridad para el sistema de inventario desarrollado con PostgreSQL, Neon y Node/Express.


## 1. Arquitectura y Modelado de Datos

### ¿Qué significa que `category_id` sea una Foreign Key?

Significa que es una clave foránea o ajena. Es una columna en la tabla `products` que establece un enlace relacional directo con la columna `id` (Primary Key) de la tabla `categories`. 

Esto garantiza la integridad referencial: el motor de la base de datos actúa como un guardián y no permitirá, bajo ninguna circunstancia, que un producto sea registrado con un `category_id` que no exista previamente en la tabla de categorías.

### Análisis de Comportamiento: ON DELETE CASCADE vs ON DELETE RESTRICT

Para un sistema de catálogo y tienda de productos, el comportamiento más seguro y correcto para la regla de borrado es ON DELETE RESTRICT.

* ON DELETE CASCADE: Si un administrador borra una categoría, el motor eliminaría automáticamente y en cascada todos los productos asociados a ella de golpe. Esto es sumamente peligroso en entornos de producción, ya que un error humano podría eliminar cientos de registros de inventario e historiales de ventas de forma irreversible.

* ON DELETE RESTRICT: Impide por completo la eliminación de una categoría si todavía existen productos vinculados a ella. El motor lanza un error de restricción, obligando al usuario a reubicar o eliminar primero los productos de forma manual antes de poder dar de baja la categoría, protegiendo así la integridad del negocio.


## 2. Análisis de Consultas SQL y Agregaciones

### Diferencia Funcional: INNER JOIN vs LEFT JOIN

La elección del tipo de unión `JOIN` cambia radicalmente el resultado de los informes y las vistas de la aplicación dependiendo del caso de uso.

#### A. INNER JOIN 

Devuelve registros únicamente cuando existe una coincidencia perfecta y exacta en ambas tablas interconectadas. Si un registro de la tabla A no encuentra su pareja en la tabla B, queda completamente excluido del resultado.

* Escenario del mundo real: El catálogo público de nuestra tienda. Solo queremos mostrar en la interfaz web aquellos productos que pertenecen a una categoría válida, existente y activa. Si hay un producto "en borrador" o sin categoría asignada, el `INNER JOIN` lo oculta de forma automática para evitar que la interfaz se rompa o muestre datos incompletos al cliente.

#### B. LEFT JOIN 
Devuelve absolutamente todos los registros de la tabla de la izquierda, sin importar si tienen o no coincidencia en la tabla de la derecha. Si un registro del lado izquierdo no tiene correspondencia, los campos del lado derecho se rellenan con valores `NULL`.

* Escenario del mundo real: Un panel de administración donde listamos a todos los usuarios registrados en la plataforma para ver cuántos pedidos ha realizado cada uno `COUNT()`. Usamos un `LEFT JOIN` desde `users` hacia `orders`. De esta forma, los usuarios nuevos que se registraron ayer y aún no han comprado nada seguirán apareciendo en la lista con un conteo de `0`, en lugar de desaparecer por completo del informe, algo que ocurriría si usáramos un `INNER JOIN`.


## 3. Auditoría de Seguridad de la Base de Datos

### ¿Qué es una Inyección SQL?

Es una de las vulnerabilidades más críticas en el desarrollo de software. Ocurre cuando los datos de entrada que introduce un usuario se concatenan directamente como texto plano dentro de una cadena de instrucción SQL antes de ser enviada al motor de la base de datos.

Un atacante malintencionado puede aprovechar esto para escribir sintaxis SQL, alterando el comportamiento original de la consulta para evadir pasarelas de autenticación, robar información confidencial o destruir la base de datos.

### Prevención Absoluta mediante Consultas Parametrizadas
En este proyecto hemos mitigado y neutralizado esta vulnerabilidad por completo mediante el uso de parámetros preparados / consultas parametrizadas implementadas de forma nativa por el driver oficial de `@neondatabase/serverless`.

En nuestro endpoint de inserción , el código está estructurado de la siguiente manera:

```typescript
await sql`
  INSERT INTO products (name, price, stock, category_id)
  VALUES (${name}, ${price}, ${stock}, ${category_id})
`;