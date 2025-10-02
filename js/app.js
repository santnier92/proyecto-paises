/* * Este evento 'DOMContentLoaded' es como un "arranque seguro". 
 * Se asegura de que todo el código JavaScript se ejecute únicamente DESPUÉS 
 * de que el navegador haya cargado y construido toda la estructura HTML de la página.
 * Esto evita errores comunes donde el JS intenta manipular un elemento que aún no existe.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- SECCIÓN 1: ELEMENTOS GLOBALES Y CAMBIO DE TEMA ---
    
    // Guardamos en constantes las referencias a los elementos HTML que vamos a usar repetidamente.
    const themeSwitcher = document.querySelector('.theme-switcher'); // El botón para cambiar de tema.
    const countriesContainer = document.getElementById('countries-container'); // El contenedor de las tarjetas de países.
    const searchInput = document.getElementById('searchInput'); // El campo de búsqueda.
    const regionFilter = document.getElementById('regionFilter'); // El selector para filtrar por región.

    // 'allCountries' es una variable global (un array) que usaremos para guardar la lista completa
    // de países una sola vez. Así, no tenemos que llamar a la API cada vez que filtramos.
    let allCountries = [];

    // 'addEventListener' es como "ponerle un oído" al botón.
    // Le decimos que "escuche" el evento 'click' y, cuando ocurra, ejecute la función.
    themeSwitcher.addEventListener('click', () => {
        // Verificamos si el body ya tiene el atributo 'data-theme' con el valor 'dark'.
        const isDarkMode = document.body.getAttribute('data-theme') === 'dark';

        if (isDarkMode) {
            // Si está en modo oscuro, quitamos el atributo para volver al modo claro.
            document.body.removeAttribute('data-theme');
            // Cambiamos el ícono y el texto del botón al de la luna (para ir a modo oscuro).
            themeSwitcher.innerHTML = `<i class="far fa-moon"></i><span class="theme-name"> Modo Oscuro</span>`;
        } else {
            // Si está en modo claro, añadimos el atributo para activar el modo oscuro.
            document.body.setAttribute('data-theme', 'dark');
            // Cambiamos el ícono y el texto del botón al del sol (para ir a modo claro).
            themeSwitcher.innerHTML = `<i class="fas fa-sun"></i><span class="theme-name"> Modo Claro</span>`;
        }
    });


    // --- SECCIÓN 2: LÓGICA DE LA PÁGINA PRINCIPAL (index.html) ---

    /*
     * 'async/await' es una forma moderna de manejar operaciones asíncronas (que toman tiempo),
     * como una llamada a una API. 'async' le dice a JavaScript que esta función contendrá
     * una operación que debe esperar. 'await' pausa la ejecución de la función hasta que
     * la promesa (en este caso, la respuesta de la API) se resuelva.
     */
    async function getCountries() {
        // 'fetch' hace la petición a la URL de la API. 'await' espera a que el servidor responda.
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3');
        // Una vez tenemos la respuesta, la convertimos de formato JSON a un objeto/array de JavaScript.
        const countries = await response.json();
        
        // Guardamos la lista completa de países en nuestra variable global.
        allCountries = countries;
        // Llamamos a la función que se encargará de "dibujar" los países en la pantalla.
        displayCountries(countries);
    }

    // Esta función recibe un array de países y crea el HTML para cada uno.
    function displayCountries(countries) {
        // Vacíamos el contenedor para asegurarnos de no tener países de búsquedas anteriores.
        countriesContainer.innerHTML = '';
        
        // 'forEach' es un bucle que recorre cada elemento del array 'countries'.
        countries.forEach(country => {
            // Creamos un nuevo elemento <div> en memoria. Aún no es visible.
            const countryCard = document.createElement('div');
            // Le añadimos la clase CSS para que tome los estilos correctos.
            countryCard.classList.add('country-card');
            
            // Llenamos el interior del <div> con el HTML de la tarjeta, usando los datos del país.
            // Usamos plantillas literales (backticks ``) para insertar variables fácilmente.
            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}">
                <div class="country-card-info">
                    <h3>${country.name.common}</h3>
                    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Región:</strong> ${country.region}</p>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            `;
            
            // Le añadimos un "oído" a cada tarjeta para que, al hacer clic...
            countryCard.addEventListener('click', () => {
                // ...guarde el código 'cca3' del país en la memoria de la sesión del navegador...
                sessionStorage.setItem('selectedCountry', country.cca3);
                // ...y nos redirija a la página de detalles.
                window.location.href = 'detail.html';
            });
            
            // Finalmente, añadimos la tarjeta recién creada (que estaba en memoria) al contenedor en el DOM.
            countriesContainer.appendChild(countryCard);
        });
    }

    // Le añadimos un "oído" al campo de búsqueda que se activa con cada tecla presionada ('input').
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            // Obtenemos el texto de búsqueda y lo convertimos a minúsculas para una comparación sin errores.
            const searchTerm = e.target.value.toLowerCase();
            // 'filter' crea un nuevo array con solo los países cuyo nombre incluye el término de búsqueda.
            const filteredCountries = allCountries.filter(country =>
                country.name.common.toLowerCase().includes(searchTerm)
            );
            // Volvemos a dibujar los países, pero esta vez solo con la lista filtrada.
            displayCountries(filteredCountries);
        });
    }

    // Le añadimos un "oído" al selector de región que se activa cuando cambia su valor ('change').
    if (regionFilter) {
        regionFilter.addEventListener('change', (e) => {
            const region = e.target.value;
            if (region) {
                // Si se seleccionó una región, filtramos por ella.
                const filteredCountries = allCountries.filter(country => country.region === region);
                displayCountries(filteredCountries);
            } else {
                // Si se selecciona "Filtrar por Región" (valor vacío), mostramos todos los países.
                displayCountries(allCountries);
            }
        });
    }


    // --- SECCIÓN 3: LÓGICA DE LA PÁGINA DE DETALLES (detail.html) ---

    async function loadCountryDetail() {
        // Recuperamos el código del país que guardamos en la página anterior.
        const countryCode = sessionStorage.getItem('selectedCountry');
        
        if (countryCode) {
            // Hacemos una nueva llamada a la API, pero esta vez pidiendo un solo país por su código.
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,population,region,subregion,capital,tld,currencies,languages,flags,borders`);
            const country = await response.json();
            
            // (Esta línea es para depuración, puedes borrarla si quieres)
            console.log(country);
            
            // Llamamos a la función que dibujará los detalles de este país.
            displayCountryDetail(country);
        }
    }

    function displayCountryDetail(country) {
        const detailContainer = document.getElementById('country-detail-container');
        
        // Extraemos y formateamos los datos que son objetos o arrays para poder mostrarlos.
        const languages = Object.values(country.languages).join(', ');
        const currencies = Object.values(country.currencies).map(c => c.name).join(', ');
        // Operador ternario: si 'nativeName' existe, úsalo; si no, usa el nombre común.
        const nativeName = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : country.name.common;

        // Llenamos el contenedor de detalles con el HTML correspondiente.
        detailContainer.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandera de ${country.name.common}">
            <div class="details-text-container">
                <h2>${country.name.common}</h2>
                <div class="details-columns">
                    <div class="column-1">
                       <p><strong>Nombre Nativo:</strong> ${nativeName}</p>
                       <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                       <p><strong>Región:</strong> ${country.region}</p>
                       <p><strong>Sub Región:</strong> ${country.subregion || 'N/A'}</p>
                       <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    </div>
                    <div class="column-2">
                       <p><strong>Dominio:</strong> ${country.tld.join(', ')}</p>
                       <p><strong>Monedas:</strong> ${currencies}</p>  
                       <p><strong>Idiomas:</strong> ${languages}</p> 
                    </div>
                </div>
            </div>
        `;
    }


    // --- SECCIÓN 4: LÓGICA DE INICIO ---

    // Este es el "cerebro" que decide qué hacer cuando se carga la página.
    // Revisa qué contenedor principal existe en el HTML actual.
    if (document.getElementById('countries-container')) {
        // Si encuentra el contenedor de la lista, significa que estamos en index.html.
        // Por lo tanto, llama a la función para obtener todos los países.
        getCountries();
    } else if (document.getElementById('country-detail-container')) {
        // Si encuentra el contenedor de detalles, significa que estamos en detail.html.
        // Por lo tanto, llama a la función para cargar los detalles del país seleccionado.
        loadCountryDetail();
    }
});