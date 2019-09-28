// import PropTypes from "prop-types"
import React, { useContext } from 'react';

import styled from 'styled-components';

import { FilterContext } from '../contexts/filterProvider';

const StyledList = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  z-index: 2;
  padding: 20px;
`;

const List = () => {
  const { filteredData } = useContext(FilterContext);

  return (
    <StyledList>
      <p>{filteredData.length}</p>
      {filteredData.map(({ node }) => (
        <p>{node.name}</p>
      ))}
    </StyledList>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
