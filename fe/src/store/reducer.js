import { POST_ADD, POST_REMOVE, USER_LOGOUT } from "./actions";

const teamsReducer = (state, action) => {

  console.log("HERE IN TEAMS REDUCER")
  switch(action.type){
    case "TEAMS_UPDATE": 
    console.log("UPDATING TEAMS");
        return {
          ...state,
          data: action.payload
        }
    case "POST_UPDATE": 
    console.log("UPDATING");
        return {
          ...state,
          data: state.data.filter((post) => {
            console.log(post.Id === action.payload.Id);
            console.log(post.Id+"!=="+action.payload.Id);
            return post.Id !== action.payload.Id
          }).concat(action.payload)
        }
    default:
      console.log("EI LEIDNUD MIDAGI.")
      return state
  }
}

const authReducer = (state, action) => {
  console.log("HERE IN REDUCER")
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
        user_points: action.payload.user_points
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