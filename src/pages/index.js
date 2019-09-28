import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Map from '../components/map';
import Filter from '../components/filter';
import List from '../components/list';

const IndexPage = () => (
  <Layout>
    <Map />
    <List />
  </Layout>
);

export default IndexPage;
