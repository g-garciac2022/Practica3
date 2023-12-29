import express from 'express';
import mustacheExpress from 'mustache-express';
import bodyParser from 'body-parser';
import { __dirname } from './dirname.js';
import nuevoElementoRouter from './nuevoElementoRouter.js';
import PaginaDetalleRouter from './PaginaDetalleRouter.js';

const app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
// Configurar EJS como motor de plantillas

app.engine('html', mustacheExpress(), ".html");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../public'));

app.use('/', nuevoElementoRouter);
app.use('/', PaginaDetalleRouter);
app.use('/public', express.static('public'));

// Iniciar el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});