import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const MapContext = React.createContext();

const MapProvider = ({ children }) => {
  const defaultViewport = {
    width: '100%',
    height: '100vh',
    latitude: 51.15,
    longitude: 10.25,
    zoom: 5.4,
    minZoom: 4.5
  };

  const [viewport, setViewport] = useState(defaultViewport);

  const updateLatLng = (lat, lng) => {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (
      viewport.latitude.toFixed(2) !== latitude.toFixed(2) &&
      viewport.longitude.toFixed(2) !== longitude.toFixed(2)
    ) {
      setViewport(prev => ({
        ...prev,
        latitude: latitude,
        longitude: longitude,
        zoom: 11
      }));
    }
  };

  const updateViewport = view => setViewport(view);
  const resetViewport = () =>
    setViewport({
      ...defaultViewport
    });

  return (
    <MapContext.Provider
      value={{
        updateLatLng,
        viewport,
        updateViewport,
        resetViewport
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired
};

MapProvider.defaultProps = {};

export const MapConsumer = MapContext.Consumer;

export default MapProvider;
