import { UserLocationContext } from "@/context/UserLocationContext";
import { GoogleMap, LoadScript,Marker,InfoWindow, MarkerF } from "@react-google-maps/api";
import React, {useContext} from "react";



function GoogleMapView({ latitude, longitude }) {
    const { userLocation } = useContext(UserLocationContext);

    const containerStyle = {
        width: "100%",
        height: "70vh",
    };

    // Create a position object from the latitude and longitude
    const markerPosition = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
    };


    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation}  // Use the userLocation to center the map
                    zoom={12}
                >
                    {/* Add marker at the inputted latitude and longitude */}
                    {latitude && longitude &&
                     <Marker position={markerPosition} 
                        icon={{
                            url: '/marker.png',
                            scaledSize: {
                                width: 50,
                                height: 50,
                            }
                        }} 
                        />
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    );
}


export default GoogleMapView