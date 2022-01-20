import React from "react";
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login, {fbLoginFail} from "../../views/Login"
import Store, {Context} from "../../store/index";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "@mui/material/Button";
import facebookLogin from 'react-facebook-login';


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

test("test fbLoginFailed", () => {
  fbLoginFail()
})

// test("test closeSnacbar", () => {
//   // const wrapper = render(<Login/>)
//   // wrapper.prototype.closeSnacbar()
//   // wrapper.prototype.closeSnacbar()

//   const store=Context;
//   const context = { store };
//    const wrapper = shallow(
//       <Router>
//         <Login />
//       </Router>,
//       { context }
//     );
//     console.log(wrapper)
//    const inst = wrapper.html()
//    console.log(inst.find('div').at(0))
//    inst.closeSnacbar('hello');
// })

// test("simualte login clicked", () => {
  
//     const wrapper = mount(<Router><Login/></Router>)
//     console.log(wrapper.exists('#loginCont'))
//     wrapper.update()
//     console.log(wrapper.find(Button).at(0).html())
//     console.log('SIIN')
//     // let test = (wrapper.findWhere((n) => {
//     //   console.log(n.type())
//     //   return n.type() !== 'string'
//     // }))

//     wrapper.find('#loginButton').at(0).simulate('click');
//     // expect(wrapper.state('username')).toBe('admin');
// })