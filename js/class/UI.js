import { contMostrar, formulario } from '../selectores.js';

class UI {

    mostrarCotizacionHTML(cotizacion){
        this.limpiarHTML();
    
        const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;
    
        const precio = document.createElement('h4');
        precio.classList= 'precio';
        precio.innerHTML = `El precio es: <span>${PRICE}</span>`;
    
        const precioAlto = document.createElement('h4');
        precioAlto.innerHTML = `El precio mas alto del dia: <span>${HIGHDAY}</span>`;
    
        const precioBajo = document.createElement('h4');
        precioBajo.innerHTML = `El precio mas bajo del dia: <span>${LOWDAY}</span>`;
    
        const ultimasHoras = document.createElement('h4');
        ultimasHoras.innerHTML = `Variacion en las ultimas 24 horas: <span>${CHANGEPCT24HOUR}</span>`;
    
        const ultimaActualizacion = document.createElement('h4');
        ultimaActualizacion.innerHTML = `Ultima Actualizacion: <span>${LASTUPDATE}</span>`;
    
        contMostrar.appendChild(precio);
        contMostrar.appendChild(precioAlto);
        contMostrar.appendChild(precioBajo);
        contMostrar.appendChild(ultimasHoras);
        contMostrar.appendChild(ultimaActualizacion);
    
        formulario.reset();
    }
    
    //Imprimir mensajes
    imprimirAlerta(mensaje,type){
    
        var newElement= document.createElement('div')
        newElement.setAttribute("class", "mensaje");
        newElement.setAttribute("id","mensaje")
        newElement.style.borderRadius= '5px';
        newElement.textContent = mensaje;
    
        if(type === true){
            newElement.style.backgroundColor = '#E62020';
    
        } else {
            newElement.style.backgroundColor = 'green';
        }
    
        formulario.appendChild(newElement); 

    
        setTimeout( () => {
            var alertaMensaje = document.querySelector('#mensaje')

            this.limpiarHTML();
    
            alertaMensaje.remove();
        }, 5000);
    }
    
    mostrarSpinner(){
        this.limpiarHTML();
        
        const spinner = document.createElement('div')
        spinner.classList.add('spinner');
    
        spinner.innerHTML = `
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        `;
    
        contMostrar.appendChild(spinner);
    }

    limpiarHTML(){
        
        while(contMostrar.firstChild){
            contMostrar.removeChild(contMostrar.firstChild);
        }
    }
}

export default UI;