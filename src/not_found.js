/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import styled from 'styled-components';

import PageDefault from './components/PageDefault';

const Canvas = styled.iframe`
    margin: 0 auto;
    margin-bottom:60px;
    display: block;

 `;

const Paragrafo = styled.p`
   text-align: center;
  
  `;

const Pagina404 = () => (
  <PageDefault>
    <Paragrafo>
      Ops!!
      <br />
      {' '}
      Pagina não encontrada
    </Paragrafo>
    <Canvas
      src="https://mariosouto.com/flappy-bird-devsoutinho/"
      frameBorder="0"
      scrolling="no"
      algin="center"
      width="320"
      height="480"

    />

  </PageDefault>

);
export default Pagina404;
