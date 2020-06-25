const express = require('express')
const app = express();
const PORT = 3000;
//rutas
const UserRouter = require('./routes/users');
const MoviesRouter = require('./routes/movies');
const OrdersRouter = require('./routes/orders');


//middleware
const cors = require('./middleware/cors');

//pasamos a json el express y codifica la url
app.use(express.json());
app.use(express.urlencoded({ extended : true}))

//hacemos uso del cors para la seguridad del navegador
app.use(cors);

//rutas
app.use('/users', UserRouter);
app.use('/movies', MoviesRouter);
app.use('/orders', OrdersRouter)

//levantamos el servidor con el metodo .listen
app.listen(PORT, () => console.log('El servidor esta levantado en el puerto ' + PORT))