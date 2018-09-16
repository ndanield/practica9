
// Tu codigo aqui

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