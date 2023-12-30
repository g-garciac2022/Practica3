import express from 'express';
import * as productoService from './productoService.js';
import { check, validationResult } from 'express-validator';
import { getAllElements } from './productoService.js';


const router = express.Router();

router.get('/', (req, res) => {
    const elements = productoService.getAllElements(0,4);
    res.render('index', {elements: elements});
});

router.get('/elementos', (req, res) => {
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const elements = getAllElements(from,to);

    res.render('elementos', {elements: elements});
});

router.use(express.static('public')); // Cargar CSS

router.get('/', (req, res) => {
    res.render('index', {elements: productoService.getAllElements()});
});

router.get('/nuevoElemento', (req, res) => {
    res.render('nuevoElemento');
});

let existingUsernames = [];

router.get('/availableElementName', (req, res) => {

    let username = req.query.username;

    let availableElementName = existingUsernames.indexOf(username) === -1;

    let response = {
        available: availableElementName
    }

    res.json(response);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const element = productoService.getElementByID(id);
    console.log(element);
    res.render('nuevoElemento', {element: element});
});

router.post('/nuevoelemento', 
    [ check('newNombre').notEmpty().withMessage('Por favor, introduce un nombre válido.'),
    check('newDescripcion').notEmpty().withMessage('Por favor, introduce una descripción.'),
    check('newPrecio').notEmpty().withMessage('Por favor, introduce un precio válido.'),
    // G: He eliminado el campo de efectos secundarios para tener un valor que no sea obligatorio
    check('newImagen1').notEmpty().withMessage('Por favor, introduce una imagen válida.'),
],
 (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Aquí puedes manejar los errores como quieras
        // Por ejemplo, puedes enviarlos de vuelta al cliente
        return res.render('nuevoElemento', { errors: errors.array() });
        }
        const newElement = productoService.newElement(req.body);
        res.redirect(`/pagina_detalle_grupoc/${newElement.id}`);
    }
);


router.get('/pagina_detalle_grupoc/:id', (req, res) => {
    const element = productoService.getElementByID(req.params.id);

    if (element) {
        res.render('pagina_detalle_grupoc', element);
    } else {
        res.render('pagina_error', {message_error: 'Elemento no encontrado'});
    }
});

router.get('/pagina_detalle_grupoc/:id/editar', (req, res) => { 
    const element = productoService.getElementByID(req.params.id);

    if (!element) {
        res.render('pagina_error', {message_error: 'Elemento no encontrado'});
    } else {
        res.render('nuevoElemento', { element: element});  // <= Pasamos el elemento a la vista
    }
});


router.post('/pagina_detalle_grupoc/:id/editar', 
 [ check('newNombre').notEmpty().withMessage('Por favor, introduce un nombre válido.'),
check('newDescripcion').notEmpty().withMessage('Por favor, introduce una descripción.'),
check('newPrecio').notEmpty().withMessage('Por favor, introduce un precio válido.'),
check('newEfectosSecundarios').notEmpty().withMessage('Por favor, introduce un efecto secundario.'),
check('newImagen1').notEmpty().withMessage('Por favor, introduce una imagen válida.'),
], (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    // Manejar los errores de validación aquí
    res.render('pagina_error', {message_error: 'Elemento no encontrado'});
}
const elementData = { // <= NUEVO Objeto 
    id: req.params.id, // <= Añadimos el id
    ...req.body // <= Operador Spread que sirve para COPIAR un objeto
};
    const newElement = productoService.editarProducto(elementData); // <= Pasamos el objeto al servicio
    res.redirect(`/pagina_detalle_grupoc/${newElement.id}`); // <= Redireccionamos a la página de detalle
}
);

// => CAMBIOS: Página_Detalle_grupoC por pagina_detalle_grupoc
router.post('/pagina_detalle_grupoc/:id/delete', (req, res) => {
    const borrado = productoService.deleteElementById(req.params.id);

    if (borrado) {
        res.redirect('/');
    } else {
        res.render('pagina_error', {message_error: 'Elemento no encontrado'});
    }
});

export default router;