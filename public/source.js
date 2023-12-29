const NUM_RESULTS = 4;

let loadMoreRequests = 0;



async function loadMore(){
    const from = (loadMoreRequests+1) * NUM_RESULTS;
    const to = from + NUM_RESULTS;
    console.log("Loading more elements");
    const response = await fetch(`/elementos?from=${from}&to=${to}`);
    console.log(response);
    const newelementos = await response.text();
  console.log(newelementos);
    const elementosDiv = document.getElementById("elementos");
console.log(elementosDiv);
    elementosDiv.innerHTML += newelementos;
    console.log(elementosDiv);
    loadMoreRequests++;
    console.log(loadMoreRequests);
}

async function findElementName() {

    let usernameInput = document.getElementById('elementName');

    let name = usernameInput.value;

    const response = await fetch(`/availableElementName?elementName=${name}`);

    const responseObj = await response.json();

    let message = responseObj.available? 
        '<p>Disponible</p>':
        '<p>No disponible</p>';

    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = message;

}