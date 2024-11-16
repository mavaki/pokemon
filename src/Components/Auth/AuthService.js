import Parse from "parse";

// create a new user
export const createUser = async (newUser) => {
  const user = new Parse.User();
  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  try {
    const newUserSaved = await user.signUp();
    return newUserSaved;
  } catch (error) {
    alert(`Error: ${error.message}`);
    throw error; // rethrow to handle in calling function
  }
};

// login current user
export const loginUser = async (currUser) => {
  try {
    const currUserSaved = await Parse.User.logIn(
      currUser.email,
      currUser.password
    );
    return currUserSaved;
  } catch (error) {
    alert(`Error: ${error.message}`);
    throw error; // rethrow to handle in calling function
  }
};

// check if user is logged in
export const checkUser = async () => {
  const user = await Parse.User.currentAsync();
  return !!user;
};

// logout current user
export const logoutUser = async () => {
  try {
    await Parse.User.logOut();
  } catch (error) {
    console.log("Error logging out: ", error);
  }
};
