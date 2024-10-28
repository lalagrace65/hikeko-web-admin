// context/UserLocationContext.js
"use client"; // This should be a client component since it uses state

import React, { createContext, useState } from "react";

export const UserLocationContext = createContext(null);

export const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null); // Initialize state

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
};
