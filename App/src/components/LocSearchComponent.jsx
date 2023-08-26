import React, { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

function LocSearchComponent({setEventAddress, setEventLocation, setEventLocationId}) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: 'weekly', // specify the version of the Google Maps JavaScript API
      libraries: ['places']
    });

    const initializeMap = (google) => {
      const initialLocation = { lat: 35.607486, lng: 139.685643 }; // initial loc (Ookayama sta.)
      const map = new google.maps.Map(document.getElementById('map'), {
        center: initialLocation,
        zoom: 15
      });

      // create a marker for the initial location
      new google.maps.Marker({
        map: map,
        position: initialLocation
      });
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
        // console.log('Place ID:', place.place_id);
        // console.log('Place ID:', place.geometry.location);
        console.log('Place ID:', place);
        console.log('Place Name:', place.name);
        console.log('Place Address:', place.formatted_address);
        logPlaceDetails(google, place.place_id);
        setEventLocationId(place.place_id);
        setEventLocation(place.name);
        setEventAddress(place.formatted_address.split(',').slice(0, 2).join(',')); // show first two info of full address
      });
    };

    loader
        .load()
        .then((google) => {
            initializeMap(google);
            initializeAutocomplete(google);
            setMapLoaded(true);    
        })
        .catch(error => {
            console.error(error);
        });
  }, []);

  return (
    <div>
        {/* <input type="text" id="autocomplete-input" placeholder="Enter a location" style={{width: '300px', border:'solid'}}/> */}
        <div>
          <label for="Event Location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location*</label>
          <input type="Event Location" name="Event Location" id="autocomplete-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="search location" required></input>
        </div>
        <br></br>
        <div id="map" style={{ width: '100%', height: '240px' }}></div>
        {!mapLoaded && <div>Loading map...</div>}
    </div>
  );
}

export default LocSearchComponent;
