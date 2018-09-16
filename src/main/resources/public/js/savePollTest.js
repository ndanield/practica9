//dependiendo el navegador busco la referencia del objeto.
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB

//indicamos el nombre y la versión
var dataBase = indexedDB.open("offline_db", 1);


//se ejecuta la primera vez que se crea la estructura
//o se cambia la versión de la base de datos.
dataBase.onupgradeneeded = function (e) {
    console.log("Creating polls table");

    //obteniendo la conexión activa
    active = dataBase.result;

    //creando la colección:
    //En este caso, la colección, tendrá un ID autogenerado.
    var polls = active.createObjectStore("polls", { keyPath : 'id', autoIncrement : true });
    // var profesores = active.createObjectStore("profesores", { keyPath : 'id', autoIncrement : true });

    //creando los indices. (Dado por el nombre, campo y opciones)
    polls.createIndex('poll_index', 'index', {unique : true});
    // profesores.createIndex('por_cedula', 'cedula', {unique : true});

};

//El evento que se dispara una vez, lo
dataBase.onsuccess = function (e) {
    console.log('Process executed successfully');
};

dataBase.onerror = function (e) {
    console.error('Something happened in the process: '+e.target.errorCode);
};


function addPoll() {
    var dbActiva = dataBase.result; //Nos retorna una referencia al IDBDatabase.

    //Para realizar una operación de agreagr, actualización o borrar.
    // Es necesario abrir una transacción e indicar un modo: readonly, readwrite y versionchange
    var transaccion = dbActiva.transaction(["polls"], "readwrite");

    //Manejando los errores.
    transaccion.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    transaccion.oncomplete = function (e) {
        // document.querySelector("#matricula").value = '';
        // alert('Object added successfully');
        console.log("Object added successfully");
    };

    //abriendo la colección de datos que estaremos usando.
    var polls = transaccion.objectStore("polls");

    //Para agregar se puede usar add o put, el add requiere que no exista
    // el objeto.
    var request = polls.put({
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        sector: document.querySelector("#sector").value,
        education: document.querySelector("#education").value
    });

    request.onerror = function (e) {
        var mensaje = "Error: "+e.target.errorCode;
        console.error(mensaje);
        alert(mensaje)
    };

    request.onsuccess = function (e) {
        console.log("Data temporary persisted successfully");
        document.querySelector("#firstName").value = "";
        document.querySelector("#lastName").value = "";
        document.querySelector("#sector").value = "";
        document.querySelector("#education").value = "";
    };


}

/**
 * Permite listar todos los datos digitados.
 */
function listarDatos() {
    //por defecto si no lo indico el tipo de transacción será readonly
    var data = dataBase.result.transaction(["estudiantes"]);
    var estudiantes = data.objectStore("estudiantes");
    var contador = 0;
    var estudiantes_recuperados=[];

    //abriendo el cursor.
    estudiantes.openCursor().onsuccess=function(e) {
        //recuperando la posicion del cursor
        var cursor = e.target.result;
        if(cursor){
            contador++;
            //recuperando el objeto.
            estudiantes_recuperados.push(cursor.value);

            //Función que permite seguir recorriendo el cursor.
            cursor.continue();

        }else {
            console.log("La cantidad de registros recuperados es: "+contador);
        }
    };

    //Una vez que se realiza la operación llamo la impresión.
    data.oncomplete = function () {
        imprimirTabla(estudiantes_recuperados);
    }

}

/**
 *
 * @param lista_estudiantes
 */
function imprimirTabla(lista_estudiantes) {
    //creando la tabla...
    var tabla = document.createElement("table");
    var filaTabla = tabla.insertRow();
    filaTabla.insertCell().textContent = "Matricula";
    filaTabla.insertCell().textContent = "Nombre";
    filaTabla.insertCell().textContent = "Carrera";
    filaTabla.insertCell().textContent = "Indice";

    for (var key in lista_estudiantes) {
        //
        filaTabla = tabla.insertRow();
        filaTabla.insertCell().textContent = ""+lista_estudiantes[key].matricula;
        filaTabla.insertCell().textContent = ""+lista_estudiantes[key].nombre;
        filaTabla.insertCell().textContent = ""+lista_estudiantes[key].carrera;
        filaTabla.insertCell().textContent = ""+lista_estudiantes[key].indice;
    }

    document.getElementById("listaEstudiante").innerHTML="";
    document.getElementById("listaEstudiante").appendChild(tabla);
}


/**
 *
 */
function buscarEstudiante() {
    //recuperando la matricula.
    var matricula = prompt("Indique la matrícula");
    console.log("matricula digitada: "+matricula);

    //abriendo la transacción en modo readonly.
    var data = dataBase.result.transaction(["estudiantes"]);
    var estudiantes = data.objectStore("estudiantes");

    //buscando estudiante por la referencia al key.
    estudiantes.get(""+matricula).onsuccess = function(e) {

        var resultado = e.target.result;
        console.log("los datos: "+resultado);

        if(resultado !== undefined){

            var p = document.createElement("p");
            p.appendChild(document.createTextNode(""+JSON.stringify(resultado)));
            console.log(JSON.stringify(resultado));
            document.getElementById("listaEstudiante").innerHTML="";
            document.getElementById("listaEstudiante").appendChild(p);
        }else{
            console.log("Estudiante no encontrado...");
        }
    };

}

function buscarEstudianteIndice() {

    var consultaIndice = prompt("Indique la matrícula");
    console.log("El indice consultado: "+consultaIndice);
    if(consultaIndice === undefined){
        return;
    }

    //por defecto si no lo indico el tipo de transacción será readonly
    var data = dataBase.result.transaction(["estudiantes"]);
    var estudiantes = data.objectStore("estudiantes");
    var contador = 0;
    var estudiantes_recuperados=[];

    //buscando la referencia por el indice.
    var indice = estudiantes.index("por_indice");

    //determinando la forma de la consulta
    var singleKeyRange = IDBKeyRange.only(consultaIndice);

    //abriendo el cursor.
    indice.openCursor(singleKeyRange).onsuccess=function(e) {
        //recuperando la posicion del cursor
        var cursor = e.target.result;
        if(cursor){
            contador++;
            //recuperando el objeto.
            estudiantes_recuperados.push(cursor.value);

            //Función que permite seguir recorriendo el cursor.
            cursor.continue();

        }else {
            console.log("La cantidad de registros recuperados es: "+contador);
        }
    };

    //Una vez que se realiza la operación llamo la impresión.
    data.oncomplete = function () {
        imprimirTabla(estudiantes_recuperados);
    }

}

function borrarEstudiante() {

    var matricula = prompt("Indique la matrícula");
    console.log("matricula digitada: "+matricula);

    var data = dataBase.result.transaction(["estudiantes"], "readwrite");
    var estudiantes = data.objectStore("estudiantes");

    estudiantes.delete(matricula).onsuccess = function (e) {
        console.log("Estudiante eliminado...");
    };
}

function cambiarNombreEstudiante() {

    //recuperando la matricula.
    var matricula = prompt("Indique la matrícula");
    console.log("matricula digitada: "+matricula);

    var nombre = prompt("Indique el nombre");
    console.log("el nombre digitada: "+nombre);

    //abriendo la transacción en modo escritura.
    var data = dataBase.result.transaction(["estudiantes"],"readwrite");
    var estudiantes = data.objectStore("estudiantes");

    //buscando estudiante por la referencia al key.
    estudiantes.get(""+matricula).onsuccess = function(e) {

        var resultado = e.target.result;
        console.log("los datos: "+JSON.stringify(resultado));

        if(resultado !== undefined){

            resultado.nombre = nombre;

            var solicitudUpdate = estudiantes.put(resultado);

            //eventos.
            solicitudUpdate.onsuccess = function (e) {
                console.log("Datos Actualizados....");
            }

            solicitudUpdate.onerror = function (e) {
                console.error("Error Datos Actualizados....");
            }

        }else{
            console.log("Estudiante no encontrado...");
        }
    };


}

