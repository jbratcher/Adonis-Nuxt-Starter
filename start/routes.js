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

// Resources
Route.group(() => {
  Route.get("/", "ResourceController.index");
  Route.get("/:id", "ResourceController.show");
  Route.post("/", "ResourceController.store");
  Route.patch(":id", "ResourceController.update");
  Route.delete("/:id", "ResourceController.destroy");
}).prefix("resources");
