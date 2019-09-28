import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  padding: 20px;
`;

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <p>{siteTitle}</p>
  </StyledHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
