import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../contexts/filterProvider';
import AutosuggestInput from './autosuggest-input';

const StyledFilter = styled.aside`
  position: relative;
  padding: 20px;

  label {
    display: block;
  }
`;

const Filter = () => {
  const { filter, updateFilter, filteredData } = useContext(FilterContext);

  return (
    <StyledFilter>
      <AutosuggestInput
        onUpdate={value => updateFilter('city', value)}
        items={filteredData.map(({ node }) => ({ name: node.city }))}
      />

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
