import { UserLocationContext } from "@/context/UserLocationContext";
import { GoogleMap, LoadScript,Marker,InfoWindow, MarkerF } from "@react-google-maps/api";
import React, {useContext} from "react";



function GoogleMapView() {
    const { userLocation } = useContext(UserLocationContext);

    const containerStyle = {
        width: "100%",
        height: "70vh",
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={userLocation}  // Use the userLocation to center the map
                    zoom={12}
                >
                    <Marker position={userLocation} />
                </GoogleMap>
            </LoadScript>
        </div>
    );
}


export default GoogleMapView