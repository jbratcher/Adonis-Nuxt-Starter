const querystring = require("querystring");
const Env = use("Env");
const Event = use("Event");
const Mail = use("Mail");

// on new user registration, send email verification link
Event.on("user::created", async (payload) => {
  const user = payload.user.toJSON();
  const token = querystring.encode({
    token: payload.token,
  });

  await Mail.send("new.user", { user, token }, (message) => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Thanks for registering!");
  });
});

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

// on forgot password, send email reset link
Event.on("forgot::password", async (payload) => {
  const user = payload.user.toJSON();
  const token = querystring.encode({
    token: payload.token,
  });

  await Mail.send("forgot.password", { user, token }, (message) => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Password Reset Request");
  });
});

// on email change, send confirmation email to new address
Event.on("email::changed", async (payload) => {
  const user = payload.user.toJSON();
  const token = querystring.encode({
    token: payload.token,
  });

  await Mail.send("update.email", { user, token }, (message) => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Email Change Confirmation");
  });
});
