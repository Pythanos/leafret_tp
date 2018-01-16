// WatchPosition : suivre la trajectoire
// Simuler un déplacement avec des coordonnées randoms actualisés toutes les 2sec (tracking)
// Utiliser setLatLng

var x = document.getElementById("demo");
var test = 0;
var latitude;
var longitude;
var marker;
var higher;
var lower;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        x.innerHTML = "La géolocalisation n'est pas disponible sur ce navigateur.";
    }
}

function showPosition(position) {

    higher = 0.0003;
    lower = -0.0003;
    newla = Math.random() * (higher - lower) + lower;
    newlo = Math.random() * (higher - lower) + lower;

    console.log('lagitude random : ' + newla);
    console.log('longitude random : ' + newlo);

    if (test == 0) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

        console.log('test :' + test);
    }
    else if (test == 1) {
        latitude = latitude + newla;
        longitude = longitude + newlo;
        x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;

        console.log('test : ' + test);
    }

    console.log('Lagitude : ' + latitude);
    console.log('Longitude : ' + longitude);

    if (test == 0) {
        var mymap = L.map('mapid').setView([latitude, longitude], 13);


        console.log('Initialisation');
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(mymap);
        marker = L.marker([latitude, longitude]).addTo(mymap);
    }
    else if (test == 1) {
        var newLatLng = new L.LatLng(latitude, longitude);
        marker.setLatLng(newLatLng);
    }

    test = 1;
    console.log('OK');
    
}
setInterval(showPosition, 1000);
// Cercles et polygones
var circle = L.circle([45.00, -3.80], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
