import { POST_ADD, POST_REMOVE, USER_LOGIN, USER_LOGOUT } from "./actions";

const postReducer = (state, action) => {
  console.log(action.state);
  switch(action.type){
    case POST_ADD:
      console.log("ADDING");
      return {
        ...state,
        data: state.data.concat(action.payload)
      };
    case POST_REMOVE:
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.payload)
      }
    // Kodutööna uue listi vastu võtmine maybe
    case "POSTS_UPDATE": 
    console.log("UPDATING POSTS");
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
        profilePic: action.payload.profilePic
      }
    case USER_LOGOUT:
      return {
        ...state,
        token: "",
        user: "",
        firstname: "",
        lastname: "",
        email: "",
        profilePic: ""
      }
    default:
      return state
  }
}

export { postReducer, authReducer }