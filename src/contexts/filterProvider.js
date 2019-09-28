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
          }
        }
      }
    }
  `);

  const [filter, setFilter] = useState({
    unused: false,
    destroyed: false
  });
  const [filteredData, setFilteredData] = useState(edges);

  useEffect(() => {
    console.log(filter);
    let values = edges;

    Object.keys(filter).map(key => {
      if (filter[key]) {
        values = values.filter(val => val.node[key]);
      }
    });

    setFilteredData(values);
  }, [filter]);

  const updateFilter = (key, value) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext.Provider value={{ filter, updateFilter, filteredData }}>
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
