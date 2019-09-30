import React, { useContext } from 'react';
import styled from 'styled-components';
import { FilterContext } from '../contexts/filterProvider';
import AutosuggestInput from './autosuggest-input';
import { MapContext } from '../contexts/mapProvider';

const StyledFilter = styled.aside`
  position: relative;

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
  const { resetViewport } = useContext(MapContext);

  // Shape cities array for autosuggest input
  const cities = filteredData.map(({ node }) => node.city);
  const filteredCities = cities.filter(
    (item, index) => cities.indexOf(item) === index
  );

  return (
    <StyledFilter>
      <button
        type="button"
        onClick={() => {
          resetFilter();
          resetViewport();
        }}
      >
        Filter zurücksetzten
      </button>
      <AutosuggestInput
        value={filter.city}
        placeholder="Stadt"
        onUpdate={value => updateFilter('city', value)}
        items={filteredCities.map(item => ({ name: item }))}
      />

      <div>
        <label htmlFor="status">
          Status
          <select
            name="status"
            value={filter.status}
            onChange={e => updateFilter('status', e.target.value)}
          >
            <option value="">Alle</option>
            <option value="abgerissen">Abgerissen</option>
            <option value="erhalten">Erhalten</option>
            <option value="teils abgerissen/verfallen">
              Teils abgerissen/verfallen
            </option>
          </select>
        </label>
      </div>
    </StyledFilter>
  );
};

export default Filter;
