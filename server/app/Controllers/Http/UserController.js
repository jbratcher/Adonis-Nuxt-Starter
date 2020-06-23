"use strict";
const Env = use("Env");
const Helpers = use("Helpers");
const Persona = use("Persona");
const User = use("App/Models/User");

/**
 * AdonisJs provides a HTTP Context object to each route handler.
 * This object contains everything you need to handle the request, like the request or response class, and can be easily extended via Providers or Middleware.
 * (ex. ctx, ctx.request, ctx.auth, etc)
 * https://adonisjs.com/docs/4.1/request-lifecycle
 *
 */

/**
 * Handles all methods related to users
 */
class UserController {
  /**
   * Show a list of all users.
   *
   * GET auth/users
   *
   * @method index
   *
   * @return {Object} users
   */
  async index() {
    const users = await User.all();
    return users;
  }

  /**
   * Passing the uid from the client-side form, Adonis Persona finds the user using the uid and then fires a `forgot::password` event with a temporary token used to verify the password reset request
   *
   * GET auth/forgot/password
   *
   * @method forgotPassword
   *
   * @param  {String}       uid
   *
   * @return {void}
   *
   */
  async forgotPassword({ request }) {
    return await Persona.forgotPassword(request.input("uid"));
  }

  /**
   * Using the auth object, a token is generated for the currently authorized user.
   *
   * GET auth/user
   *
   * @method getCurrentUser
   *
   * @param  {Object}       auth
   *
   * @return {Object}       user
   *
   */
  async getCurrentUser({ auth }) {
    const user = await auth.getUser();
    const token = await auth.getAuthHeader();
    return user;
  }

  /**
   * Verify the user using the uid and password passed from the client-side form.
   * Return a token to the client to sync authentication with server.
   *
   * POST auth/login
   *
   * @method login
   *
   * @param  {Object}       request, auth
   *
   * @return {String}       token
   *
   */
  async login({ request, auth }) {
    const payload = request.only(["uid", "password"]);
    const user = await Persona.verify(payload);
    const token = await auth.generate(user);
    return token;
  }

  /**
   * Revoke authentication for user using token.
   *
   * POST auth/logout
   *
   * @method logout
   *
   * @param  {Object}       auth
   *
   * @return {Object}       user
   *
   */
  async logout({ auth }) {
    const user = await auth.getUser();
    const token = await auth.getAuthHeader();
    // revoke token
    await user.tokens().where("token", token).update({ is_revoked: true });
    return user;
  }

  /**
   * Passing inputs from client-side registration form, create full name and profile image then add the user to the user's table.
   * Adonis Persona generates an email verification token and fires a user::created event.
   *
   * POST auth/register
   *
   * @method register
   *
   * @param  {Object}       request, auth
   *
   * @return {String}       token
   *
   */
  async register({ request, auth }) {
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
    const token = await auth.generate(user);
    return token;
  }

  /**
   * Show a user profile matching the id in the query string param.
   *
   * GET /users/:id
   *
   * @method show
   *
   * @param  {Object}       auth, params
   *
   * @return {Object}       user
   *
   */
  async show({ auth, params }) {
    const { id } = params;
    const user = await auth.getUser();
    // verify current user id matches id from query params
    if (user.id !== Number(id)) {
      // if no match, log error. No return of user data.
      return "You cannot view another user's profile";
    }
    return user;
  }

  /**
   * Passing inputs from client-side profile edit form, update the user's profile information.
   * Use Adonis Persona to update the user in the user table.
   *
   * PATCH auth/update
   *
   * @method update
   *
   * @param  {Object}       request, auth
   *
   * @return {Object}       updatedUser
   *
   */
  async update({ request, auth }) {
    // TODO: allow partial update with only some fields
    const user = await auth.getUser();
    const payload = request.only(["first_name", "last_name"]);
    // create full name field
    payload.full_name = `${payload.first_name} ${payload.last_name}`;
    await Persona.updateProfile(user, payload);
    const updatedUser = await auth.getUser();
    return updatedUser;
  }

  /**
   * Passing inputs from client-side profile edit form, update the user's email
   * Use Adonis Persona to update the user's email, generate a email verification token, and triggers an email::changed event
   *
   * PATCH auth/update/email
   *
   * @method updateEmail
   *
   * @param  {Object}       request, auth
   *
   * @return {Object}       updatedUser
   *
   */
  async updateEmail({ request, auth }) {
    const payload = request.only(["email"]);
    const user = await auth.user;
    const updatedUser = await Persona.updateProfile(user, payload);
    return updatedUser;
  }

  /**
   * Passing profile pic from client-side upload form, move file to public folder and update user's profile image source field.
   *
   * POST auth/update/profile-pic
   *
   * @method updateProfilePic
   *
   * @param  {Object}       request, auth
   *
   * @return {Object}       user
   *
   */
  async updateProfilePic({ request, auth }) {
    const user = await auth.user;
    // create file from client upload
    const file = await request.file("profileImage");
    // if file is not null or undefined, move the image file to the static/images folder
    if (file) {
      // move the image to the public images folder and name with format `first-last-1.filetype` (ex. jeremy-bratcher-1.jpg) overwriting any images with the same name
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
      user.save();
      return user;
    }
    // if there in no file, log message and return
    return "No file uploaded";
  }

  /**
   * Passing old, new, and confirmation of new password from client-side form, update user's password.
   * Triggers a password::changed event.
   *
   * PATCH auth/update/password
   *
   * @method updatePassword
   *
   * @param  {Object}       request, auth
   *
   * @return {Object}       updatedUser
   *
   */
  async updatePassword({ request, auth }) {
    const payload = request.only([
      "old_password",
      "password",
      "password_confirmation",
    ]);
    const user = await auth.getUser();
    const updatedUser = await Persona.updatePassword(user, payload);
    return updatedUser;
  }

  /**
   * Passing old, new, and confirmation of new password from client-side form, update the user's password.
   * Adonis Persona verifies the token, ensures the password is confirmed and updates the user's password.
   * A password::recovered event is fired.
   *
   * POST auth/update/password-by-token
   *
   * @method updatePasswordByToken
   *
   * @param  {Object}       request
   *
   * @return {Object}       user
   *
   */
  async updatePasswordByToken({ request }) {
    const token = decodeURIComponent(request.input("token"));
    const payload = request.only(["password", "password_confirmation"]);
    const user = await Persona.updatePasswordByToken(token, payload);
    return user;
  }

  /**
   * Using the email token from a new registration email link, activate the user's account.
   * Adonis Persona removes the email token from the tokens table and changes the account status of the user to 'active'.
   *
   * GET auth/verify-email
   *
   * @method verifyEmail
   *
   * @param  {Object}       request
   *
   * @return {Object}       user
   *
   */
  async verifyEmail({ request }) {
    // get token from query string params in URL
    const token = request.input("token");
    const user = await Persona.verifyEmail(token);
    // respond to client with updated user data object
    return user;
  }
}

module.exports = UserController;
