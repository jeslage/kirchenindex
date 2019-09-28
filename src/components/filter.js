import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../contexts/filterProvider';
import AutosuggestInput from './autosuggest-input';

const StyledFilter = styled.aside`
  position: relative;
  padding: 20px;

  input[disabled] {
    opacity: 0.2;

    & + label {
      opacity: 0.2;
    }
  }

  span {
    width: 20px;
    height: 20px;
    background: gray;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 12px;
    font-weight: bold;
    color: white;
  }
`;

const Filter = () => {
  const { filter, updateFilter, filteredData, resetFilter } = useContext(
    FilterContext
  );

  return (
    <StyledFilter>
      <button type="button" onClick={() => resetFilter()}>
        Filter zurücksetzten
      </button>
      <AutosuggestInput
        placeholder="Stadt"
        value={filter.city}
        onUpdate={value => updateFilter('city', value)}
        items={filteredData.map(({ node }) => ({
          name: node.city
        }))}
      />

      <div>
        <input
          type="checkbox"
          name="destroyed"
          checked={filter.destroyed}
          disabled={
            filteredData.filter(item => item.node.destroyed).length === 0
          }
          onChange={e => updateFilter('destroyed', e.target.checked)}
        />
        <label htmlFor="destroyed">
          Zerstört{' '}
          <span>{filteredData.filter(item => item.node.destroyed).length}</span>
        </label>
      </div>
      <div>
        <input
          type="checkbox"
          name="unused"
          checked={filter.unused}
          disabled={filteredData.filter(item => item.node.unused).length === 0}
          onChange={e => updateFilter('unused', e.target.checked)}
        />
        <label htmlFor="unused">
          Unbenutzt{' '}
          <span>{filteredData.filter(item => item.node.unused).length}</span>
        </label>
      </div>
    </StyledFilter>
  );
};

export default Filter;
