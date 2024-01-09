const NUM_RESULTS = 4;

let loadMoreRequests = 0;



async function loadMore() {
    const from = (loadMoreRequests + 1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;
    const response = await fetch(`/elementos?from=${from}&to=${to}`);
    const newelementos = await response.text();
    console.log(newelementos);
    const elementosDiv = document.getElementById("elementos");
    elementosDiv.innerHTML += newelementos;
    loadMoreRequests++;
}

async function buscarProductos(event) {

    event.preventDefault();

    const terminoBusqueda = document.getElementById("buscador").value;

    const response = await fetch(`/selectproductos?termino=${encodeURIComponent(terminoBusqueda)}`);

    const elemento = await response.text();

    const content = document.getElementById("elemento");

    content.innerHTML = elemento;

}


//--------------Carrito---------------
document.getElementById('cart-button').addEventListener('click', function (event) {
    const cartContainer = document.querySelector('.container-cart-products');
    cartContainer.classList.remove('hidden');
    event.stopPropagation(); //evita repetir el evento (que el mismo click active y desactive el contenedor)
});

document.addEventListener('click', function (event) {
    const cartContainer = document.querySelector('.container-cart-products');
    const cartButton = document.getElementById('cart-button');

    // Verificar si se hizo clic fuera del contenedor del carrito y del botón del carrito
    if (!cartContainer.contains(event.target) && event.target !== cartButton) {
        // 
        cartContainer.classList.add('hidden');
    }
});




// document.getElementById('add-to-cart-button').addEventListener('click', function () {
//     console.log('a');
//     const productId = this.dataset.id;

//     fetch(`/add-to-cart/${productId}`, {
//         method: 'POST'
//     })
//         .then(response => response.json()) // Convert the response data to JSON
//         .then(cart => {
//             // Do something with the cart...
//         });
// });


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

    const miNodo = document.getElementById('father');



    miNodo.addEventListener('click', function (evento) {
        // Check if the clicked element is the one you're interested in
        if (evento.target.classList.contains('add-to-cart-button')) {
            // Handle the event
            console.log('A child element was clicked!');
            const productId = (evento.target.getAttribute('data-id'));
            console.log(productId);
            fetch(`/add-to-cart/${productId}`, {
                method: 'POST'
            })
                .then(response => response.json()) // Convert the response data to JSON
                .then(cart => {
                    console.log(cart.length);
                    const product = cart[cart.length - 1];

                    // Create a new product object with the data from the response
                    const Product = {
                        nombre: product.newNombre,
                        precio: product.newPrecio,
                        image1: product.newImage1
                    };

                    console.log(product.newNombre);
                    console.log(product.newPrecio);
                    console.log(product.newImage1);

                    // Check if the product is already in the cart
                    const existingProduct = carrito.find(item => item.nombre === Product.nombre);

                    if (existingProduct) {
                        // If the product is already in the cart, increase its quantity
                        existingProduct.quantity++;
                        
                    } else {
                        // If the product is not in the cart, add it
                        Product.quantity = 1;
                        carrito.push(Product); 
                        console.log('added')// Add the product to the cart
                    }

                    console.log(carrito);
                    renderizarCarrito();
                });
                
            


        }
    });


    // Funciones

    /**
    * Dibuja todos los productos a partir de la base de datos. No confundir con el carrito
    */
    // function renderizarProductos() {
    //     baseDeDatos.forEach((info) => {
    //         // // Estructura
    //         // const miNodo = document.createElement('div');
    //         // miNodo.classList.add('card', 'col-sm-4');
    //         // // Body
    //         // const miNodoCardBody = document.createElement('div');
    //         // miNodoCardBody.classList.add('card-body');
    //         // // Titulo
    //         // const miNodoTitle = document.createElement('h5');
    //         // miNodoTitle.classList.add('card-title');
    //         // miNodoTitle.textContent = info.nombre;
    //         // // Imagen
    //         // const miNodoImagen = document.createElement('img');
    //         // miNodoImagen.classList.add('img-fluid');
    //         // miNodoImagen.setAttribute('src', info.imagen);
    //         // // Precio
    //         // const miNodoPrecio = document.createElement('p');
    //         // miNodoPrecio.classList.add('card-text');
    //         // miNodoPrecio.textContent = `${info.precio}${divisa}`;
    //         // // Boton 
    //         // const miNodoBoton = document.createElement('button');
    //         // miNodoBoton.classList.add('btn', 'btn-primary');
    //         // miNodoBoton.textContent = '+';
    //         // miNodoBoton.setAttribute('marcador', info.id);

    //         const miNodoBoton = document.getElementById('add-to-cart-button');


    //         miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
    //         // Insertamos
    //         miNodoBody.appendChild(miNodoImagen);
    //         miNodoBody.appendChild(miNodoTitle);
    //         miNodoBody.appendChild(miNodoPrecio);
    //         miNodoBody.appendChild(miNodoBoton);
    //         miNodo.appendChild(miNodoBody);
    //         DOMelementos.appendChild(miNodo);
    //     });
    // }

    /**
    * Evento para añadir un producto al carrito de la compra
    */
    // function anyadirProductoAlCarrito(products) {
    //     products.forEach(product => {
    //         // Log the product details
    //         console.log(product.nombre);
    //         console.log(product.precio);
    //         console.log(product.image1);

    //         // Add the product to our cart
    //         carrito.push(product);
    //     });


    // }

    /**
    * Dibuja todos los productos guardados en el carrito
    */


    function renderizarCarrito() {
        // Get the cart items container
        const cartItemsContainer = document.querySelector('#shop');
        
        // Clear the cart items container
        cartItemsContainer.innerHTML = '';
        console.log(carrito.length);
        // Check if there are items in the cart
        if (carrito.length > 0) {

            // Loop through the items in the cart
            for (let i = 0; i < carrito.length; i++) {
                // Create a new div element for the product
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                // Create and append the product image
                const productImage = document.createElement('img');
                productImage.src = carrito[i].image1;
                productImage.alt = carrito[i].nombre;
                productDiv.appendChild(productImage);

                 // Create and append the product quantity
                 const productQuantity = document.createElement('p');
                 productQuantity.textContent = carrito[i].quantity;
                 productDiv.appendChild(productQuantity);

                // Create and append the product name
                const productName = document.createElement('p');
                productName.textContent = carrito[i].nombre;
                productDiv.appendChild(productName);

                // Create and append the product price
                const productPrice = document.createElement('p');
                productPrice.textContent = carrito[i].precio + '€';
                productDiv.appendChild(productPrice);

                // Append the product div to the cart items container
                cartItemsContainer.appendChild(productDiv);
            }
        } else {
            // If there are no items in the cart, display a message
            cartItemsContainer.textContent = 'No hay productos en el carrito';
        }
    }

}
);











let cart = [];

// async function addToCart(productId) {
//     // Fetch product data from the server
//     const response = await fetch(`/pagina_detalle_grupoc/${productId}`);
//     console.log(response);
//     const productData = await response.text();
//     console.log(productData);


//     // Create a new product object with the data from the response
//     const product = {
//         nombre: document.getElementById('nombre'),
//         precio: productData.newPrecio,
//         // Add other properties as needed...
//     };
//     console.log(product);


//     // Add the product to the cart
//     cart.push(product);

//     // Return the cart
//     return cart;
// }
async function removeFromCart(productId) {
    // Find the product in the cart
    const productIndex = cart.findIndex(product => product.id === productId);

    // If the product was found, remove it
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }
}

async function checkout() {
    // Send the cart data to the server
    const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart),
    });

    // Clear the cart
    cart = [];

    // Return the server's response
    return await response.json();
}
