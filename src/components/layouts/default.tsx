import React from 'react';
import Header from '../Header';
import Container from './container';
import '../../newStyles/index.less';

function DefaultLayout(props: any) {
  return (
    <div>
      <Header></Header>
      <Container>{props.children}</Container>
    </div>
  );
}

export default DefaultLayout;
