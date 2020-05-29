"use strict";

class HomeController {
  async index() {
    const welcome = "Hello Adonis";
    return welcome;
  }
}

module.exports = HomeController;
