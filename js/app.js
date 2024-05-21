// Variables para elementos del DOM
const brand = document.querySelector('#marca');
const year = document.querySelector('#year');
const minPrice = document.querySelector('#minimo');
const maxPrice = document.querySelector('#maximo');
const doors = document.querySelector('#puertas');
const transmission = document.querySelector('#transmision');
const color = document.querySelector('#color');

const result = document.querySelector('#resultado');
const resultText = document.querySelector("#textoResultados")
const maxYear = new Date().getFullYear();
const minYear = maxYear - 15;

// Crear objeto con los datos de búsqueda del usuario
const searchData = {
    brand: '',
    year: '',
    minPrice: '',
    maxPrice: '',
    doors: '',
    transmission: '',
    color: ''
};

// Evento al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    showCars(cars);

    // Llenar el select de años
    fillSelect();
});

// Eventos para cambios en los campos de entrada
brand.addEventListener('input', e => {
    searchData.brand = e.target.value;
    // Llamar a la función para filtrar autos
    filterCars();
});

year.addEventListener('input', e => {
    searchData.year = Number(e.target.value);
    // Llamar a la función para filtrar autos
    filterCars();
});

minPrice.addEventListener('input', e => {
    searchData.minPrice = Number(e.target.value);
    // Llamar a la función para filtrar autos
    filterCars();
});

maxPrice.addEventListener('input', e => {
    searchData.maxPrice = Number(e.target.value);
    // Llamar a la función para filtrar autos
    filterCars();
});

doors.addEventListener('input', e => {
    searchData.doors = Number(e.target.value);
    // Llamar a la función para filtrar autos
    filterCars();
});

transmission.addEventListener('input', e => {
    searchData.transmission = e.target.value
    // Llamar a la función para filtrar autos
    filterCars();
});

color.addEventListener('input', e => {
    searchData.color = e.target.value
    // Llamar a la función para filtrar autos
    filterCars();
});

// Función para mostrar los autos en el DOM
function showCars(cars) {
    clearHTML();
    
    cars.forEach(car => {
        const {brand, model, year, doors, transmission, price, color} = car;
        const carHTML = document.createElement('p');
        carHTML.textContent = `${brand} - ${model} - ${year} - ${doors} Puertas - Transmisión: ${transmission} Precio: - ${price} - Color: ${color}`;
        result.appendChild(carHTML);
    });
}

// Llenar el select de años
function fillSelect() {
    for (let i = maxYear; i >= minYear; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);
    }
}

// Función para filtrar autos
function filterCars () {
    const resultFiltered = cars.filter(filterBrand).filter(filterYear).filter(filterMinPrice).filter(filterMaxPrice).filter(filterDoors).filter(filterTransmission).filter(filterColor);

    if(resultFiltered.length) {
        showCars(resultFiltered);
    } else {
        noResults();
    }
}

// Función para mostrar mensaje de no resultados
function noResults(){
    clearHTML();

    const noResultsDiv = document.createElement('div');
    noResultsDiv.classList.add('alert', 'error');
    noResultsDiv.textContent = "Tu búsqueda no arrojó resultados";

    result.appendChild(noResultsDiv);

    resultText.classList.add('remove');
}

// Funciones para filtrar por cada criterio
function filterBrand(car) {
    if (searchData.brand) {
        return car.brand === searchData.brand;
    }
    return car;
}

function filterYear(car){
    if (searchData.year) {
        return car.year === parseInt(searchData.year);
    }
    return car;
}

function filterMinPrice(car) {
    if(searchData.minPrice) {
        return car.price >= parseInt(searchData.minPrice); 
    }
    return car;
}

function filterMaxPrice(car) {
    if (searchData.maxPrice) {
       return car.price <= parseInt(searchData.maxPrice);
    }
    return car;
}

function filterDoors(car) {
    if (searchData.doors) {
       return car.doors === parseInt(searchData.doors);
    }
    return car;
}

function filterTransmission(car) {
    if (searchData.transmission) {
       return car.transmission === searchData.transmission;
    }
    return car;
}

function filterColor(car) {
    if (searchData.color) {
       return car.color === searchData.color;
    }
    return car;
}

// Función para limpiar el HTML del resultado anterior
function clearHTML() {
    while (result.firstChild) {
        result.removeChild(result.firstChild);
    }
