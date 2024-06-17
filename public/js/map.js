mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    style: "mapbox://styles/mapbox/streets-v12", //style url
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
 
const marker = new mapboxgl.Marker({ color: "red" })
.setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h2>${listing.title}</h2><p>Exact Location will be provided after booking</p>`)
    )
.addTo(map);