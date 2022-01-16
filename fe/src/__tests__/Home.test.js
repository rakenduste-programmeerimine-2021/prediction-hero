import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from "../views/Home"
import Store from "../store/index";
import { BrowserRouter as Router } from "react-router-dom";


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<React.StrictMode>
    <Store>
      <Router>
        <Home/>
      </Router>
    </Store>
  </React.StrictMode>);
  
  console.log("testing Home")

})