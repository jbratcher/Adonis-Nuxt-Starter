"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ResourceSchema extends Schema {
  up() {
    this.create("resources", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .nullable();
      table.string("name");
      table.integer("quantity");
      table.timestamps();
    });
  }

  down() {
    this.drop("resources");
  }
}

module.exports = ResourceSchema;
