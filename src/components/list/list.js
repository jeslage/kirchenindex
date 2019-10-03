import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import { FilterContext } from '../../contexts/filterProvider';
import { MapContext } from '../../contexts/mapProvider';

import Filter from '../filter/filter';
import Header from '../header/header';

import StyledList from './list.style';

const List = () => {
  const { filteredData, data, updateFilter } = useContext(FilterContext);
  const { updateLatLng } = useContext(MapContext);

  const seo = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <StyledList>
      <Header siteTitle={seo.site.siteMetadata.title} />

      <div className="list__filter">
        <Filter />
      </div>

      <div className="list__wrapper">
        <p className="list__headline">
          {filteredData.length} von {data.length} Einträgen
        </p>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Stadt</td>
              <td>Konfession</td>
              <td>Geweiht</td>
              <td>Entweiht</td>
              <td>Zustand</td>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(({ node }) => (
              <tr
                key={node.id}
                onClick={() => {
                  updateFilter('city', node.city);

                  if (node.latitude !== '' && node.longitude !== '') {
                    updateLatLng(
                      parseFloat(node.latitude),
                      parseFloat(node.longitude)
                    );
                  }
                }}
              >
                <td>
                  <div className="list__city">{node.name}</div>
                </td>

                <td>{node.city}</td>
                <td>{node.confession}</td>
                <td>{node.sacred}</td>
                <td>{node.profaned}</td>
                <td>{node.facts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </StyledList>
  );
};

List.propTypes = {};

List.defaultProps = {};

export default List;
