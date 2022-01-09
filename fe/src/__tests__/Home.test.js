import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from "../views/Home"


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<Home/>,"<div></div>");
  
  console.log("testing Home")

})