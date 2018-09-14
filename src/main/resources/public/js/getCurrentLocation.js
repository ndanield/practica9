function initMap() {
    var mapProp= {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
        streetViewControl: false,

    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);


}

function placeMarker(map, location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}