import React, { createContext, useReducer } from "react";
import { teamsReducer, authReducer, adminCheckStore } from "./reducer";
import combineReducers from "react-combine-reducers"

const initialTeams = []

const initialAuth = {
  token: '',
  user: '',
  firstname: '',
  lastname: '',
  email: '',
  profilePic: '',
  id: '',
  is_admin: false,
  blocked: false
}

const initialAdminCheck = false

const [combinedReducer, initialState] = combineReducers({
  teams: [teamsReducer, initialTeams],
  auth: [authReducer, initialAuth],
  adminCheck: [adminCheckStore, initialAdminCheck]
})

// export const Context = React.createContext(initialState)
export const Context = React.createContext([initialState, function(){}])

function Store({ children }) {
  const [state, dispatch] = useReducer(combinedReducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export default Store