// import PropTypes from "prop-types"
import React, { useContext } from 'react';

import styled from 'styled-components';

import { FilterContext } from '../contexts/filterProvider';
import { MapContext } from '../contexts/mapProvider';

import Filter from './filter';

const StyledList = styled.div`
  position: relative;
  width: 300px;
  height: 100vh;
  background: white;
  z-index: 2;
  padding: 20px;

  .list__wrapper {
    padding: 20px;
  }

  p {
    margin: 0;
  }
`;

const List = () => {
  const { filteredData, updateFilter } = useContext(FilterContext);
  const { updateActiveViewport } = useContext(MapContext);

  return (
    <StyledList>
      <Filter />
      <div className="list__wrapper">
        <p>
          {filteredData.length}{' '}
          {filteredData.length === 1 ? 'Eintrag' : 'Einträge'}
        </p>
        {filteredData.map(({ node }) => (
          <div key={node.id}>
            <hr />
            <button
              onClick={() => {
                updateFilter('city', node.city);
                updateActiveViewport(node.lat, node.lng);
              }}
            >
              {node.name}
            </button>
            <p>
              Status: {node.destroyed && 'Zerstört'}
              {node.unused && 'Unbenutzt'}
            </p>
            <p>Baujahr: {node.constructionYear}</p>
          </div>
        ))}
      </div>
    </StyledList>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
