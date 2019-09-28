import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../contexts/filterProvider';

const StyledFilter = styled.aside`
  position: fixed;
  top: 50%;
  background: white;
  left: 0;
  z-index: 1;
  padding: 20px;

  label {
    display: block;
  }
`;

const Filter = () => {
  const { filter, updateFilter } = useContext(FilterContext);

  return (
    <StyledFilter>
      <label htmlFor="destroyed">
        <input
          type="checkbox"
          name="destroyed"
          value={filter.destroyed}
          onChange={e => updateFilter('destroyed', e.target.checked)}
        />
        Destroyed
      </label>
      <label htmlFor="unused">
        <input
          type="checkbox"
          name="unused"
          value={filter.unused}
          onChange={e => updateFilter('unused', e.target.checked)}
        />
        Unused
      </label>
    </StyledFilter>
  );
};

export default Filter;
