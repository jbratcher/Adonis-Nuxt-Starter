const querystring = require("querystring");
const Env = use("Env");
const Event = use("Event");
const Mail = use("Mail");

// on new user registration, send email verification link
Event.on("user::created", async payload => {
  const { user, token } = payload;

  await Mail.send(
    "new.user",
    { user: user.toJSON(), token: encodeURIComponent(token) },
    message => {
      message
        .to(payload.user.email)
        .from(`<${Env.get("MAIL_USERNAME")}>`)
        .subject("Thanks for registering!");
    }
  );
});

// on password update request, send email notification to user
Event.on("password::changed", async payload => {
  const { user } = payload;

  await Mail.send("update.password", { user: user.toJSON() }, message => {
    message
      .to(payload.user.email)
      .from(`<${Env.get("MAIL_USERNAME")}>`)
      .subject("Password Change Notifcation");
  });
});

// on forgot password, send email reset link
Event.on("forgot::password", async payload => {
  const { user, token } = payload;

  await Mail.send(
    "forgot.password",
    { user: user.toJSON(), token: encodeURIComponent(token) },
    message => {
      message
        .to(payload.user.email)
        .from(`<${Env.get("MAIL_USERNAME")}>`)
        .subject("Password Reset Request");
    }
  );
});
