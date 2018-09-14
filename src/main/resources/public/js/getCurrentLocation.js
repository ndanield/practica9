if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        cualquier_funcion(position.coords.latitude, position.coords.longitude)
    })
} else {    
    alert("Error: el navegador no soporta la geolocalización");
}

