import { POST_ADD, POST_REMOVE, USER_LOGOUT } from "./actions";

const postReducer = (state, action) => {
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
        id: action.payload.id
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

export { postReducer, authReducer }