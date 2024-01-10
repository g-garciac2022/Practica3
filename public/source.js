

    




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

    const elementos = await response.text();

    const content = document.getElementById("elementos");

    content.innerHTML = elementos;

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
    const loadMoreButton = document.getElementById('loadMore');
    const addButton = document.querySelectorAll('.add-to-cart-button'); // NodeLIst, debemos pasar a Array
    console.log(addButton);
    const isAddButton = Array.from(addButton).some(button => button.contains(event.target));

    //Array = pasar a array desde addButton
    //some = alguno de los elementos del array cumple la condición
    console.log(isAddButton);
    // Verificar si se hizo clic fuera del contenedor del carrito y del botón del carrito
    if (!isAddButton  &&  !cartContainer.contains(event.target) && event.target !== cartButton && event.target !== loadMoreButton ) {
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

let carrito = [];
document.addEventListener('DOMContentLoaded', async () => {
    
   
    async function loadCart() {
        const response = await fetch('/get-cart', { method: 'GET' });
        carrito = await response.json();
        console.log(carrito.length);
    
        // Log the cart items
        for (let oldProduct of carrito) {

            const renamedProduct = {
                nombre: oldProduct.newNombre,
                precio: oldProduct.newPrecio,
                image1: oldProduct.newImagen1,
                quantity: oldProduct.quantity  // Assuming quantity is also part of your data
            };

            

            carrito[carrito.indexOf(oldProduct)] = renamedProduct;

            console.log(renamedProduct);

        }
    
        // Render the cart
        renderizarCarrito();
    }

    window.onload = loadCart;
    
    

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
                        image1: product.newImagen1
                    };

                    console.log(product.newNombre);
                    console.log(product.newPrecio);
                    console.log(product.newImagen1);

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

    const botonVaciar = document.querySelector('#boton-vaciar');

    // Add a click event listener to the button
    botonVaciar.addEventListener('click', () => {
        // Empty the cart
        carrito = [];

        // Optionally, you can also update the cart display after emptying the cart
        renderizarCarrito();
    });


    
    
}
);
function renderizarCarrito() {
    // Get the cart items container
    const cartItemsContainer = document.querySelector('#shop');
    cartItemsContainer.classList.add('flex-container');
    // Clear the cart items container
    cartItemsContainer.innerHTML = '';
    console.log(carrito.length);

    
    // Check if there are items in the cart
    if (carrito.length > 0) {



        // Loop through the items in the cart
        for (let i = 0; i < carrito.length; i++) {

            console.log(carrito[i].quantity);
            const existingProduct = carrito.find(item => item.nombre === carrito[i].nombre);
            
            if (existingProduct && existingProduct !== carrito[i]) {
                // If the product is already in the cart, increase its quantity
                existingProduct.quantity++;
                continue;
            }
            
            // Create a new div element for the product
            const productDiv = document.createElement('div');
            productDiv.classList.add('product', 'flex-item');


        

            // Create and append the product image
            const productImage = document.createElement('img');
            productImage.src = carrito[i].image1;
            productImage.alt = carrito[i].nombre;
            productImage.classList.add('align-left');
            productImage.width = 70; // Set the width of the image
            productImage.height = 70; // Set the height of the image
            // productImage.classList.add('your-class-name'); // Add a class to the image
            productDiv.appendChild(productImage);

            // Create and append the product quantity
            const productQuantity = document.createElement('p');
            productQuantity.textContent = carrito[i].quantity;
            productQuantity.classList.add('margin-right');
            productDiv.appendChild(productQuantity);

            // Create and append the product name
            const productName = document.createElement('p');
            productName.textContent = carrito[i].nombre;
            productName.classList.add('margin-right');

            productDiv.appendChild(productName);

            // Create and append the product price
            const productPrice = document.createElement('p');
            const totalPrice = (carrito[i].precio * carrito[i].quantity).toFixed(2); // Format the price to use 2 decimal places
            productPrice.textContent = totalPrice + '€';
            productPrice.classList.add('margin-right');

            productDiv.appendChild(productPrice);

            const productElement = document.createElement('div');
        productElement.innerHTML = `
            <button onclick="decreaseQuantity('${carrito[i].nombre}')">-</button>
        `;
        productDiv.appendChild(productElement);


            

            // Append the product div to the cart items container
            cartItemsContainer.appendChild(productDiv);
        }
        const total = carrito.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2);
        const totalDiv = document.createElement('div');
        totalDiv.textContent = 'Total: ' + total + '€';
        cartItemsContainer.appendChild(totalDiv);
    } else {
        // If there are no items in the cart, display a message
        cartItemsContainer.textContent = 'No hay productos en el carrito';
    }
}
function decreaseQuantity(productName) {
    // Find the product in the cart
    const product = carrito.find(item => item.nombre === productName);

    if (product) {
        if (product.quantity > 1) {
            // If the product quantity is more than 1, decrease it
            product.quantity--;
        } else {
            // If the product quantity is 1, remove the product from the cart
            carrito = carrito.filter(item => item.nombre !== productName);
        }

        // Re-render the cart
        renderizarCarrito();
    }
}













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
// async function removeFromCart(productId) {
//     // Find the product in the cart
//     const productIndex = cart.findIndex(product => product.id === productId);

//     // If the product was found, remove it
//     if (productIndex !== -1) {
//         cart.splice(productIndex, 1);
//     }
// }

// async function checkout() {
//     // Send the cart data to the server
//     const response = await fetch('/checkout', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(cart),
//     });

//     // Clear the cart
//     cart = [];

//     // Return the server's response
//     return await response.json();
// }
