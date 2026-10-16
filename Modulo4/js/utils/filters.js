//FILTROS Y ORDENAMIENTO
//BUSCAR PAISES PRO NOMBRE

export function buscarPaises(paises, texto) {
  
    //Normalizar nuestro texto de busqueda
    const textoNormalizado = texto.trim().toLowerCase();

    //Validación
    if(textoNormalizado){
        return paises;
    }

    //Filtrado de paises 
    return paises.filter((pais) => {

        //Normalizacion de nombre de mi pais
        const nombre = pais.names?.common.toLowerCase() ?? '';
        
        
        return nombre.includes(textoNormalizado);
    });

}

//FILTARR POR CONTINENTE
export function filtrarPorContinente(paises, continente) {

    //Filtrado all
    if(continente === 'all'){
        return paises;
    }

    //Filtrado por region
    return paises.filter((pais) => pais.region === continente);
}

//ORDENAR PAISES
export function ordenarPaises(paises, criterio) {

    //utilizar spread operat
    const paisesOrdenados = [...paises];

    //ORDENAR a-z CON LOCALECOMPARE
    if(criterio === 'az'){
        return paisesOrdenados.sort((a,b) =>{

            const nombreA = a.name?.common ?? '';
            const nombreB = b.name?.common ?? '';

            return nombreA.localeCompare(nombreB);

        })
    }

    //Ordenar z-a
    if(criterio === 'za'){
        return paisesOrdenados.sort((a,b) =>{
            const nombreA = a.name?.common ?? '';
            const nombreB = b.name?.common ?? '';

            return nombreB.localeCompare(nombreA);  
        })
    }

    return paisesOrdenados;
}

//Funcion combinando procesamiento
export function procesarPaises(paises, texto, continente, criterioOrden) {
    let resultado = buscarPaises(paises, texto);
    resultado = filtrarPorContinente(resultado, continente);
    resultado = ordenarPaises(resultado, criterioOrden);

    return resultado;

}

