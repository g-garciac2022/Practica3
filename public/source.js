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