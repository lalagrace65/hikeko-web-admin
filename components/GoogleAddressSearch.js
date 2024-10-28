import React from 'react';
import { MapPin } from 'lucide-react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

function GoogleAddressSearch({ setSelectedAddress, setCoordinates }) {
  return (
    <div className='flex items-center w-full'>
      <MapPin className="w-10 h-10 rounded-l-lg text-red-400 bg-red-200" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        selectProps={{
          placeholder: "Enter Location",
          isClearable: true,
          className: "w-full",
          onChange: async (place) => {
            console.log("Selected place:", place);
            if (place) {
              setSelectedAddress(place); // Set the selected address
              const results = await geocodeByAddress(place.label); // Convert address to lat/lng
              const latLng = await getLatLng(results[0]); 
              console.log("Coordinates:", latLng);
              setCoordinates(latLng); // Set lat/lng coordinates
            } else {
              setSelectedAddress(null);
              setCoordinates(null);
            }
          },
        }}
      />
    </div>
  );
}

export default GoogleAddressSearch;
