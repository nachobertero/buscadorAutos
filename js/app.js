const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

const resultado = document.querySelector('#resultado');
const textoResultados = document.querySelector("#textoResultados")
const max = new Date().getFullYear();
const min = max - 15;

// CREAR OBJETO CON LA BÚSQUEDA DEL USUARIO

const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    // COMPLETAR EL SELECT DE AÑOS
    llenarSelect();
});

marca.addEventListener('input', e => {
    datosBusqueda.marca = e.target.value;
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
    filtrarAuto();
});

year.addEventListener('input', e => {
    datosBusqueda.year = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
    filtrarAuto();
});

minimo.addEventListener('input', e => {
    datosBusqueda.minimo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


maximo.addEventListener('input', e => {
    datosBusqueda.maximo = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


puertas.addEventListener('input', e => {
    datosBusqueda.puertas = Number(e.target.value);
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

transmision.addEventListener('input', e => {
    datosBusqueda.transmision = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});

color.addEventListener('input', e => {
    datosBusqueda.color = e.target.value
    // Mandar llamar la función de filtrar Autos
    filtrarAuto();
});


function mostrarAutos(autos) {

    limpiarHTML();
    
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} Precio: - ${precio} - Color: ${color}`;
        resultado.appendChild(autoHTML);
    });
}

// LLENAR SELECT
function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}

function filtrarAuto () {

    
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    
    if(resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = "Tu búsqueda no arrojó resultados";

    resultado.appendChild(noResultado);

    textoResultados.classList.add('remove');

}
function filtrarMarca(auto) {

    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){

    if (datosBusqueda.year) {
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}

function filtrarMinimo(auto) {

    if(datosBusqueda.minimo) {
        return auto.precio >= parseInt(datosBusqueda.minimo); 
    }
    return auto;
}

function filtrarMaximo(auto) {

    if (datosBusqueda.maximo) {
       return auto.precio <= parseInt(datosBusqueda.maximo);
    }
    return auto;
}
function filtrarPuertas(auto) {

    if (datosBusqueda.puertas) {
       return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}
function filtrarTransmision(auto) {

    if (datosBusqueda.transmision) {
       return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}
function filtrarColor(auto) {

    if (datosBusqueda.color) {
       return auto.color === datosBusqueda.color;
    }
    return auto;
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
