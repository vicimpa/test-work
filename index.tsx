import React from "react";
import { render } from "react-dom";

import { HashRouter } from "react-router-dom";

import { MainComponentRouter } from "./components/Main";

const rootElem = document.querySelector('#root')

if(!rootElem)
  throw new Error('Can not find root element!')

render((
  <HashRouter>
    <MainComponentRouter />
  </HashRouter>
), rootElem)
  
