"use strict";

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
    const payload = request.only([
      "first_name",
      "last_name",
      "profile_image_source"
    ]);
    payload.full_name = `${payload.first_name} ${payload.last_name}`;
    const user = await auth.user;
    await Persona.updateProfile(user, payload);
    const updatedUser = await auth.user;
    return updatedUser;
  }
}

module.exports = UserController;
