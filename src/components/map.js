// import PropTypes from "prop-types"
import React, { useState, useContext } from 'react';
import ReactMapGL, {
  NavigationControl,
  Marker,
  GeolocateControl
} from 'react-map-gl';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import { FilterContext } from '../contexts/filterProvider';

const StyledMarker = styled.div`
  width: 20px;
  height: 20px;
  background: green;
  border-radius: 20px;
`;

const Map = () => {
  const { filteredData } = useContext(FilterContext);

  const [viewport, setViewport] = useState({
    width: 'calc(100% - 300px)',
    height: '100vh',
    latitude: 51.15,
    longitude: 10.25,
    zoom: 5.4
  });

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
        <div style={{ position: 'absolute', top: 0 }}>
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
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
