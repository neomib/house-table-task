# Housetable Task

### Summary
The main idea of this repository is to create a home evaluation system with relational database exposing data through API services using NodeJS + Express. The front-end uses React.

> - The **client-side** is a React app based.
> - The **server-side** is built in NodeJS (Express) and works like an API server.
> - This application uses Sequelize ORM to manage relational database and maintain it's data.

#### Server-Side
The NodeJS Express application, located in the ```/server/``` folder.

Inside it's scope use ```npm install``` to install all dependencies and ```npm start``` to run the server application after that.

> - The database is a development database at db4free.net
> - All the database connections you need (for each environment) are in ```/server/config/database.json```.

#### Client-Side
In the ```/client/``` folder we have the client-side React application.

To install npm dependencies use ```npm install``` and finally ```npm start``` to run the React application.

The UI is fully made using [Material UI](https://mui.com/material-ui/getting-started/overview/).

