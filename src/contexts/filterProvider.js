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
            lat
            lng
            destroyed
            unused
            constructionYear
            profaned
            architect
          }
        }
      }
    }
  `);

  const defaultFilter = {
    city: '',
    unused: false,
    destroyed: false
  };

  const [filter, setFilter] = useState(defaultFilter);
  const [filteredData, setFilteredData] = useState(edges);
  const [activeViewport, setActiveViewport] = useState();

  useEffect(() => {
    let values = edges;

    Object.keys(filter).map(key => {
      if (typeof filter[key] === 'string' && filter[key] !== '') {
        values = values.filter(
          val => val.node[key].toLowerCase() === filter[key].toLowerCase()
        );
      } else if (filter[key]) {
        values = values.filter(val => val.node[key]);
      }
    });

    setFilteredData(values);
  }, [filter]);

  const updateActiveViewport = (lat, lng) => setActiveViewport({ lat, lng });

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
        activeViewport,
        updateActiveViewport,
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
