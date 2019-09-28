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

  input[disabled] {
    opacity: 0.2;
  }
`;

const Filter = () => {
  const { filter, updateFilter, filteredData, resetFilter } = useContext(
    FilterContext
  );

  return (
    <StyledFilter>
      <button type="button" onClick={() => resetFilter()}>
        Reset filter
      </button>
      <AutosuggestInput
        value={filter.city}
        onUpdate={value => updateFilter('city', value)}
        items={filteredData.map(({ node }) => ({
          name: node.city
        }))}
      />

      <label htmlFor="destroyed">
        <input
          type="checkbox"
          name="destroyed"
          checked={filter.destroyed}
          disabled={
            filteredData.filter(item => item.node.destroyed).length === 0
          }
          onChange={e => updateFilter('destroyed', e.target.checked)}
        />
        Destroyed {filteredData.filter(item => item.node.destroyed).length}
      </label>
      <label htmlFor="unused">
        <input
          type="checkbox"
          name="unused"
          checked={filter.unused}
          disabled={filteredData.filter(item => item.node.unused).length === 0}
          onChange={e => updateFilter('unused', e.target.checked)}
        />
        Unused {filteredData.filter(item => item.node.unused).length}
      </label>
    </StyledFilter>
  );
};

export default Filter;
