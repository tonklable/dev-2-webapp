import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

function LocSearchComponent(props) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: 'weekly', // specify the version of the Google Maps JavaScript API
      libraries: ['places']
    });

    const mapOptions = {
        // center : { lat: 35.605507202533516, lng: 139.68411534103802 },
        center : { lat: props.lat_val, lng: props.lng_val },
        zoom: 15
    }

    const logPlaceDetails = (google, placeId) => {
      const service = new google.maps.places.PlacesService(document.getElementById('map'));
      service.getDetails({
        placeId: placeId
      }, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const map = new google.maps.Map(document.getElementById('map'), {
            center: place.geometry.location,
            zoom: 15
          });
  
          new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
        }
      });
    };

    const initializeAutocomplete = (google) => {
      const input = document.getElementById('autocomplete-input');
      const autocomplete = new google.maps.places.Autocomplete(input);
  
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log('Place ID:', place.place_id);
        logPlaceDetails(google, place.place_id);
      });
    };

    loader
        .load()
        .then((google) => {
            initializeAutocomplete(google);
            setMapLoaded(true);    
        })
        .catch(error => {
            console.error(error);
        });

    /* need debug? */
    // return () => {
    //   // Clean up the loaded Google Maps API when the component is unmounted
    //   loader.release();
    // };
  }, []);

  return (
    <div>
        <input type="text" id="autocomplete-input" placeholder="Enter a location" style={{width: '300px', border:'solid'}}/>
        <div id="map" style={{ width: '100%', height: '240px' }}></div>
        {!mapLoaded && <div>Loading map...</div>}
    </div>
  );
}

export default LocSearchComponent;
