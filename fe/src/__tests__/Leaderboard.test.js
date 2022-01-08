import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Leaderboard from "../views/Leaderboard"


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<Leaderboard/>,"<div></div>");
  
  console.log("testing Leaderboard")

})