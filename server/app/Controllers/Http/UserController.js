"use strict";
const Env = use("Env");
const Helpers = use("Helpers");
const Persona = use("Persona");
const User = use("App/Models/User");

class UserController {
  // Default example: find all registered users
  async index() {
    return await User.all();
  }

  async forgotPassword({ request }) {
    // Send forgot password email with token link
    return await Persona.forgotPassword(request.input("uid"));
  }

  async getCurrentUser({ auth }) {
    // get current user data object
    const user = await auth.getUser();
    // get current token value for user
    const token = await auth.getAuthHeader();
    return user;
  }

  async login({ request, auth }) {
    // create payload from uid and password
    const payload = request.only(["uid", "password"]);
    // authenticate the user with Persona, returns user
    const user = await Persona.verify(payload);
    // respond to client with user token
    return await auth.generate(user);
  }

  async logout({ auth }) {
    // get the current user
    const user = await auth.getUser();
    // get current token value for user
    const token = await auth.getAuthHeader();
    // revoke token
    await user.tokens().where("token", token).update({ is_revoked: true });
    // respond to client with user data object
    return user;
  }

  async register({ request, auth, response }) {
    // create payload object with registration fields
    const payload = request.only([
      "email",
      "first_name",
      "last_name",
      "password",
      "password_confirmation",
    ]);
    const { first_name, last_name } = payload;
    // create full_name
    payload.full_name = `${first_name} ${last_name}`;
    // set default profile image to user initials
    payload.profile_image_source = `https://ui-avatars.com/api/?name=${first_name}+${last_name}`;
    // add the newly registered user to the user table, triggers mail event, returns user
    const user = await Persona.register(payload);
    // respond to client with authentication token
    return await auth.generate(user);
  }

  // show a user profile
  async show({ auth, params }) {
    // get user id from query params
    const { id } = params;
    // get the current user
    const user = await auth.getUser();
    // verify current user id matches id from query params
    if (user.id !== Number(id)) {
      // if no match, log error. No return of user data.
      return "You cannot see someone else's profile";
    }
    // return user data object
    return user;
  }

  // update user profile information
  async update({ request, auth }) {
    // get current user data object
    const user = await auth.user;
    // create payload from first and last name
    const payload = request.only(["first_name", "last_name"]);
    // create full name field
    payload.full_name = `${payload.first_name} ${payload.last_name}`;
    // use Persona to update data in user table, returns user
    await Persona.updateProfile(user, payload);
    // get (updated) current user data object
    const updatedUser = await auth.user;
    // respond to client with updated user data object
    return updatedUser;
  }

  // change user password from profile edit
  async updateEmail({ request, auth }) {
    // get email
    const payload = request.only(["email"]);
    // get current user data object
    const user = await auth.user;
    // respond to client with updated user data object, user Persona to update email, triggers email event, returns user
    return await Persona.updateProfile(user, payload);
  }

  // linked with update()
  // must be a post request since a new file is created
  async updateProfilePic({ request, auth }) {
    // get current user data object
    const user = await auth.user;
    // create file from client upload
    const file = await request.file("profileImage");
    // if file is not null or undefined
    // move the image file to the static/images folder
    if (file) {
      // move the image to the public images folder and name with format `first-last-1.filetype` overwriting any images with the same name
      await file.move(Helpers.appRoot("public/images"), {
        name: `${user.first_name}-${user.last_name}-${user.id}.${file.subtype}`,
        overwrite: true,
      });
      // if the file wasn't able to be moved, respond to client with the error response
      if (!file.moved()) {
        return file.error();
      }
      // Update the image link in the user's image source column
      user.profile_image_source = `${Env.get("APP_URL")}/images/${
        user.first_name
      }-${user.last_name}-${user.id}.${file.subtype}`;
      // update the user table with the updated user object containing the new image
      user.save();
      // respond to the client with the updated user data object
      return user;
    }
    // if there in no file, log message and return
    return "No file uploaded";
  }

  // change user password from profile edit
  async updatePassword({ request, auth }) {
    // create payload from client update password form
    const payload = request.only([
      "old_password",
      "password",
      "password_confirmation",
    ]);
    // get current user data object
    const user = await auth.user;
    // respond to client with updated data user object, Persona updates user with new password, triggers email event, returns user
    return await Persona.updatePassword(user, payload);
  }

  // update user password by token
  async updatePasswordByToken({ request }) {
    // get token decoded from it's url form to a plain string
    const token = decodeURIComponent(request.input("token"));
    // create payload from client update password form
    const payload = request.only(["password", "password_confirmation"]);
    // use Persona to update password using the token, returns user
    const user = await Persona.updatePasswordByToken(token, payload);
    // respond to client with updated user data object
    return user;
  }

  // verify a new user's account by token
  async verifyEmail({ request }) {
    // get token from query string params in URL
    const token = request.input("token");
    // activate the user account
    const user = await Persona.verifyEmail(token);
    // respond to client with updated user data object
    return user;
  }
}

module.exports = UserController;
