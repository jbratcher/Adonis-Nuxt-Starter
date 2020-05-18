"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.increments();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("full_name").notNullable();
      table.string("password", 60).notNullable();
      table.string("profile_image_source").nullable();
      table.string("account_status");
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
