import { POST_ADD, POST_REMOVE, USER_LOGOUT } from "./actions";

const adminCheckStore = (state, action) => {
  switch(action.type){
    case "SET_ADMIN_CHECK": 
        return action.payload
    default:
      return state
  }
}

const teamsReducer = (state, action) => {
  switch(action.type){
    case "TEAMS_UPDATE": 
        return {
          ...state,
          data: action.payload
        }
    default:
      return state
  }
}

const authReducer = (state, action) => {
  switch(action.type){
    case "USER_LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        email: action.payload.email,
        profilePic: action.payload.profilePic,
        id: action.payload.id,
        user_points: action.payload.user_points,
        is_admin: action.payload.is_admin,
        blocked: action.payload.blocked
      }
    case USER_LOGOUT:
      return {
        ...state,
        token: "",
        user: "",
        firstname: "",
        lastname: "",
        email: "",
        profilePic: "",
        id: "",
        is_admin: false
      }
    default:
      return state
  }
}

export { teamsReducer, authReducer, adminCheckStore }