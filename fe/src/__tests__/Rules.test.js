import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Rules from "../views/Rules"


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<Rules/>,"<div></div>");
  
  console.log("testing Rules")

})