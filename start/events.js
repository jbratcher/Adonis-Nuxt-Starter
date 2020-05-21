const querystring = require("querystring");
const Env = use("Env");
const Event = use("Event");
const Mail = use("Mail");

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
