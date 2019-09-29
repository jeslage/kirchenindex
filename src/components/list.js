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
  display: flex;
  flex-direction: column;
  z-index: 2;

  .list__filter {
    padding: 20px;
  }

  .list__wrapper {
    flex-grow: 2;
    overflow-y: auto;
  }

  .list__headline {
    top: 0;
    position: sticky;
    padding: 10px 20px;
    background: white;
    border-bottom: 1px solid gray;
  }

  .list__inner {
    padding: 20px;
  }

  p {
    margin: 0;
  }
`;

const List = () => {
  const { filteredData, updateFilter } = useContext(FilterContext);
  const { updateLatLng } = useContext(MapContext);

  return (
    <StyledList>
      <div className="list__filter">
        <Filter />
      </div>
      <div className="list__wrapper">
        <p className="list__headline">
          {filteredData.length}{' '}
          {filteredData.length === 1 ? 'Eintrag' : 'Einträge'}
        </p>
        <div className="list__inner">
          {filteredData.map(({ node }) => (
            <div key={node.id}>
              <hr />
              <button
                onClick={() => {
                  updateFilter('city', node.city);
                  updateLatLng(node.lat, node.lng);
                }}
              >
                {node.name}
              </button>
              <p>
                {node.lat} {node.lng}
              </p>
              <p>
                Status: {node.destroyed && 'Zerstört'}
                {node.unused && 'Unbenutzt'}
              </p>
              <p>Baujahr: {node.constructionYear}</p>
              <p>Entweiht: {node.profaned}</p>
              <p>Architekt: {node.architect}</p>
            </div>
          ))}
        </div>
      </div>
    </StyledList>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
