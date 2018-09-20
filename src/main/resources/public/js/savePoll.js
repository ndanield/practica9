// if (!window.indexedDB) {
//     window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
// }
// var indexedDB = window.indexedDB;

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//indicamos el nombre y la versión
var dataBase = indexedDB.open("offline_db", 1);

//se ejecuta la primera vez que se crea la estructura
//o se cambia la versión de la base de datos.
dataBase.onupgradeneeded = function (e) {
    console.log("Creating polls table");

    //obteniendo la conexión activa
    var active = dataBase.result;

    //creando la colección:
    //En este caso, la colección, tendrá un ID autogenerado.
    var polls = active.createObjectStore("polls", { keyPath : 'id', autoIncrement : true });

    //creando los indices. (Dado por el nombre, campo y opciones)
    polls.createIndex('poll_index', 'index', {unique : true});

};

//El evento que se dispara una vez, lo
dataBase.onsuccess = function (e) {
    console.log('Process executed successfully');
};

dataBase.onerror = function (e) {
    console.error('Something happened in the process: '+e.target.errorCode);
};

function addPoll() {
    console.log("Adding poll...");


    var dbActiva = dataBase.result;
    var transaccion = dbActiva.transaction(["polls"], "readwrite");
    var polls = transaccion.objectStore("polls");


    transaccion.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    transaccion.oncompvare = function (e) {

        console.log("Object added successfully");
    };

    var lat = 0, lng = 0;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lng = position.coords.longitude;
        });
    } else {
        alert("Geolocation is not supported by this browser. Registro cancelado");
        return;
    }

    var request = polls.put({
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        sector: document.querySelector("#sector").value,
        education: document.querySelector("#education").value,
        date: formatDate(new Date()),
        latitude: lat,
        longitude: lng
    });

    request.onerror = function (e) {
        var mensaje = "Error: "+e.target.errorCode;
        console.error(mensaje);
        alert(mensaje)
    };

    request.onsuccess = function (e) {
        console.log("Data temporary persisted successfully!");
        document.querySelector("#firstName").value = "";
        document.querySelector("#lastName").value = "";
        document.querySelector("#sector").value = "";
        document.querySelector("#education").value = "";
    };


}

function updatePoll(pollid) {

    //recuperando la matricula.
    // var matricula = prompt("Indique la matrícula");
    // console.log("matricula digitada: "+matricula);

    // var nombre = prompt("Indique el nombre");
    // console.log("el nombre digitada: "+nombre);

    //abriendo la transacción en modo escritura.
    var data = dataBase.result.transaction(["polls"],"readwrite");
    var polls = data.objectStore("polls");

    //buscando estudiante por la referencia al key.
    polls.get(""+pollid).onsuccess = function(e) {

        var resultado = e.target.result;
        console.log("los datos: "+JSON.stringify(resultado));

        if(resultado !== undefined){

            resultado.firstName = document.querySelector("#firstName").value;
            resultado.lastName = document.querySelector("#lastName").value;
            resultado.sector = document.querySelector("#sector").value;
            resultado.education = document.querySelector("#education").value;

            var solicitudUpdate = polls.put(resultado);

            //eventos.
            solicitudUpdate.onsuccess = function (e) {
                console.log("Datos Actualizados....");
            };

            solicitudUpdate.onerror = function (e) {
                console.error("Error Datos Actualizados....");
            };

        } else {
            console.log("Estudiante no encontrado...");
        }
    };


}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}