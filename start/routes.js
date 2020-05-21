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

Route.get("/", "HomeController.index");

// Auth
Route.get("/auth/user", "UserController.getCurrentUser");
Route.get("/auth/verify-email/", "UserController.verifyEmail");
Route.post("/auth/login", "UserController.login");
Route.post("auth/logout", "UserController.logout");
Route.post("/auth/register", "UserController.register");

// User Profile
Route.get("/users/:id", "UserController.show");

// Resources Example
Route.group(() => {
  Route.get("/", "ResourceController.index");
  Route.get("/:id", "ResourceController.show");
  Route.post("/", "ResourceController.store");
  Route.patch(":id", "ResourceController.update");
  Route.delete("/:id", "ResourceController.destroy");
}).prefix("resources");
