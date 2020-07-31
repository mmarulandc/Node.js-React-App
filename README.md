# Node.js-React-App

![image](https://user-images.githubusercontent.com/38899658/89076440-eb2cb000-d345-11ea-8375-514571c212c8.png)

# Este proyecto fue hecho en MERN stack: Mongo, Express, React.js y Node.js

# Requerimientos para correr la App localmente

* MongoDB
* Node.js

## (Anteriormente se pensaba implementar Docker para contenerizar ambas apps, tanto frontend como backend, pero por cuestiones de tiempo no es posible en esta ocasion)

# Pasos para correr la aplicación

```console
foo@bar:~$ git clone https://github.com/mmarulandc/Node.js-React-App.git
```
```console
foo@bar:~/Node.js-React-App/backend/$ npm install
```
```console
foo@bar:~/Node.js-React-App/frontend/$ npm install
```

```console
foo@bar:~/Node.js-React-App/backend/$ npm start
```
```console
foo@bar:~/Node.js-React-App/frontend/$ npm start
```
* Luego ingresamos a http://localhost:3000/

![image](https://user-images.githubusercontent.com/38899658/89077515-f7b20800-d347-11ea-8074-c2f8afadd7d0.png)

# Implementaciones

* Autenticación con Passport.js en el backend.
* Utilización de State Components con React.
* Algunos test de la api implementados con Mocha y la librería Chai con asserts.
* Usamos variables de ambiente para mantener secretos lejos del usuario.
* Se intentó agregar paginación, pero por cuestiones de tiempo no fue implementada.
* Se planeó implementar algun sistema de CI, pero por cuestiones de tiempo, no fue implementado.

# Cómo correr las pruebas?
```console
foo@bar:~/Node.js-React-App/backend/$ npm test
> Node.js-React-App@1.0.0 test C:\Users\Marulord\Documents\pruebas-tecnicas\evolution\Node.js-React-App\backend
> mocha --reporter spec --exit

App listening in port 4000


Connected to DB test
  API tests
DB is connected
POST /api/auth/signup 422 20.639 ms - 42
    √ Must return email error on response /api/auth/signup (48ms)
POST /api/auth/signup 200 153.244 ms - 64
    √ Must return success message on response /api/auth/signup (161ms)
POST /api/auth/login 200 113.458 ms - 296
    √ Must return token on response /api/auth/login (118ms)
POST /api/task/add 200 8.094 ms - 33
    √ Must return success on response /api/task/add


  4 passing (391ms)
```

# Endpoints
## Algunos metodos fueron implementados por HTTP POST para facilitar uso del body de la petición
## api/task:
* /add => protegido con JWT HTTP POST
* /getAll => protegido con JWT HTTP POST
* /delete => protegido con JWT HTTP DELETE
* /getTaskInfo => protegido con JWT HTTP POST
* /checkTaskDates => protegido con JWT HTTP POST
* /editTask => protegido con JWT HTTP PUT

## api/auth:
* /signup HTTP POST
* /login HTTP POST


### cualquier duda comunicarse conmigo a mi correo personal: marulandamateo@gmail.com

