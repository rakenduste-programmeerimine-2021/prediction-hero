import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FBLoginButton, {noop} from "../components/loginBtn"
import Store from "../store/index";
import { BrowserRouter as Router } from "react-router-dom";


configure({ adapter: new Adapter() });

const responseFacebook = (response) => {
  console.log(response);  
}
const fbLoginFail = () => {
  console.log("FB login failed");
}

test("renders without crashing", () => {
  const checkbox = render(<FBLoginButton responseFacebook={responseFacebook} fbLoginFail={fbLoginFail}/>);

})

test("test noop", () => {
  noop()
})
