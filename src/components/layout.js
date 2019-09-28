/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';
import FilterProvider from '../contexts/filterProvider';
import MapProvider from '../contexts/mapProvider';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <FilterProvider>
      <MapProvider>
        <Header siteTitle={data.site.siteMetadata.title} />
        <main style={{ display: 'flex' }}>{children}</main>
      </MapProvider>
    </FilterProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
