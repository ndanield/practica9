<#-- @ftlvariable name="polls" type="java.util.List<entities.Poll>" -->
<#import "base.ftl" as b>

<@b.base>
    <div id="pollsLocations" class="card mx-auto limit-width-on-lg-screen">
        <div class="card-header">
            Ubicaciones de las encuestas
        </div>
        <div id="googleMap" style="width:100%;height:400px;"></div>
    </div>
</@b.base>



<script>
    function initMap() {
        var coords = [];
        <#list polls as poll>
             coords.push( { lat: ${poll.latitude}, lng: ${poll.longitude} } );
        </#list>

        console.log(coords);

        var mapProp = {
            center: {lat: 19.470587, lng: -70.693633},
            zoom: 8,
            streetViewControl: false,
            fullscreenControl: false
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        for(var coord in coords) {
            var marker = new google.maps.Marker({position: coord});
            marker.setMap(map);
        }
    }

    function placeMarker(map, location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
</script>

<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcn110_QgbCgAWXpEjN0stLtvBt9ZtqFw&callback=initMap">
</script>