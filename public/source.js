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




