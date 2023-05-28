import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

function MapComponent() {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: 'weekly', // specify the version of the Google Maps JavaScript API
    });

    const mapOptions = {
        center : { lat: 35.605507202533516, lng: 139.68411534103802 },
        zoom: 15
    }

    console.log("Show map la");

    // loader.load().then(() => {
    //   setMapLoaded(true);
    // });
    loader
        .load()
        .then((google) => {
            const map = new google.maps.Map(document.getElementById("map"), mapOptions);

            const markerOptions = {
                position: { lat: 35.605507202533516, lng: 139.68411534103802 },
                map: map,
                title: 'My Marker',
            };
            new google.maps.Marker(markerOptions);

            setMapLoaded(true);    
        })
        .catch(error => {
            console.error(error);
        });

    // return () => {
    //   // Clean up the loaded Google Maps API when the component is unmounted
    //   loader.release();
    // };
  }, []);

  return (
    <div>
        <div id="map" style={{ width: '100%', height: '300px' }}></div>
        {!mapLoaded && <div>Loading map...</div>}
    </div>
  );
}

export default MapComponent;
