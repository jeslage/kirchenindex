import PropTypes from 'prop-types';
import React from 'react';

import StyledHeader from './header.style';

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
