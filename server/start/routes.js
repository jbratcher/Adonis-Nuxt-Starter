"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Default base route
Route.get("/", "HomeController.index");

// Auth
Route.group(() => {
  Route.get("/users", "UserController.index");
  Route.get("/user", "UserController.getCurrentUser");
  Route.get("/verify-email", "UserController.verifyEmail");
  Route.post("/login", "UserController.login");
  Route.post("/logout", "UserController.logout");
  Route.post("/register", "UserController.register");
  Route.post("/update/profile-pic", "UserController.updateProfilePic");
  Route.patch("/update", "UserController.update");
  Route.patch("/update/email", "UserController.updateEmail");
  Route.patch("/update/password", "UserController.updatePassword");
  Route.get("/forgot/password", "UserController.forgotPassword");
  Route.post(
    "/update/password-by-token",
    "UserController.updatePasswordByToken"
  );
}).prefix("auth");

// User Profile
Route.get("/users/resources", "ResourceController.getUserResources");
Route.get("/users/:id", "UserController.show");

// Resources Example
Route.group(() => {
  Route.get("/", "ResourceController.index");
  Route.get("/:id", "ResourceController.show");
  Route.post("/", "ResourceController.store");
  Route.patch(":id", "ResourceController.update");
  Route.delete("/:id", "ResourceController.destroy");
}).prefix("resources");
