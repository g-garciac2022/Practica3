import express from 'express';
import * as productoService from './productoService.js';
import {mostrarMagos} from "./productoService.js";
import { getAllElements } from './productoService.js';

const router = express.Router();


router.use(express.json()); //G necesario para enviar JSON


let cart = [];

router.post('/add-to-cart/:id', (req, res) => {
    // Get the product ID from the request parameters
    const productId = req.params.id;

    // Find the product in your data storage
    // This is just an example, you would need to replace this with your actual code to find the product
    const product = productoService.getElementByID(productId);

    // Add the product to the cart
    cart.push(product);
    console.log(cart);

    // Send the cart as a JSON response
    res.json(cart);
});






















router.use('/public', express.static('public'));

router.get('/', (req, res) => {
    const elements = productoService.getAllElements(0,4);
    res.render('index', {elements: elements});
});

router.get('/elementos', (req, res) => {

    const from = parseInt(req.query.from); // req.query.from es 
    const to = parseInt(req.query.to);

    const elements = getAllElements(from,to);

    res.render('elementos', {elements: elements});
});

router.get('/selectproductos',(req,res) => {
    let terminoBusqueda = req.query.termino || '';
    console.log(terminoBusqueda);

    res.render('elemento',{elemento:elements.buscarProductos(terminoBusqueda)})
});


router.get('/', (req, res) => {

    res.render('index', { 
        detalles: productoService.getAllElements() 
    });
});

router.post('/pagina_detalle_grupoc', (req, res) => {

    productoService.addElement({ newNombre, newDescripcion, newPrecio, newEfectosSecundarios ,newImagen, Leche, Cacao, Avellanas });
    
    res.render('pagina_detalle_grupoc',{listaMagos: productoService.mostrarMagos()});
});

router.get('/pagina_detalle_grupoc/:id', (req, res) => {

    const elements = productoService.getElementbByID(req.params.id);

    res.render('pagina_detalle_grupoc', { elements });
});

router.get('/pagina_detalle_grupoc/:id/delete', (req, res) => {

    productoService.deleteElementByID(req.params.id);

    res.redirect('/');
});


router.get('/pagina_detalle_grupoc',(req,res) => {
    console.log(req.body);
    res.render('pagina_detalle_grupoc');
})

router.post('/pagina_detalle_grupoc/:id/GuardarMago',(req,res) => {
    let elementoID = req.params.id;
    let mago = req.body;
    productoService.addSubElement(elementoID,mago);
    res.redirect('/pagina_detalle_grupoc/' + elementoID);
})


router.get('/pagina_detalle_grupoc/:id/editar',(req,res) => {
    //Redirect to nuevoelemento/:id
    const id = req.params.id;
    res.redirect(`/${id}`);

})

router.get('pagina_detalle_grupoc/:id/delete', (req,res) => {
    const id = req.params.id;
    const borrado = productoService.deleteElementByID(id);
    if(!borrado){
        res.status(404).send('elemento no encontrado');
    }
    else{
        res.redirect('/');
    }
})

router.post('/borrado', (req,res) => {
    productoService.deleteElementByID(elementId);
    res.redirect('');
})

router.get('/mostrarMagos/:id', (req, res) => {
    let arrayMagos = productoService.mostrarMagos({ id: req.params.id }); // Corregir la sintaxis pasando un objeto con la clave 'id'
    res.render('pagina_detalle_grupoc/${req.params.id }', { magos: arrayMagos }); // Supongamos que 'nombre_de_la_vista' es el nombre de la plantilla que mostrarÃ¡ los magos
});
export default router;