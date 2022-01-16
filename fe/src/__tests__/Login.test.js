import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from "../views/Login"
import Store from "../store/index";
import { BrowserRouter as Router } from "react-router-dom";


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<React.StrictMode>
      <Store>
        <Router>
          <Login/>
        </Router>
      </Store>
    </React.StrictMode>);

})

test("simualte login clicked", () => {
    const wrapper = shallow(<Store>
      <Router>
        <Login/>
      </Router>
    </Store>)
    wrapper.find('button').simulate('click');
    // expect(wrapper.state('username')).toBe('admin');
})