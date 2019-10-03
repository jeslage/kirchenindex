import React from 'react';
import PropTypes from 'prop-types';

import FilterProvider from '../../contexts/filterProvider';
import MapProvider from '../../contexts/mapProvider';

import GlobalStyle from './layout.style.js';

const Layout = ({ children }) => {
  return (
    <FilterProvider>
      <MapProvider>
        <GlobalStyle />
        <main>{children}</main>
      </MapProvider>
    </FilterProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
