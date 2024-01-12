import express from 'express';
import * as productoService from './productoService.js';
import { check, validationResult } from 'express-validator';
import { getAllElements } from './productoService.js';
import * as elementos from './productoService.js';


const router = express.Router();

router.get('/selectproductos',(req,res) => {
    let terminoBusqueda = req.query.termino || '';
    console.log(terminoBusqueda);

    res.render('elementos',{elemento:elementos.buscar(terminoBusqueda)})
});



let cart = [];


router.get('/get-cart', (_, res) => {
    const allElements =  getAllElements(); //Si se borra no aparece en el carrrito
    cart = cart.filter(item => allElements.some(element => element.id === item.id)); // <= Filtramos los elementos del carrito que existan en la base de datos
    //   

    // Send the cart as a JSON response
    
    // console.log(cart);
    res.json(cart);
});

router.post('/add-to-cart/:id', (req, res) => {
    // Get the product ID from the request parameters
    const productId = req.params.id;

    // Find the product in your data storage
    // This is just an example, you would need to replace this with your actual code to find the product
    const product = productoService.getElementByID(productId);

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        existingProduct.quantity++;
    } else {
        // If the product is not in the cart, add it
        product.quantity = 1;
        cart.push(product);
    }
    // console.log(cart);
    // Send the cart as a JSON response
    res.json(cart);
});


router.post('/decrease-quantity/:nombre', (req, res) => {
    // Get the product name from the request parameters
    const productName = req.params.nombre;
    // console.log(productName);

    // Find the product in your data storage
    const product = productoService.getElementByNombre(productName);
    // console.log(product);

    // Find the product in the cart
    
    

    if (product.quantity >= 1) {
        // console.log('found');
        // If the product is already in the cart, decrease its quantity
        product.quantity--;
        if (product.quantity === 0) {
            // If the quantity is 0, remove the product from the cart
            
            cart = cart.filter(cartItem => cartItem.newNombre !== product.newNombre);
            
            // console.log(cart);
        }
    }

    // Send the cart as a JSON response
    res.json(cart);
});


router.post('/remove', (req, res) => {
    cart = [];
    res.json(cart);
});

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


router.get('/nuevoElemento', (req, res) => {
    res.render('nuevoElemento');
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
    const borrado = productoService.deleteElementByID(req.params.id);

    if (borrado) {
        res.redirect('/');
    } else {
        res.render('pagina_error', {message_error: 'Elemento no encontrado'});
    }
});

export default router;