import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LoginBtn from "../components/loginBtn"
import Store from "../store/index";
import { BrowserRouter as Router } from "react-router-dom";


configure({ adapter: new Adapter() });

test("renders without crashing", () => {
  const checkbox = render(<LoginBtn/>);

})

test("simualte login clicked", () => {
    const wrapper = shallow(<LoginBtn/>)
    console.log(wrapper.find('#login'))
    wrapper.find('#login').simulate('click');
    // expect(wrapper.state('username')).toBe('admin');
})