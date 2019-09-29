import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlyToInterpolator } from 'react-map-gl';

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
    if (
      viewport.latitude.toFixed(2) !== lat.toFixed(2) &&
      viewport.longitude.toFixed(2) !== lng.toFixed(2)
    ) {
      setViewport(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng,
        zoom: 11,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000
      }));
    }
  };

  const updateViewport = view => setViewport(view);
  const resetViewport = () =>
    setViewport({
      ...defaultViewport,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
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
