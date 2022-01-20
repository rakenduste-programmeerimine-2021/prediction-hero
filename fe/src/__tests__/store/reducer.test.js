
import {adminCheckStore, teamsReducer, authReducer} from '../../store/reducer';

test("test adminCheckStore cases", () => {
    adminCheckStore({},{type:"SET_ADMIN_CHECK",payload:{}})
    adminCheckStore({},{type:"OTHER",payload:{}})
})

test("test teamsReducer cases", () => {
    teamsReducer({},{type:"TEAMS_UPDATE",payload:{}})
    teamsReducer({},{type:"OTHER",payload:{}})
})

test("test authReducer cases", () => {
    authReducer({},{type:"USER_LOGIN",payload:{}})
    authReducer({},{type:"USER_LOGOUT",payload:{}})
    authReducer({},{type:"OTHER",payload:{}})
})