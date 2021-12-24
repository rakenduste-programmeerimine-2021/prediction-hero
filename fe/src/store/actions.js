export const POST_ADD = "POST_ADD"
export const POST_REMOVE = "POST_REMOVE"
export const USER_LOGOUT = "USER_LOGOUT"

export const addPost = post => ({
  type: POST_ADD,
  payload: post
})

export const removePost = id => ({
  type: POST_REMOVE,
  payload: id
})

// Lisada siis uus konstant selle jaoks ja muuta ka reduceris
export const updateTeams = array => ({
  type: "TEAMS_UPDATE",
  payload: array
})

export const loginUser = data => ({
  type: "USER_LOGIN",
  payload: data
})

export const adminCheckStore = ((data) => {
  console.log("ADMINCHECKSTORE??????")
  return {
    type: "SET_ADMIN_CHECK",
    payload: data
  }
})

export const logoutUser = () => ({
  type: USER_LOGOUT,
  payload: {
    token: "", 
    user: "", 
    firstname: "", 
    lastname: "",
    email: "",
    profilePic: "",
    user_points: 0,
    is_admin: false
  }
})