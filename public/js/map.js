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




// Make sure your mapbox-gl script and CSS are included in your layout BEFORE this file runs.
// Example (in your layout or show.ejs):
// <link href="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.css" rel="stylesheet">
// <script src="https://api.mapbox.com/mapbox-gl-js/v3.2.0/mapbox-gl.js"></script>

document.addEventListener("DOMContentLoaded", () => {
  try {
    // 1️⃣ Ensure token is available
    if (!mapToken || mapToken === "undefined") {
      console.error("❌ Mapbox token is missing");
      return;
    }

    mapboxgl.accessToken = mapToken;

    // 2️⃣ Parse listing correctly (in EJS it may come as a string)
    let parsedListing = typeof listing === "string" ? JSON.parse(listing) : listing;

    // 3️⃣ Ensure valid coordinates
    if (
      parsedListing &&
      parsedListing.geometry &&
      Array.isArray(parsedListing.geometry.coordinates) &&
      parsedListing.geometry.coordinates.length === 2
    ) {
      console.log("✅ Listing geometry:", parsedListing.geometry.coordinates);

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: parsedListing.geometry.coordinates, // [lng, lat]
        zoom: 9,
      });

      // Add marker and popup
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(parsedListing.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${parsedListing.title || "Listing"}</h4><p>${parsedListing.location || ""}</p>`
          )
        )
        .addTo(map)
        .togglePopup();

      // Add navigation and scale controls
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(new mapboxgl.ScaleControl());
    } else {
      console.error("❌ Invalid or missing coordinates:", parsedListing.geometry);
    }
  } catch (err) {
    console.error("❌ Mapbox initialization failed:", err);
  }
});
