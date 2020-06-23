"use strict";

/**
 * AdonisJs provides a HTTP Context object to each route handler.
 * This object contains everything you need to handle the request, like the request or response class, and can be easily extended via Providers or Middleware.
 * (ex. ctx, ctx.request, ctx.auth, etc)
 * https://adonisjs.com/docs/4.1/request-lifecycle
 *
 */

/**
 * Example Controller for base route
 */
class HomeController {
  async index() {
    const welcome = "Hello Adonis";
    return welcome;
  }
}

module.exports = HomeController;
