import UI from './class/UI.js'

import { criptomonedaSelect, monedaSelect, formulario} from './selectores.js'

const ui = new UI();

//objeto para buscar la moneda y la criptomoneda
const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}

//Crear Promise para obtener criptomonedas
const obtenerCriptomonedas = criptomonedas => new Promise( resolve =>{
    resolve(criptomonedas);
})

//SE ejecuta al terminar de cargar la pagina
document.addEventListener('DOMContentLoaded',() => {

    formulario.reset();

    consultarCriptommonedas();

    criptomonedaSelect.addEventListener('change',leerValor);
    monedaSelect.addEventListener('change',leerValor);

    formulario.addEventListener('submit', SubmitFormulario);
})

//BUsca las top 10 criptomonedas dentro de la API
const consultarCriptommonedas = () => {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
    .then( respuesta => respuesta.json())
    .then( resultado => obtenerCriptomonedas(resultado.Data))
    .then( criptomonedas => selectCriptomonedas(criptomonedas))

}

//Imprime las criptomonedas para poder ser seleccionadas
const selectCriptomonedas = (criptomonedas) =>{
    criptomonedas.forEach(cripto => {
        const { FullName, Name } = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedaSelect.appendChild(option);
    });
}

//Asigna los valores en el objeto
const leerValor = (e) =>{
    objBusqueda[e.target.name] = e.target.value;
}

//Validacion y consulta del formulario
const SubmitFormulario = (e) =>{
    e.preventDefault();

    const { moneda, criptomoneda} = objBusqueda;

    if(moneda === '' || criptomoneda === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios',true);
        return;
    } 
    consultarApi();
}

//Consulta a la Api
const consultarApi = () => {
    const {moneda, criptomoneda} = objBusqueda;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    ui.mostrarSpinner();

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(cotizacion =>{
        ui.mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        objBusqueda.moneda = '';
        objBusqueda.criptomoneda = '';
    })
}
