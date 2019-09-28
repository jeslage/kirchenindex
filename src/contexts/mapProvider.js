import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const MapContext = React.createContext();

const MapProvider = ({ children }) => {
  const [activeViewport, setActiveViewport] = useState();

  const updateActiveViewport = (lat, lng) => setActiveViewport({ lat, lng });

  return (
    <MapContext.Provider
      value={{
        activeViewport,
        updateActiveViewport
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
