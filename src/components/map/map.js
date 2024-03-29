// import PropTypes from "prop-types"
import React, { useContext } from 'react';
import MapGL, { Marker, NavigationControl } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';

import { FilterContext } from '../../contexts/filterProvider';
import { MapContext } from '../../contexts/mapProvider';

import { StyledMarker, StyledMap } from './map.style';

const Map = () => {
  const { viewport, updateLatLng, updateViewport } = useContext(MapContext);
  const { filteredData, updateFilter } = useContext(FilterContext);

  const ClusterMarker = ({ longitude, latitude, pointCount }) => (
    <Marker longitude={longitude} latitude={latitude}>
      <StyledMarker
        isCluster
        onClick={() => {
          updateLatLng(latitude, longitude);
        }}
      >
        {pointCount}
      </StyledMarker>
    </Marker>
  );

  return (
    <StyledMap>
      <MapGL
        {...viewport}
        viewportChangeMethod="flyTo"
        style={{ width: '100%', height: '100vh' }}
        mapStyle="mapbox://styles/jeslage/ck13lkmes0p5j1cru4bydm7oy"
        accessToken="pk.eyJ1IjoiamVzbGFnZSIsImEiOiJjazEzOGU4bmIwNjkwM25zY3VnbzllYjY1In0.yxdP7pdDMiwq7tTBcmMwCQ"
        onViewportChange={viewport => updateViewport(viewport)}
      >
        <NavigationControl showCompass showZoom position="top-right" />
        <Cluster
          radius={25}
          extent={512}
          nodeSize={64}
          component={ClusterMarker}
        >
          {filteredData.map(({ node }) => (
            <Marker
              key={node.id}
              latitude={node.latitude}
              longitude={node.longitude}
            >
              <StyledMarker
                onClick={() => {
                  updateLatLng(
                    parseFloat(node.latitude),
                    parseFloat(node.longitude)
                  );
                  updateFilter('city', node.city);
                }}
                disabled={
                  filteredData.filter(item => item.node.id === node.id)
                    .length === 0
                }
              />
            </Marker>
          ))}
        </Cluster>
      </MapGL>
    </StyledMap>
  );
};

Map.propTypes = {};

Map.defaultProps = {};

export default Map;
