# sios-core-api-services
![Arquitectura](https://trello-attachments.s3.amazonaws.com/5a05e8a301acd90fa4e882b3/5a2041ef4f29452f2d4cff82/d22a406976bbcc57c5206831c1022dfa/imagen.png)

## Descripción
Este servicio es el encargado de autorizar todas las peticiones realizados por los distintos usuarios a nuestras apis.  

### Como liberar los cambios: 

- Inicie sesión en el servidor 

- Ir al directorio del proyecto 
    
      cd /var/www/sios-asistencial-admisiones-services

- Obtenga los últimos cambios  `Esto depende del ambiente que al cual se estén liberando los cambios (dev-branch, test-site or master(producción)`

      git checkout master
      git pull

- Descargar e instalar las dependencias 

      cd api
      npm install
      cd ..

- Iniciar y guardar el proceso pm2

      pm2 start pm2.process.yml    
      pm2 save

### Como realizar los test: 

- Ir al directorio del api 
    
      cd api

- Ejecutar los test
    
      npm test

- Revisar los resultados `Todo deberia estar Ok`
![Test](https://trello-attachments.s3.amazonaws.com/5a05e8a301acd90fa4e882b3/5a2041ef4f29452f2d4cff82/a9d976ea299207403fd4495a9969d3dd/imagen.png)

- Ejecutar el coverage
    
      npm run coverage

- Revisar los resultados `Todo debería estar Ok y mínimo en 90%`
![coverage](https://trello-attachments.s3.amazonaws.com/5a05e8a301acd90fa4e882b3/5a2041ef4f29452f2d4cff82/105e09c60412f462905a651122cabdfd/imagen.png)

### Como ejecutar con Docker
- Inicie sesión en el servidor 

- Ir al directorio del proyecto 
    
      cd /var/www/sios-core-api-services

- Iniciar el contenedor de docker
      
      docker-compose up --build

## Stack Tecnológico
1.	NodeJs versión v10.15.3 o superior.
2.	Nginx
3.	Mongo-DB
4.	Docker
