import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Predict from "../views/Predict"


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<Predict/>,"<div></div>");
  
  console.log("testing Predict")

})