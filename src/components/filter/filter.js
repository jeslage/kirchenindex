import React, { useContext } from 'react';

import { FilterContext } from '../../contexts/filterProvider';
import { MapContext } from '../../contexts/mapProvider';

import AutosuggestInput from '../autosuggest-input/autosuggest-input';

import StyledFilter from './filter.style';

const Filter = () => {
  const { filter, updateFilter, filteredData, resetFilter } = useContext(
    FilterContext
  );

  const { resetViewport, updateLatLng } = useContext(MapContext);

  // Shape cities array for autosuggest input
  const cities = filteredData.map(({ node }) => node.city);
  const filteredCities = cities.filter(
    (item, index) => cities.indexOf(item) === index
  );

  return (
    <StyledFilter>
      <div className="filter__wrapper">
        <AutosuggestInput
          value={filter.city}
          className="filter__input"
          placeholder="Stadt eingeben..."
          onUpdate={value => {
            updateFilter('city', value);

            const newCity = filteredData.filter(({ node }) =>
              node.city.includes(value)
            )[0];
            updateLatLng(newCity.node.latitude, newCity.node.longitude);
          }}
          items={filteredCities.map(item => ({ name: item }))}
        />
        <button
          type="button"
          onClick={() => {
            resetFilter();
            resetViewport();
          }}
        >
          Zurücksetzten
        </button>
      </div>

      <div>
        <div className="filter__selects">
          <div className="filter__select">
            <select
              name="status"
              value={filter.status}
              onChange={e => updateFilter('status', e.target.value)}
            >
              <option value="">Alle Zustände</option>
              <option value="abgerissen">Abgerissen</option>
              <option value="erhalten">Erhalten</option>
              <option value="teils abgerissen/verfallen">
                Teils abgerissen/verfallen
              </option>
            </select>
            <div className="filter__select-icon" />
          </div>
          <div className="filter__select">
            <select
              name="confession"
              value={filter.confession}
              onChange={e => updateFilter('confession', e.target.value)}
            >
              <option value="">Alle Konfessionen</option>
              <option value="Katholisch">Katholisch</option>
              <option value="Evangelisch">Evangelisch</option>
            </select>
            <div className="filter__select-icon" />
          </div>
        </div>
      </div>
    </StyledFilter>
  );
};

export default Filter;
