import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Settings from "../views/Settings"


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<Settings/>,"<div></div>");
  
  console.log("testing Settings")

})