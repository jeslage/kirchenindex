// import PropTypes from "prop-types"
import React, { useContext } from 'react';

import styled from 'styled-components';

import { FilterContext } from '../contexts/filterProvider';
import { MapContext } from '../contexts/mapProvider';

import Filter from './filter';

const StyledList = styled.div`
  position: relative;
  width: 55%;
  height: 100vh;
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 2;
  overflow-y: auto;
  border-left: 1px solid black;

  .list__filter {
    padding: 20px;
  }

  .list__headline {
    padding: 10px 20px;
    background: white;
    border-bottom: 1px solid gray;
  }

  .list__wrapper {
    flex-grow: 2;
    overflow-y: auto;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;

    td {
      padding: 15px;
      border-bottom: 1px solid black;

      span {
        position: relative;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: yellow;
        top: 2px;
        margin-right: 5px;

        &[data-status='erhalten'] {
          background: green;
        }

        &[data-status='abgerissen'] {
          background: red;
        }
      }
    }

    thead td {
      top: 0;
      position: sticky;
      background: #000;
      color: #fff;
      z-index: 1;
    }
  }

  p {
    margin: 0;
  }
`;

const List = () => {
  const { filteredData, data, updateFilter } = useContext(FilterContext);
  const { updateLatLng } = useContext(MapContext);

  return (
    <StyledList>
      <div className="list__filter">
        <Filter />
      </div>
      <p className="list__headline">
        {filteredData.length}/{data.length}{' '}
        {filteredData.length === 1 ? 'Eintrag' : 'Einträge'}
      </p>

      <div className="list__wrapper">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Geweiht</td>
              <td>Entweiht</td>
              <td>Stadt</td>
              <td>Fakten</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(({ node }) => (
              <tr key={node.id}>
                <td>
                  <span data-status={node.status} />
                  <button
                    onClick={() => {
                      updateFilter('city', node.city);

                      if (node.latitude !== '' && node.longitude !== '') {
                        updateLatLng(
                          parseFloat(node.latitude),
                          parseFloat(node.longitude)
                        );
                      }
                    }}
                  >
                    {node.name}
                  </button>
                </td>

                <td>{node.sacred}</td>
                <td>{node.profaned}</td>
                <td>{node.city}</td>
                <td>{node.facts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledList>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
