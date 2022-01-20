import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Leaderboard from "../../views/Leaderboard"
import Store from "../../store/index";
import { BrowserRouter as Router } from "react-router-dom";

configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  
  const checkbox = render(<React.StrictMode>
    <Store>
      <Router>
        <Leaderboard/>
      </Router>
    </Store>
  </React.StrictMode>);
  
  console.log("testing Leaderboard")

})