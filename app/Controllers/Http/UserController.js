"use strict";

const Helpers = use("Helpers");
const Persona = use("Persona");
const User = use("App/Models/User");

class UserController {
  async index() {
    return await User.all();
  }

  async getCurrentUser({ auth }) {
    const user = await auth.getUser();
    const token = await auth.getAuthHeader();
    return user;
  }

  async login({ request, auth, response }) {
    const payload = request.only(["uid", "password"]);
    const user = await Persona.verify(payload);
    return await auth.generate(user);
  }

  async logout({ auth }) {
    const user = await auth.getUser();
    const token = await auth.getAuthHeader();
    await user
      .tokens()
      .where("token", token)
      .update({ is_revoked: true });
    return user;
  }

  async register({ request, auth, response }) {
    const payload = request.only([
      "email",
      "first_name",
      "last_name",
      "password",
      "password_confirmation"
    ]);
    const { first_name, last_name } = payload;
    payload.full_name = `${first_name} ${last_name}`;
    payload.profile_image_source = `https://ui-avatars.com/api/?name=${first_name}+${last_name}`;
    const user = await Persona.register(payload);
    return await auth.generate(user);
  }

  // show a user profile
  async show({ auth, params }) {
    const { id } = params;
    const user = await auth.getUser();
    if (user.id !== Number(id)) {
      return "You cannot see someone else's profile";
    }
    return user;
  }

  // verify a new user's account by token
  async verifyEmail({ request, params, session, response }) {
    console.log("verifying email");
    const token = request.input("token");
    const user = await Persona.verifyEmail(token);
    session.flash({ message: "Email verified" });
  }

  // update user profile information
  async update({ request, auth }) {
    const user = await auth.user;
    const payload = request.only(["first_name", "last_name"]);
    payload.full_name = `${payload.first_name} ${payload.last_name}`;
    await Persona.updateProfile(user, payload);
    const updatedUser = await auth.user;
    return updatedUser;
  }

  // linked with update()
  // must be a post request since a new file is created
  async updateProfilePic({ request, auth }) {
    const user = await auth.user;
    const file = await request.file("profile_image_source");
    // move the image file to the static/images folder
    await file.move(Helpers.appRoot("static/images"), {
      name: `${user.first_name}-${user.last_name}-${user.id}.${file.subtype}`,
      overwrite: true
    });
    // error handling for file move
    if (!file.moved()) {
      return file.error();
    }
    // Update the image link in the user's image source column
    user.profile_image_source = `/images/${user.first_name}-${user.last_name}-${user.id}.${file.subtype}`;
    user.save();
    return file;
  }

  // change user password from profile edit
  async updatePassword({ request, auth }) {
    const payload = request.only([
      "old_password",
      "password",
      "password_confirmation"
    ]);
    const user = await auth.user;
    await Persona.updatePassword(user, payload);
  }

  // send forgot password email with token link
  async forgotPassword({ request }) {
    await Persona.forgotPassword(request.input("uid"));
  }

  // update user password by token
  async updatePasswordByToken({ request }) {
    const token = decodeURIComponent(request.input("token"));
    console.log("Token: ", token);
    const payload = request.only(["password", "password_confirmation"]);
    console.log("Payload", payload);
    const user = await Persona.updatePasswordByToken(token, payload);
  }
}

module.exports = UserController;
