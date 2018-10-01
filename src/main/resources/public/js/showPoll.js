
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//indicamos el nombre y la versión
var DBOpenRequest = indexedDB.open("offline_db", 1);

//El evento que se dispara una vez, lo
DBOpenRequest.onsuccess = function () {
    console.log('IndexedDB initialized');
    // De esta forma ya se puede sincronizar
    document.getElementById('syncButton').classList.remove('disabled');
    listPolls();
};

DBOpenRequest.onerror = function (e) {
    console.error('Something happened in the process: ' + e.target.errorCode);
};

function listPolls() {
    var db = DBOpenRequest.result;
    //por defecto si no lo indico el tipo de transacción será readonly
    var transaction = db.transaction(["polls"]);
    // Creo un espacio de alamacenamiento un Object Store llamado polls
    var polls = transaction.objectStore("polls");

    polls.getAll().onsuccess = function (ev) {
        console.log(ev.target.result);
        printPolls(ev.target.result);
    }
    polls.getAll().onerror = function(ev) {
        console.error("Error listando");
    }
}

/***
 * Solo debe ser llamado cuando ya el evento del indexDB "onsuccess" halla sido disparado
 */
function syncPost() {
    var db = DBOpenRequest.result;
    //por defecto si no lo indico el tipo de transacción será readonly
    var transaction = db.transaction(["polls"]);
    // Creo un espacio de alamacenamiento un Object Store llamado polls
    var polls = transaction.objectStore("polls");

    polls.getAll().onsuccess = function (ev) {
        synchronize(ev.target.result);
    };
    polls.getAll().onerror = function(ev) {
        console.error("Error listando");
    };
}

/**
 * Presenta cada elemento de una lista de encuesta en un formato prestablecido para presentar en el DOM
 * @param polls
 */
function printPolls(polls) {

    var container = document.getElementById("pollsStaged");

    for (var key in polls) {
        var card = document.createElement("div");

        card.innerHTML =
            "<div id=\"poll-" + polls[key].id + "\" class='card mx-auto mb-4 limit-width-on-lg-screen'>\n" +
            "    <div class=\"card-header\">\n" +
            "        <h4 class=\"card-title\">Registro de encuesta #" +polls[key].id + "</h4>\n" +
            "        <h6 class=\"card-subtitle text-muted\">"+polls[key].date+"</h6>\n" +
            "    </div>\n" +
            "    <div class=\"card-body\">\n" +
            "        <p class=\"card-text\">Nombres: " +polls[key].firstName + "</p>\n" +
            "        <p class=\"card-text\">Apellidos: " +polls[key].lastName + "</p>\n" +
            "        <p class=\"card-text\">Sector: " +polls[key].sector + "</p>\n" +
            "        <p class=\"card-text\">Nivel de educación: " +polls[key].education + "</p>\n" +
            "    </div>\n" +
            "    <div class=\"card-footer\">\n        " +
            "         <a href='/poll/edit/" + polls[key].id +"' class=\"btn btn-secondary\">Editar</a>\n" +
            "        <button class=\'btn btn-danger\' onclick=\'deletePoll("+ polls[key].id +")\'>Borrar</button>\n" +
            "    </div>\n" +
            "</div>"
        container.appendChild(card);
    }
}

/**
 * Envia la información de una lista de encuestas al servidor.
 *
 * Referencias para hacer esta función en: https://www.w3schools.com/js/js_ajax_intro.asp
 * https://www.w3schools.com/jsref/prop_nav_online.asp
 * https://developer.mozilla.org/es/docs/Web/API/NavigatorOnLine/onLine
 * @param polls
 */
function synchronize(polls) {
    if (navigator.onLine) {
        console.log("Estas online");

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(this.responseText);
                deleteAll();
            }
        };

        // Se abre un DBOpenRequest tipo POST a la ruta /poll de forma Asynchronous  (el ultimo parametro true)
        xhttp.open("POST", "/poll", true);
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-type", "application/json");

        // Manda un DBOpenRequest al servidor en la ruta "/poll" con metodo POST
        xhttp.send(JSON.stringify(polls));

        // Remueve los elementos en la lista
        // se podria usar la propiedad innerHTML pero en https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        // dicen que de hecho es mas lento que la siguiente:
        var pollsStaged = document.getElementById("pollsStaged");
        while (pollsStaged.firstChild) {
            pollsStaged.removeChild(pollsStaged.firstChild);
        }

    } else {
        console.log("No hay conexion");
        alert("No tiene conexión a internet, intente más tarde.");
    }
}

function deleteAll() {
    var db = DBOpenRequest.result;
    //por defecto si no lo indico el tipo de transacción será readonly
    var transaction = db.transaction(["polls"], 'readwrite');
    // Creo un espacio de alamacenamiento un Object Store llamado polls
    var polls = transaction.objectStore("polls");

    var counter = 0;
    var polls_recovered=[];

    //abriendo el cursor.
    polls.openCursor().onsuccess=function(e) {
        //recuperando la posicion del cursor
        var cursor = e.target.result;
        if(cursor){
            counter++;
            //recuperando el objeto.
            polls_recovered.push(cursor.value);

            //Función que permite seguir recorriendo el cursor.
            cursor.continue();

        } else {
            console.log("La cantidad de registros a borrar es: "+counter);
        }

        for (var i in polls_recovered) {
            polls.delete(polls_recovered[i].id).onsuccess = function (e) {

            };
        }

    };

    //Una vez que se realiza la operación llamo la impresión.
    transaction.oncomplete = function () {
        console.log("Todo borrado patron!");
    };
}