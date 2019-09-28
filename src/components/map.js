// import PropTypes from "prop-types"
import React, { useState, useContext, useEffect, useMemo } from 'react';
import ReactMapGL, {
  NavigationControl,
  Marker,
  FlyToInterpolator
} from 'react-map-gl';

import styled from 'styled-components';

import { FilterContext } from '../contexts/filterProvider';
import { MapContext } from '../contexts/mapProvider';

const StyledMarker = styled.div`
  width: 20px;
  height: 20px;
  background: green;
  border-radius: 20px;
`;

const Map = () => {
  const { activeViewport } = useContext(MapContext);
  const { filteredData } = useContext(FilterContext);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 51.15,
    longitude: 10.25,
    zoom: 5.4
  });

  useEffect(() => {
    if (activeViewport) goToViewport(activeViewport);
  }, [activeViewport]);

  const goToViewport = ({ lat, lng }) => {
    if (
      viewport.longitude.toFixed(2) !== lng.toFixed(2) &&
      viewport.longitude.toFixed(2) !== lng.toFixed(2)
    ) {
      setViewport({
        longitude: lng,
        latitude: lat,
        zoom: 11,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 3000
      });
    }
  };

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          'pk.eyJ1IjoiamVzbGFnZSIsImEiOiJjazEzOGU4bmIwNjkwM25zY3VnbzllYjY1In0.yxdP7pdDMiwq7tTBcmMwCQ'
        }
        onViewportChange={viewport => setViewport(viewport)}
      >
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl />
        </div>

        {filteredData.map(({ node }) => (
          <Marker
            key={node.id}
            latitude={node.lat}
            longitude={node.lng}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <StyledMarker />
          </Marker>
        ))}
      </ReactMapGL>
    </>
  );
};

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
