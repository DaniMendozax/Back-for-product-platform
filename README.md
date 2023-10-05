# API de Inventario para Comercio Electrónico

Este proyecto es una API RESTful diseñada para gestionar productos y usuarios en un sistema de comercio electrónico. Permite la autenticación de administradores y clientes, brindando diferentes niveles de acceso y funcionalidad.

## Instrucciones de Uso

Clona este repositorio:

		git clone URL_DEL_REPOSITORIO


Asegúrate de tener Node.js y npm instalados en tu sistema.Preferible las versiones 18.18.o para node y 10.2.0 para npm

Las siguientes bibliotecas se utilizan como dependencias:
  
bcrypt: Usado para cifrar contraseñas de usuarios de forma segura.

express: Un marco de aplicación web de Node.js para el desarrollo de APIs y aplicaciones web.

jsonwebtoken: Para la autenticación y autorización de usuarios a través de tokens JWT.

morgan: Middleware para registrar solicitudes HTTP en Express.js.

mysql2: Facilita la comunicación con bases de datos MySQL en aplicaciones Node.js.

sequelize: Un ORM para Node.js que simplifica la interacción con bases de datos relacionales.

uuid: Para la generación y manipulación de identificadores únicos (UUIDs) en la aplicación.

Instalar las dependencias con:

 		npm install

Despues de instaladas las dependencias ejecuta el proyecto utilizando el siguiente comando:

		npm start

Si deseas ejecutar el proyecto en modo dev ejecuta:

		npm run dev



