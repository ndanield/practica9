
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

//indicamos el nombre y la versión
var dataBase = indexedDB.open("offline_db", 1);

//El evento que se dispara una vez, lo
dataBase.onsuccess = function (e) {
    console.log('Process executed successfully');
    listPolls();
};

dataBase.onerror = function (e) {
    console.error('Something happened in the process: '+e.target.errorCode);
};

function listPolls() {
    //por defecto si no lo indico el tipo de transacción será readonly
    var data = dataBase.result.transaction(["polls"]);
    var polls = data.objectStore("polls");

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
            console.log("La cantidad de registros recuperados es: "+counter);
        }
    };

    //Una vez que se realiza la operación llamo la impresión.
    data.oncomplete = function () {
        printPolls(polls_recovered);
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

    // Necesario para mostrar las polls en la lista
    listPolls();

    if (navigator.onLine) {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };

        // Se abre un request tipo POST a la ruta /poll de forma Asynchronous  (el ultimo parametro true)
        xhttp.open("POST", "/poll", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        for (var poll in polls) {
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
function printPolls(polls) {
    var container = document.getElementById("pollsStaged");

    for (var poll in polls) {
        var card = document.createElement("div");

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
            "        <a class=\"btn btn-secondary\" href=\'#\' onclick=\'updatePoll(" + poll.id + ")\'>Editar</a>\n" +
            "        <a class=\'btn btn-danger\' href=\'#\'>Borrar</a>\n" +
            "    </div>\n" +
            "</div>"

        container.appendChild(card);
    }
}
