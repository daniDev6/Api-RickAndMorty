
const perso = document.getElementById('perso')
const paginaActual = document.getElementById('paginaActual')
let pagina = 1
let ultimaPage = 42

const genero = document.getElementById('genero')
const nombre = document.getElementById('nombre')
const btnAvanzar = document.getElementById('btn-avanzar')
const btnPagina = document.getElementById('btn-pagina')

const prevPagina = document.getElementById('atras')
const proximaPagina = document.getElementById('siguiente')
const ultimaPagina = document.getElementById('ultimo')

const primerPagina = document.getElementById('primero')

/* RENDER Pagina */
const traerPaginas = async (pagina) => {
    try {
        let resultadosJson = await todasLasProbabilidades(pagina)
        let arrayResultados = resultadosJson.results

        printPagina(arrayResultados)
        ultimaPage = resultadosJson.info.pages

        paginado(pagina, ultimaPage)
        updatePag(pagina, ultimaPage)
    } catch (error) {
        console.log(error,'entre al cacth de traer paginas')
        perso.innerHTML = ''
        perso.innerHTML = 'no se encontraron resultados'
        btnPagina.innerHTML = ''
        pagina = ''

    }
}
const printPagina = (arrayResultados) => {
    perso.innerHTML = ''
    console.log(arrayResultados)
    actualizarCantPersonajes(arrayResultados)
    console.log(arrayResultados)
    console.log('despues de print')
    arrayResultados.forEach((element) => {
        let div = document.createElement('div')
        div.classList = element['status'].toLowerCase() + ' cardEfect'
        div.innerHTML = crearCard(element)
        perso.appendChild(div)
    })
}


/*Render Botones */
const paginaActualRender = (pag) => {
    paginaActual.textContent = `${pag}`
}
const paginado = (pag, ultimaPage) => {
    if (pagina == '') {
        btnPagina.innerHTML = ""
        btnAvanzar.style.display = "none"
    }
    if (pag >= ultimaPage - 2 && pag != 1 && ultimaPage>5) {
        
        btnPagina.innerHTML = ""
        btnPagina.innerHTML = `
            <button id=${ultimaPage - 4} onclick='traerPaginas(${ultimaPage - 4})'>${ultimaPage - 4}</button>
            <button id=${ultimaPage - 3} onclick='traerPaginas(${ultimaPage - 3})'>${ultimaPage - 3}</button>
            <button id=${ultimaPage - 2}  onclick='traerPaginas(${ultimaPage - 2})'>${ultimaPage - 2}</button>
            <button id=${ultimaPage - 1} onclick='traerPaginas(${ultimaPage - 1})'>${ultimaPage - 1}</button>
            <button id=${ultimaPage} onclick='traerPaginas(${ultimaPage})'>${ultimaPage}</button>
        `
        let buttonActive = document.getElementById(pagina)
    buttonActive.classList.add('active')
    } else if (pag > 2 && pag < ultimaPage - 2) {
        btnPagina.innerHTML = ""
        btnPagina.innerHTML = `
            <button id=${pag - 2} onclick='traerPaginas(${pag - 2})'>${pag - 2}</button>
            <button id=${pag - 1} onclick='traerPaginas(${pag - 1})'>${pag - 1}</button>
            <button id=${pag} onclick='traerPaginas(${pag})'>${pag}</button>
            <button id=${pag + 1} onclick='traerPaginas(${pag + 1})'>${pag + 1}</button>
            <button id=${pag + 2} onclick='traerPaginas(${pag + 2})'>${pag + 2}</button>
        `
        let buttonActive = document.getElementById(pagina)
    buttonActive.classList.add('active')
    } else {
      
        let newArray = []
        btnPagina.innerHTML = ""
        if (ultimaPage < 5) {
   
            for (let i = 1; i <= ultimaPage; i++) {
                newArray.push(i)
                let btn = document.createElement('button')
                btn.setAttribute('id', i)
                btn.setAttribute('onclick', `traerPaginas(${i})`)
                btn.textContent = i
                btnPagina.appendChild(btn)
            }
            let buttonActive = document.getElementById(pagina)
    buttonActive.classList.add('active')
        } else {

            btnPagina.innerHTML = `
        <button id="1" onclick='traerPaginas(1)'>1</button>
        <button id="2" onclick='traerPaginas(2)'>2</button>
        <button id="3" onclick='traerPaginas(3)'>3</button>
        <button id="4" onclick='traerPaginas(4)'>4</button>
        <button id="5" onclick='traerPaginas(5)'>5</button>
        `
        let buttonActive = document.getElementById(pagina)
    buttonActive.classList.add('active')
        }
    }
    
}





/*Posibilidades de busqueda */
const todasLasProbabilidades = async (pagina) => {
    try {
        const genero = document.getElementById('genero')
        const nombre = document.getElementById('nombre')
        let resultado = {}
        if (genero.value == 'null' && nombre.value == '') {
            resultado = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`)
        } else if (genero.value != 'null' && nombre.value == '') {
            resultado = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}&gender=${genero.value}`)
        } else if (genero.value == 'null' && nombre.value != '') {
            resultado = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}&name=${nombre.value}`)
        } else if (genero.value != 'null' && nombre.value != '') {
            resultado = await fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}&gender=${genero.value}&name=${nombre.value}`)
        }
        let resultadoJson = await resultado.json()
        console.log(resultadoJson)
        return resultadoJson
    } catch (error) {
        perso.innerHTML = ''
        perso.innerHTML = 'no se encontraron resultados'
        btnPagina.innerHTML = ''
        pagina = ''

    }
}

/*traer data */
const getData = async () => {
    const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
    const response = await fetch(URL);
    const json = await response.json();
    data = json;
    return json;
};
getData(pagina);
let data = getData(pagina);






const mujeres = document.getElementById('mujeres')
const hombres = document.getElementById('hombres')
const sinGenero = document.getElementById('sinGenero')
const desconocido = document.getElementById('desconocido')
const todos = document.getElementById('todos')
//Filtros
mujeres.addEventListener("click", () => {
    const arr = data.results

    const arrMujeres = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender === "Female") {
            arrMujeres.push(arr[i]);
        }
    }
    actualizarCantPersonajes(arrMujeres)
    printPagina(arrMujeres);
});
/*Filtros por pagina */



hombres.addEventListener("click", () => {
    const arr = data.results
    const arrHombres = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender === "Male") {
            arrHombres.push(arr[i]);
        }
    }
    actualizarCantPersonajes(arrHombres)
    printPagina(arrHombres);
});
sinGenero.addEventListener("click", () => {
    const arr = data.results;
    
    const arrSinGenero = [];
    arr.filter((element) => {

        if (element.gender === "genderless") {
            arrSinGenero.push(element);
        }
    })
    actualizarCantPersonajes(arrSinGenero)
    printPagina(arrSinGenero);
});

desconocido.addEventListener("click", () => {
    const arr = data.results;
    
    const arrDesconocido = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender == "unknown") {
            arrDesconocido.push(arr[i]);
        }
    }
    actualizarCantPersonajes(arrDesconocido)
    printPagina(arrDesconocido);
});

todos.addEventListener("click", () => {
    const arr = data.results;
    actualizarCantPersonajes(arr);
    printPagina(arr);

});



/*Card a print */

const crearCard = (element) => {
    return `
    <button onclick="cargaPersonaje(${element['id']})" class="card-span">ver mas...</button>
    <ul class="card-container ${element['gender'].toLowerCase()}1">
    <p class="card-status">${element['status']==='Alive'?'🟢Vivo':''||element['status']==='Dead'?'🔴muerto':''||element['status']==='unknown'?'⚪ N/S':''}</p>
    <p class="modal-gender ${element['gender'].toLowerCase()}"></p>        
    <li class="card-img-container">
                <img src=${element['image']} alt="">
            </li>
            <li class="card-text">
                <p class="name"><span>${element['name']}</span></p>
                <p><span>${element['species']}</span></p>
            </li>
        </ul>
        
`
}
const updatePag = (pagina, ultimaPage) => {
    if (pagina <= 1) {
        prevPagina.disabled = true;
        primerPagina.disabled = true;
    } else {
        prevPagina.disabled = false;
        primerPagina.disabled = false;
    }

    if (pagina === ultimaPage) {
        ultimaPagina.disabled = true;
        proximaPagina.disabled = true;
    } else {
        ultimaPagina.disabled = false;
        proximaPagina.disabled = false;
    }
};


/*Funcionalidades de los botones*/
const avanzar = () => {
    if (pagina !== ultimaPage) {
        perso.innerHTML = ''
        pagina+=1
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)
        
    }
}
const atras = () => {
    if (pagina !== 1) {
        perso.innerHTML = ''
        pagina-=1
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)
    }
}


const primero = () => {
    if (pagina !== 1) {
        perso.innerHTML = ''
        pagina = 1
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)

    } 
}

const ultimo = () => {
    if (pagina !== ultimaPage) {
        perso.innerHTML = ''
        pagina = ultimaPage
        data = getData(pagina);
        paginaActualRender(pagina)
        traerPaginas(pagina)
    }
}

/*Filtro de busquedas */

genero.addEventListener('change', async (e) => {
    try {
        pagina = 1
        let resultadosJson = await todasLasProbabilidades(1)
        let arrayResultados = resultadosJson.results
        ultimaPage = resultadosJson.info.pages
        data = getData(pagina);

        paginado(pagina, ultimaPage)
        paginaActualRender(pagina)
        printPagina(arrayResultados)

        cantPersonajes.textContent=''
        cantPersonajes.textContent = `Cantidad de Personajes: ${resultadosJson.results.length}`
    } catch (error) {
        perso.innerHTML = ''
        perso.innerHTML = 'no se encontraron resultados'
    }

})


nombre.addEventListener('input', async () => {
    try {
        pagina = 1
        if (nombre.value.length > 3) {
            let resultadosJson = await todasLasProbabilidades(1)
            let arrayResultados = resultadosJson.results
            ultimaPage = resultadosJson.info.pages
            paginado(pagina, ultimaPage)
            paginaActualRender(pagina)
            printPagina(arrayResultados)
            data = getData(pagina);

        } else if (nombre.value.length === 0) {
            traerPaginas(1)
        }
    } catch (error) {
        perso.innerHTML = ''
        perso.innerHTML = 'no se encontraron resultados'
        btnPagina.innerHTML = ''
        pagina = ''
    }
})

const cantPersonajes = document.getElementById('cantPersonaje')
const actualizarCantPersonajes = (nuevoArray) => {
    console.log(nuevoArray)
    console.log(nuevoArray.length)
    console.log('entrando a actualizar')
    cantPersonajes.textContent=''
    cantPersonajes.textContent = `Cantidad de Personajes: ${nuevoArray.length}`
}


/*Inicializando programa */
const main = () => {
    paginaActualRender(1)
    traerPaginas(1)
    getData(1)
}
main()