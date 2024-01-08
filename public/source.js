const NUM_RESULTS = 4;

let loadMoreRequests = 0;



async function loadMore(){
    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;
    const response = await fetch(`/elementos?from=${from}&to=${to}`);
    const newelementos = await response.text();
    const elementosDiv = document.getElementById("elementos");
    elementosDiv.innerHTML += newelementos;
    loadMoreRequests++;
}

async function searchProductos(event){

    event.preventDefault();
    
    const terminoBusqueda = document.getElementById("buscador").value;

    const response = await fetch(`/selectproductos?termino=${encodeURIComponent(terminoBusqueda)}`);

    const producto = await response.text();
  
    const content = document.getElementById("producto");

    content.innerHTML = producto;

}


//--------------Carrito---------------
document.getElementById('cart-button').addEventListener('click', function(event) {
    const cartContainer = document.querySelector('.container-cart-products');
    cartContainer.classList.remove('hidden');
    event.stopPropagation(); //evita repetir el evento (que el mismo click active y desactive el contenedor)
});

document.addEventListener('click', function(event) {
    const cartContainer = document.querySelector('.container-cart-products');
    const cartButton = document.getElementById('cart-button');

    // Verificar si se hizo clic fuera del contenedor del carrito y del botón del carrito
    if (!cartContainer.contains(event.target) && event.target !== cartButton) {
        // 
        cartContainer.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Variables
    // const baseDeDatos = [
    //     {
    //         id: 1,
    //         nombre: 'vertex',
    //         precio: 200,
    //         imagen: 'vertex03.jpg'
    //     },
    //     {
    //         id: 2,
    //         nombre: 'babolat',
    //         precio: 150,
    //         imagen: 'babolat.jpg'
    //     },
    //     {
    //         id: 3,
    //         nombre: 'hack02',
    //         precio: 200,
    //         imagen: 'hack.jpg'
    //     },
    // ];

    let carrito = [];
    const divisa = '€';
    const DOMelementos = document.querySelector('#elementos');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    console.log(DOMbotonVaciar);
    console.log(DOMelementos);
    console.log(DOMcarrito);
    console.log(DOMtotal);

    const miNodo =document.getElementById('father');



            miNodo.addEventListener('click', function(evento) {
                // Check if the clicked element is the one you're interested in
                if (evento.target.classList.contains('add-to-cart-button')) {
                    // Handle the event
                    console.log('A child element was clicked!');
                    anyadirProductoAlCarrito(evento);
                }
            });


    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // // Estructura
            // const miNodo = document.createElement('div');
            // miNodo.classList.add('card', 'col-sm-4');
            // // Body
            // const miNodoCardBody = document.createElement('div');
            // miNodoCardBody.classList.add('card-body');
            // // Titulo
            // const miNodoTitle = document.createElement('h5');
            // miNodoTitle.classList.add('card-title');
            // miNodoTitle.textContent = info.nombre;
            // // Imagen
            // const miNodoImagen = document.createElement('img');
            // miNodoImagen.classList.add('img-fluid');
            // miNodoImagen.setAttribute('src', info.imagen);
            // // Precio
            // const miNodoPrecio = document.createElement('p');
            // miNodoPrecio.classList.add('card-text');
            // miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // // Boton 
            // const miNodoBoton = document.createElement('button');
            // miNodoBoton.classList.add('btn', 'btn-primary');
            // miNodoBoton.textContent = '+';
            // miNodoBoton.setAttribute('marcador', info.id);
            
            const miNodoBoton = document.getElementById('add-to-cart-button');


            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            // Insertamos
            miNodoBody.appendChild(miNodoImagen);
            miNodoBody.appendChild(miNodoTitle);
            miNodoBody.appendChild(miNodoPrecio);
            miNodoBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoBody);
            DOMelementos.appendChild(miNodo);
        });
    }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    function anyadirProductoAlCarrito(evento) {
        // Anyadimos el Nodo a nuestro carrito
        carrito.push(evento.target.getAttribute('data-id'))
        console.log(carrito);
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    /**
    * Dibuja todos los productos guardados en el carrito
    */


    function renderizarCarrito() {
        // Get the cart container
        const cartContainer = document.querySelector('.container-cart-products');
    
        // Check if there are items in the cart
        if (carrito.length > 0) {
            // Prepare data for Mustache template
            const cartData = carrito.map(item => ({
                image: item.image,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
    
            // Define Mustache template
            const template = `
                {{#cartData}}
                    <div class="product" id="shop">
                        <img src="{{image}}" alt="{{name}}">
                        <p>{{name}}</p>
                        <p>{{price}}</p>
                        <p>Cantidad: {{quantity}}</p>
                    </div>
                {{/cartData}}
                <p class="text-right">Total: <span id="total"></span>&euro;</p>
                <button id="boton-vaciar" class="btn btn-danger">Vaciar</button>
            `;
    
            // Render the Mustache template
            const renderedHTML =render(template, { cartData });
    
            // Set the HTML content of the cart container
            cartContainer.innerHTML = renderedHTML;
        } else {
            // If there are no items in the cart, show a message
            cartContainer.innerHTML = '<p>No hay productos en el carrito</p>';
        }
    }
    
}
);
