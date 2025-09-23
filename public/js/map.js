// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//   container: "map",
//   style: "mapbox://styles/mapbox/streets-v12",
//   center: listing.geometry.coordinates,
//   zoom: 9,
// });

// const marker = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(listing.geometry.coordinates)
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 }).setHTML(
//       `<div class="map-click">
//       <h4><b>${listing.title}</b></h4> 
//       <p>Exact loaction will be provided after booking.</p>
//       </div>`
//     )
//   )
//   .addTo(map);




mapboxgl.accessToken = mapToken;

// Ensure listing and coordinates exist
if (listing && listing.geometry && Array.isArray(listing.geometry.coordinates) && listing.geometry.coordinates.length === 2) {
    console.log("listing object:", listing);

    const map = new mapboxgl.Map({
        container: "map",
        style: 'mapbox://styles/mapbox/streets-v12', // ✅ "streets-v12" is stable
        center: listing.geometry.coordinates,  // [lng, lat]
        zoom: 8
    });

    new mapboxgl.Marker({ color: 'red' })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(`<h4>${listing.title || "Location"}</h4><p>Exact location provided after booking</p>`)
        )
        .addTo(map)
        .togglePopup();

    // ✅ Controls must be inside the same block
    map.addControl(new mapboxgl.ScaleControl());
    map.addControl(new mapboxgl.NavigationControl());
} else {
    console.error("Invalid or missing coordinates in listing.geometry");
}
