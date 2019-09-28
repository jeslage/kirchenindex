// import PropTypes from "prop-types"
import React, { useState, useContext, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  Marker,
  FlyToInterpolator
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import styled from 'styled-components';

import { FilterContext } from '../contexts/filterProvider';
import { MapContext } from '../contexts/mapProvider';

const StyledMarker = styled.button`
  width: 20px;
  height: 20px;
  background: ${props => (props.disabled ? 'lightgray' : 'green')};
  border-radius: 20px;
  outline: none;
  border: none;
  appearance: none;
`;

const Map = () => {
  const { activeViewport, updateActiveViewport } = useContext(MapContext);
  const { data, filteredData, updateFilter } = useContext(FilterContext);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 51.15,
    longitude: 10.25,
    zoom: 5.4,
    minZoom: 4.5
  });

  const goToViewport = ({ lat, lng }) => {
    if (
      viewport.longitude.toFixed(2) !== lng.toFixed(2) &&
      viewport.longitude.toFixed(2) !== lng.toFixed(2)
    ) {
      setViewport(prev => ({
        ...prev,
        longitude: lng,
        latitude: lat,
        zoom: 11,
        transitionInterpolator: new FlyToInterpolator(),
        transitionDuration: 2000
      }));
    }
  };

  useEffect(() => {
    if (activeViewport) goToViewport(activeViewport);
  }, [activeViewport]);

  return (
    <>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/jeslage/ck13lkmes0p5j1cru4bydm7oy"
        mapboxApiAccessToken={
          'pk.eyJ1IjoiamVzbGFnZSIsImEiOiJjazEzOGU4bmIwNjkwM25zY3VnbzllYjY1In0.yxdP7pdDMiwq7tTBcmMwCQ'
        }
        onViewportChange={viewport => setViewport(viewport)}
      >
        <div style={{ position: 'absolute', right: 0 }}>
          <NavigationControl />
        </div>

        {data.map(({ node }) => (
          <Marker
            key={node.id}
            latitude={node.lat}
            longitude={node.lng}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <StyledMarker
              onClick={() => {
                updateActiveViewport(node.lat, node.lng);
                updateFilter('city', node.city);
              }}
              disabled={
                filteredData.filter(item => item.node.id === node.id).length ===
                0
              }
            />
          </Marker>
        ))}
      </ReactMapGL>
    </>
  );
};

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
