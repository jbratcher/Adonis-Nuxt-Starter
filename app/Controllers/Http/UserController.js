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

  async show({ auth, params }) {
    const { id } = params;
    const user = await auth.getUser();
    if (user.id !== Number(id)) {
      return "You cannot see someone else's profile";
    }
    return user;
  }

  async verifyEmail({ request, params, session, response }) {
    console.log("verifying email");
    const token = request.input("token");
    const user = await Persona.verifyEmail(token);
    session.flash({ message: "Email verified" });
  }

  async update({ request, auth }) {
    const user = await auth.user;
    const payload = request.only(["first_name", "last_name"]);
    payload.full_name = `${payload.first_name} ${payload.last_name}`;
    await Persona.updateProfile(user, payload);
    const updatedUser = await auth.user;
    return updatedUser;
  }

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
}

module.exports = UserController;
