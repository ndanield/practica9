
document.addEventListener("DOMContentLoaded", function() {
    if (storageAvailable('localStorage') && 'geolocation' in navigator) {
        // Yippee! We can use localStorage awesomeness
        navigator.geolocation.getCurrentPosition(function (position) {
            // Guardo las coordenadas en este formato
            localStorage.setItem('location', JSON.stringify({
                coords: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            }));
        });
    }
    else {
        console.log("LocalStorage not available");
    }
});

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

dataBase.onsuccess = function (e) {
    console.log('Process executed successfully');
};

dataBase.onerror = function (e) {
    console.error('Something happened in the process: '+e.target.errorCode);
};

function addPoll() {
    if ("geolocation" in navigator) {
        if (navigator.onLine) {
            navigator.geolocation.getCurrentPosition(savePoll);
        } else {
            var position = JSON.parse(localStorage.getItem('location'));
            savePoll(position);
        }
    } else {
        alert("Geolocation is not supported by this browser. Registro cancelado");
    }
}

function updatePoll(pollid) {

    var data = dataBase.result.transaction(["polls"],"readwrite");
    var polls = data.objectStore("polls");

    //buscando estudiante por la referencia al key.
    polls.get(pollid).onsuccess = function(e) {

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
            console.log("Encuesta no encontrada...");
        }
    };

}

function deletePoll(pollid) {
    var data = dataBase.result.transaction(["polls"],"readwrite");
    var polls = data.objectStore("polls");

    //buscando estudiante por la referencia al key.
    polls.delete(pollid).onsuccess = function(e) {
        console.log("Dato borrados?....");
        var poll = document.getElementById("poll-" + pollid);
        poll.parentNode.removeChild(poll);
    };
}

function savePoll(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var dbActiva = dataBase.result;
    var transaccion = dbActiva.transaction(["polls"], "readwrite");
    var polls = transaccion.objectStore("polls");

    transaccion.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    transaccion.oncomplete = function (e) {
        console.log("Object added successfully");
    };

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
        var mensaje = "Error: " + e.target.errorCode;
        console.error(mensaje);
        alert(mensaje)
    };

    request.onsuccess = function (e) {
        console.log("Data temporary persisted successfully!");
        document.querySelector("#firstName").value = "";
        document.querySelector("#lastName").value = "";
        document.querySelector("#sector").value = "";
    };

    console.log("Tú localizacion es: " + lat + " " + lng);
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

function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
                // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}