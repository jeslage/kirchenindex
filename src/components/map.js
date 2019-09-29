// import PropTypes from "prop-types"
import React, { useState, useContext } from 'react';
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import styled from 'styled-components';

import { FilterContext } from '../contexts/filterProvider';
import { MapContext } from '../contexts/mapProvider';

const StyledMarker = styled.button`
  width: 20px;
  height: 20px;
  background: ${props => (props.disabled ? 'lightgray' : 'black')};
  border-radius: 20px;
  outline: none;
  border: none;
  appearance: none;
`;

const StyledMap = styled.div`
  flex-grow: 2;

  .map__control {
    position: absolute;
    right: 20px;
    top: 20px;
  }
`;

const Map = () => {
  const { viewport, updateLatLng, updateViewport } = useContext(MapContext);
  const { data, filteredData, updateFilter } = useContext(FilterContext);

  return (
    <StyledMap>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/jeslage/ck13lkmes0p5j1cru4bydm7oy"
        mapboxApiAccessToken="pk.eyJ1IjoiamVzbGFnZSIsImEiOiJjazEzOGU4bmIwNjkwM25zY3VnbzllYjY1In0.yxdP7pdDMiwq7tTBcmMwCQ"
        onViewportChange={viewport => updateViewport(viewport)}
      >
        <div className="map__control">
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
                updateLatLng(node.lat, node.lng);
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
    </StyledMap>
  );
};

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
