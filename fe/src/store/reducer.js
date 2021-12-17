import { POST_ADD, POST_REMOVE, USER_LOGOUT } from "./actions";

const teamsReducer = (state, action) => {

  console.log("HERE IN TEAMS REDUCER")
  console.log(action.payload)
  
  switch(action.type){
    case "TEAMS_UPDATE": 
    console.log("UPDATING TEAMS");
        return {
          ...state,
          data: action.payload
        }
    default:
      console.log("EI LEIDNUD MIDAGI.")
      return state
  }
}

const authReducer = (state, action) => {
  console.log("HERE IN AUTH REDUCER")
  console.log(action.payload)
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
        is_admin: action.payload.is_admin
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
        id: ""
      }
    default:
      return state
  }
}

export { teamsReducer, authReducer }