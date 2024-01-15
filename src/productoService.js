const magos = [
    {
        MagoNuevoID: 1,
        newNombreMago: 'Albus Dumbledore',
        newDescripcionMago: 'Director de la escuela Hogwarts de Magia y Hechicería. Llegó a ser considerado el mago más grande del mundo',
    },
    {
        MagoNuevoID: 2,
        newNombreMago: 'Godric Griffindor',
        newDescripcionMago: 'Fundador de la casa Griffindor del colegio Hogwarts. Su espada es un objeto mágico muy importante durante el periodo escolar de Harry Potter en Hogwarts',
    },
    {
        MagoNuevoID: 3,
        newNombreMago: 'Salazar Slytherin',
        newDescripcionMago: 'Fundador de la casa Slytherin del colegio Hogwarts. Creía que solo los sangre limpia podían estudiar magia.',
    },
    {
        MagoNuevoID: 4,
        newNombreMago: 'Helga Hufflepuff',
        newDescripcionMago: 'Fundadora de la casa Hufflepuff del colegio Hogwarts. Aceptaba a todos los alumnos sin importar sus habilidades.',
    },
    {
        MagoNuevoID: 5,
        newNombreMago: 'Rowena Ravenclaw',
        newDescripcionMago: 'Fundadora de la casa Ravenclaw del colegio Hogwarts. Su diadema fue uno de los múltiples horrocruxes realizados<br>por el mago tenebroso Voldemort.',
    },
    {
        MagoNuevoID: 6,
        newNombreMago: 'Herpo el loco',
        newDescripcionMago: 'Mago tenebroso de la antigua Grecia. Es el primer mago conocido que consiguió realizar un horrocrux con éxito (un basilisco de ojos amarillos)',
    },
    {
        MagoNuevoID: 7,
        newNombreMago: 'Harry Potter',
        newDescripcionMago: 'Estudiante de la casa Griffindor y discípulo de Albus Dumbledore. Es la única persona que ha sobrevido (dos veces) a la maldición asesina Avada Kedavra.',
    },
    {
        MagoNuevoID: 8,
        newNombreMago: 'Merlín',
        newDescripcionMago: 'Considerado el mago más poderoso de la historia, era un mago medieval perteneciente a la casa Slytherin.',
    },
    {
        MagoNuevoID: 9,
        newNombreMago: 'Newt Scamander',
        newDescripcionMago: 'Magizoólogo perteneciente a la casa Hufflepuff. Entre sus animales se encuentran escarbatos, un kelpie y un ave del trueno llamado Frank.',
    }
]

const elements = [];

export function buscar(terminoBusqueda) {

    let elementos = [];

    elementos = elements.filter((elem) => elem.newNombre.toLowerCase().includes(terminoBusqueda.toLowerCase()));
    
    console.log(elementos);

    return elementos;
}



let nextId = elements.length + 1;

export function newElement(elementData) {
    //Para validar y guardar el formulario
    // console.log(elementData);
    const newElement = {
        id: nextId++,
        newNombre: elementData.newNombre,
        newDescripcion: elementData.newDescripcion.split('\n').map(line => line.trim()),
        newPrecio: elementData.newPrecio,
        newEfectosSecundarios: elementData.newEfectosSecundarios,
        newImagen1: elementData.newImagen1,
        newImagen2: elementData.newImagen2,
        newImagen3: elementData.newImagen3,
        Leche: elementData.Leche === 'on',
        Cacao: elementData.Cacao === 'on',
        Avellanas: elementData.Avellanas === 'on',
        magos: magos,
    };
    elements.push(newElement);
    return newElement;
};

export function getElementByID(elementId) {
    //Para obtener el ID del elemento
    const element = elements.find(element => element.id === Number(elementId));

    return element;
}
const NUM_RESULTS = 4;

let loadMoreRequests = 0;

export function getAllElements(from, to) {
    // const from = (loadMoreRequests) * NUM_RESULTS;
    // const to = from + NUM_RESULTS;
    // loadMoreRequests++;
    // console.log(from, to, loadMoreRequests);
    let values = Object.values(elements);
    if (from !== undefined) {
        return values.slice(from, to);

    } else {
        return values;

    }


}


//a partir de aqui era de paginaDetalleService


export function addElement(element) {
    elements.toLocaleString(id, element);
    element.id = id;
    id++;
}

export function addSubElement(Id, nuevoMago) { // Recibe el id del elemento padre y el subelemento
    let elementFather = getElementByID(Id); // Obtiene el elemento padre

    if (elementFather) {
        let id = elementFather.nextSubElementId++; // Crea un id para el subelemento y lo incrementa
        nuevoMago.id = id.toString(); // Convierte el id a string para que no de error
        elementFather.magos.push(nuevoMago); // Usa push para agregar el subelement al array

        return nuevoMago;
    } else {
        console.error(`Elemento con id ${Id} no encontrado.`);
        return null;
    }
}

export function deleteElement(id) {
    elements.delete(id);
}


export function mostrarMagos(id) {
    return elements[id].magos;
}

export function editarProducto(elementData) {
    const id = Number(elementData.id); // Convierte el id a número (ÜNICO ELEMENTO NO EDITABLE)
    const element = elements.find(e => e.id === id); // Busca el elemento por id
    if (!element) {
        throw new Error('Elemento no encontrado');
    }
    element.newNombre = elementData.newNombre;
    element.newDescripcion = elementData.newDescripcion;
    element.newPrecio = elementData.newPrecio;
    element.newEfectosSecundarios = elementData.newEfectosSecundarios;
    element.newImagen1 = elementData.newImagen1;
    element.newImagen2 = elementData.newImagen2;
    element.newImagen3 = elementData.newImagen3;
    element.Leche = elementData.Leche;
    element.Cacao = elementData.Cacao;
    element.Avellanas = elementData.Avellanas;


    return element;
}

export function borrarProducto(elementId) {
    const index = elements.findIndex(element => element.id === Number(elementId))
    if (index !== -1) {
        elements.splice(index, 1);
        return true;
    }
    return false;
}


export function deleteElementByID(elementId) {
    const index = elements.findIndex(element => element.id === Number(elementId))
    if (index !== -1) {
        elements.splice(index, 1);
        return true;
    }
    return false;
}

export function loadSampleData() {

    newElement({ id: 1, newNombre: 'Rana de Chocolate', newDescripcion: 'Este producto es muy divertido... pero cierra puertas y ventanas que es más escurridizo de lo que parece. Además viene con un divertido cromo de un mago/bruja.¡Hay más de 100, colecciónalos!', newPrecio: '14.50', newEfectosSecundarios: 'En el caso de estar caducado no consumir de ninguna manera. Al menos si quieres seguir siendo humano y no ir a clase dando saltos... Producto peligroso, al consumir en mal estado puede producir transformación progresiva en rana.', newImagen1: 'https://www.curiosite.es/img/auto_catalogo/w618/31321.jpg', newImagen2: 'https://storage.googleapis.com/catalog-pictures-carrefour-es/catalog/pictures/hd_510x_/0849421004651_1.jpg', newImagen3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfgfG9YxrWUHMZH8yXAsTA3eLxx7D8Y5nkQ&usqp=CAU', Leche: true, Cacao: true, Avellanas: true, magos: magos, });
    newElement({ id:2, newNombre: 'Poción Omitir Carrera', newDescripcion: 'Con esta poción obtienes tu título correspondiente a la carrera que estés cursando, independientemente de los años que te queden por cursar. Sin embargo, aprende bien los conceptos necesarios que sino no te sirve de nada cuando vayas a trabajar en algo...', newPrecio: '99.99', newEfectosSecundarios: 'En el caso de estar caducado puede producir desde amnesia leve hasta pérdida de la memoria.', newImagen1: 'https://img.freepik.com/fotos-premium/ia-generativa-pocion-magica-verde-botella-etiqueta-vacia_634053-4104.jpg', newImagen2: 'https://img.freepik.com/fotos-premium/ia-generativa-pocion-magica-liquido-color-verde-botella_501669-27205.jpg', newImagen3: 'https://img.freepik.com/fotos-premium/botella-vidrio-quimico-llena-pocion-sobre-fondo-oscuro-concepto-liquido-magico-ia-generativa_356060-4466.jpg?w=2000', Leche: true, Cacao: true, Avellanas: true, magos: magos, });
    newElement({ id:3, newNombre: 'A-Pruebame', newDescripcion: 'Ideal cuando no has estudiado. Alimento que le das a tu profesor, le dices tu nombre y mínimo un aprobado te sacas.', newPrecio: '24.50', newEfectosSecundarios: 'No consumir más de uno a la vez. Puede dar dolor de cabeza fuerte.', newImagen1: 'https://casadesante.com/cdn/shop/products/51XuAkoXarL.jpg?v=1684287766', newImagen2: 'https://www.lacasadelasgolosinas.com/3811-thickbox_default/bola-fresa-caramelo-masticable-ceconsa-200u.jpg', newImagen3: 'https://i.pinimg.com/originals/ef/98/0b/ef980b645c63a997bb102b35d8a2e554.jpg', Leche: true, Cacao: true, Avellanas: true, magos: magos,});
    newElement({ id:4, newNombre: 'Felix Felicis', newDescripcion: 'Poción muy poderosa. Te proporciona un golpe de suerte durante un periodo corto de tiempo. Ideal si todo te sale mal.', newPrecio: '333.33', newEfectosSecundarios: 'Tiene una probabilidad baja de producir el efecto contrario durante una semana', newImagen1: 'https://pbs.twimg.com/media/FH_JvIoXMAM4Qpa.jpg', newImagen2: 'https://pm1.aminoapps.com/6516/bf0157978db3a01d3af142b30cd8c29b10daff44_hq.jpg', newImagen3: 'https://pbs.twimg.com/media/EFk-hz3W4AApkhl.jpg', Leche: true, Cacao: true, Avellanas: true, magos: magos, });
    newElement({ id:5, newNombre: 'Chocolatina x2', newDescripcion: 'Cómetelo y sientete Eminem rapeando. Avisa a tus amigos de que la tomas porque puede que no te entiendan mientras duran los efectos.', newPrecio: '5.75', newEfectosSecundarios: 'Puede producir una voz muy aguda que cause dolores de cabeza fuertes.', newImagen1: 'https://img.freepik.com/vector-gratis/conjunto-barras-trozos-delicioso-chocolate_23-2147801690.jpg?w=2000', newImagen2: 'https://static.vecteezy.com/system/resources/previews/020/616/001/non_2x/free-icon-chocolate-bar-cartoon-illustration-free-vector.jpg', newImagen3: 'https://static.vecteezy.com/system/resources/previews/014/339/872/non_2x/kid-chocolate-bar-icon-cartoon-style-vector.jpg', Leche: true, Cacao: true, Avellanas: true, magos: magos, });
    newElement({ id:6, newNombre: 'Brebaje Inteligente', newDescripcion: '¿Cansado de que no te entren los conceptos por mucho que estudies? Esta poción es para ti. Provoca una capacidad de concentración grande para ayudarte a repasarte esos temas que te cuestan. ¡Aprueba esa asignatura que te cuesta!', newPrecio: '50.00', newEfectosSecundarios: '!NO CONSUMIR CADUCADO BAJO NINGÚN CONCEPTO¡ Esto provocaría el efecto inverso y no conseguirías ni ponerte a estudiar siquiera.', newImagen1: 'https://img.freepik.com/fotos-premium/pocao-do-amor-nos-estilos-fantasia-e-steampunk_948265-4032.jpg', newImagen2: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhQq67Xf6ZE8H-BfAqRFH3Gu2dpRfPAfFRgxkeT63a_M67Z5Yvi-sFowAYxqrHgOLOx8&usqp=CAU', newImagen3: 'https://i.etsystatic.com/14113194/r/il/77a7ed/3542620371/il_570xN.3542620371_hgj2.jpg', Leche: true, Cacao: true, Avellanas: true, magos: magos, });
    newElement({ id:7, newNombre: 'Caramelos de la verdad', newDescripcion: 'Piensas que alguien te miente? Dale esto y descubre todo lo que te oculta. Caramelos fabricados con la poción "Veritaserum".', newPrecio: '13.45', newEfectosSecundarios: 'Si está caducado no tiene ningún efecto, simplemente pasa a ser un caramelo normal.', newImagen1: 'https://i.pinimg.com/736x/be/cf/ec/becfeceffc4ec643bd8c0f21891bdc0a.jpg', newImagen2: 'https://media.istockphoto.com/id/525106711/es/foto/sweet-rojo-y-blanco-caramelo-de-menta.jpg?s=612x612&w=0&k=20&c=qWLVIcYcD8TWYgNLgy-ahDYzHVPj0Wtl6t5YabhOwtg=', newImagen3: 'https://c8.alamy.com/compes/eagp25/dulce-rojo-y-blanco-en-un-tazon-de-caramelos-de-menta-eagp25.jpg', Leche: true, Cacao: true, Avellanas: true, magos: magos, });
    newElement({ id:8, newNombre: 'Amortentia', newDescripcion: 'Filtro de amor. Provoca una fuerte atracción del individuo que lo consume hacia la primera persona que ve. Esto solo dura un tiempo.', newPrecio: '69.00', newEfectosSecundarios: 'Aparte de estar engañando a alguien para que le gustes no tiene ninguno.', newImagen1: 'https://i.etsystatic.com/42305365/r/il/6ebba9/4805678214/il_570xN.4805678214_2tfa.jpg', newImagen2: 'https://i.etsystatic.com/19816601/r/il/9eb943/1900491209/il_fullxfull.1900491209_i7nc.jpg', newImagen3: 'https://www.koekoe.es/7159-tm_thickbox_default/pocion-amortentia-bote-gominolas-100-gr.jpg', Leche: true, Cacao: true, Avellanas: true, magos: magos, });
    
}

loadSampleData();