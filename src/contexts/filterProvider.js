import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

export const FilterContext = React.createContext();

const FilterProvider = ({ children }) => {
  const {
    allChurchesJson: { edges }
  } = useStaticQuery(graphql`
    query Churches {
      allChurchesJson {
        edges {
          node {
            name
            id
            city
            facts
            latitude
            longitude
            confession
            status
            facts
            profaned
            sacred
          }
        }
      }
    }
  `);

  const defaultFilter = {
    city: '',
    status: '',
    confession: ''
  };

  const [filter, setFilter] = useState(defaultFilter);
  const [filteredData, setFilteredData] = useState(edges);

  useEffect(() => {
    let values = edges;

    Object.keys(filter).map(key => {
      if (filter[key] !== '' && key !== 'city') {
        values = values.filter(
          val => val.node[key].toLowerCase() === filter[key].toLowerCase()
        );
      } else if (filter[key] !== '') {
        values = values.filter(val =>
          val.node[key].toLowerCase().includes(filter[key].toLowerCase())
        );
      }
    });

    setFilteredData(values);
  }, [filter]);

  const updateFilter = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  const resetFilter = () => setFilter(defaultFilter);

  return (
    <FilterContext.Provider
      value={{
        filter,
        updateFilter,
        filteredData,
        data: edges,
        resetFilter
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired
};

FilterProvider.defaultProps = {};

export const FilterConsumer = FilterContext.Consumer;

export default FilterProvider;
