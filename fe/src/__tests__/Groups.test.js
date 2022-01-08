import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Groups from "../views/Groups"


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<Groups/>,"<div></div>");
  
  console.log("testing Groups")

})