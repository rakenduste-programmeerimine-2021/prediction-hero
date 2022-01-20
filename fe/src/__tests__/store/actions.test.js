
import {shallow, mount, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {adminCheckStore, updateTeams, loginUser, logoutUser} from '../../store/actions';

test("test adminCheckStore cases", () => {
    adminCheckStore({})
    adminCheckStore({})
})

test("test updateTeams", () => {
    updateTeams([])
})

test("test loginUser", () => {
    loginUser({})
})

test("test logoutUser", () => {
    logoutUser()
})