import { createContext, useReducer } from "react";
import { teamsReducer, authReducer } from "./reducer";
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
  is_admin: false
}

// const initialTeams = []
const initialGroups = []

const [combinedReducer, initialState] = combineReducers({
  teams: [teamsReducer, initialTeams],
  auth: [authReducer, initialAuth]
})

export const Context = createContext(initialState)

function Store({ children }) {
  const [state, dispatch] = useReducer(combinedReducer, initialState)
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
}

export default Store