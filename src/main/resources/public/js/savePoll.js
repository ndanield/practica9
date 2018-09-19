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
    var dbActiva = dataBase.result;

    var transaccion = dbActiva.transaction(["polls"], "readwrite");

    transaccion.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    transaccion.oncomplete = function (e) {

        console.log("Object added successfully");
    };

    var polls = transaccion.objectStore("polls");

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

function updatePoll() {

    //recuperando la matricula.
    // var matricula = prompt("Indique la matrícula");
    // console.log("matricula digitada: "+matricula);

    // var nombre = prompt("Indique el nombre");
    // console.log("el nombre digitada: "+nombre);

    //abriendo la transacción en modo escritura.
    var data = dataBase.result.transaction(["polls"],"readwrite");
    var polls = data.objectStore("polls");

    //buscando estudiante por la referencia al key.
    polls.get(""+document.querySelector("#firstName").value + " "+ document.querySelector("#lastName").value).onsuccess = function(e) {

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
            }

            solicitudUpdate.onerror = function (e) {
                console.error("Error Datos Actualizados....");
            }

        }else{
            console.log("Estudiante no encontrado...");
        }
    };


}

/**
 * Envia la información de una lista de encuestas al servidor.
 *
 * Referencias para hacer esta función en: https://www.w3schools.com/js/js_ajax_intro.asp
 * https://www.w3schools.com/jsref/prop_nav_online.asp
 * https://developer.mozilla.org/es/docs/Web/API/NavigatorOnLine/onLine
 * @param polls
 */
function sincronize(polls) {
    if (navigator.onLine) {
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };

        // Se abre un request tipo POST a la ruta /poll de forma Asynchronous  (el ultimo parametro true)
        xhttp.open("POST", "/poll", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        for (let poll in polls) {
            // Manda un request al servidor en la ruta "/poll" con metodo POST
            xhttp.send(
                "firstName="+poll.firstName+
                "&lastName="+poll.lastName+
                "&sector="+poll.sector+
                "&education="+poll.education+
                "&date="+poll.date+
                "&latitude="+poll.latitude+
                "&longitude="+poll.longitude
            );

            // Remueve el elemento correspondiente en el DOM
            document.getElementById("poll-"+poll.id).remove();
        }
    } else {
        alert("No tiene conexión a internet, intente más tarde.");
    }
}

/**
 * Presenta cada elemento de una lista de encuesta en un formato prestablecido para presentar en el DOM
 * @param polls
 */
function printPoll(polls) {
    let container = document.getElementById("pollsStaged");

    for (let poll in polls) {
        let card = document.createElement("div");

        card.innerHTML =
        "<div id=\"poll-\"" + poll.id + " class=\"card mx-auto mb-4 limit-width-on-lg-screen\">\n" +
        "    <div class=\"card-header\">\n" +
        "        <h4 class=\"card-title\">Encuesta #" + poll.id + "</h4>\n" +
        "        <h6 class=\"card-subtitle text-muted\">"+poll.date+"</h6>\n" +
        "    </div>\n" +
        "    <div class=\"card-body\">\n" +
        "        <p class=\"card-text\">Nombres: " + poll.firstName + "</p>\n" +
        "        <p class=\"card-text\">Apellidos: " + poll.lastName + "</p>\n" +
        "        <p class=\"card-text\">Sector: " + poll.sector + "</p>\n" +
        "        <p class=\"card-text\">Nivel de educación: " + poll.education + "</p>\n" +
        "    </div>\n" +
            "    <div class=\"card-footer\">\n" +
            "        <a class=\"btn-secondary\" href=\'#\'>Editar</a>\n" +
            "        <a class=\'btn-danger\' href=\'#\'>Borrar</a>\n" +
            "    </div>\n" +
        "</div>"

        container.appendChild(card);
    }
}