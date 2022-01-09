import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from "../views/Login"


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<Login/>,"<div></div>");
  
  console.log("testing")

})