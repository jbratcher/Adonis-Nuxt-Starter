const querystring = require("querystring");
const Env = use("Env");
const Event = use("Event");
const Mail = use("Mail");
/**
 * Uses localhost:3000 for local dev
 * You can set environment variables in your remote server (ex. Heroku)
 * https://devcenter.heroku.com/articles/config-vars#using-the-heroku-dashboard
 */
const host = Env.get("CLIENT_APP_URL");

/**
 * Triggered by Persona.register()
 *
 * Sends email to user's registered email with verification link that contains URL encoded token.
 *
 */
Event.on("user::created", async (payload) => {
  const user = payload.user.toJSON();
  const token = querystring.encode({
    token: payload.token,
  });

  await Mail.send("new.user", { host, token, user }, (message) => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Thanks for registering!");
  });
});

/**
 * Triggered by Persona.updatePassword()
 *
 * Sends email to user's registered email to notify of password change.
 *
 */
// on password update request, send email notification to user
Event.on("password::changed", async (payload) => {
  const user = payload.user.toJSON();

  await Mail.send("update.password", { user }, (message) => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Password Change Notifcation");
  });
});

/**
 * Triggered by Persona.forgotPassword().
 *
 * Sends email to user registered email with verification link that contains URL encoded token that verifies user and links to password reset form.
 *
 */
Event.on("forgot::password", async (payload) => {
  const user = payload.user.toJSON();
  const token = querystring.encode({
    token: payload.token,
  });

  await Mail.send("forgot.password", { host, token, user }, (message) => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Password Reset Request");
  });
});

/**
 * Triggered by Persona.updateProfile() when email field is changed.
 *
 * Sends email to new email with verification link that contains URL encoded token to confirm email change.
 *
 */
Event.on("email::changed", async (payload) => {
  const user = payload.user.toJSON();
  const token = querystring.encode({
    token: payload.token,
  });

  await Mail.send("update.email", { host, token, user }, (message) => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Email Change Confirmation");
  });
});
