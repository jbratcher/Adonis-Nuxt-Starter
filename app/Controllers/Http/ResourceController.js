"use strict";

const Resource = use("App/Models/Resource");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with resources
 */
class ResourceController {
  /**
   * Show a list of all resources.
   * GET resources
   *
   * @param {object} ctx
   */
  async index() {
    const resources = await Resource.all();
    return resources;
  }

  /**
   * Render a form to be used for creating a new resource.
   * GET resources/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new resource.
   * POST resources
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async store({ request }) {
    const { name, quantity } = request.all();
    const resource = new Resource();
    resource.fill({
      name,
      quantity
    });
    await resource.save();
    return resource;
  }

  /**
   * Display a single resource.
   * GET resources/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async show({ params }) {
    const { id } = params;
    const resources = await Resource.find(id);
    return resources;
  }

  /**
   * Render a form to update an existing resource.
   * GET resources/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update resource details.
   * PUT or PATCH resources/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   * @param {Request} ctx.request
   */
  async update({ params, request }) {
    const { id } = params;
    const resource = await Resource.find(id);
    resource.merge(request.all());
    await resource.save();
    return resource;
  }

  /**
   * Delete a resource with id.
   * DELETE resources/:id
   *
   * @param {object} ctx
   * @param {Params} ctx.params
   */
  async destroy({ params }) {
    const { id } = params;
    const resource = await Resource.find(id);
    await resource.delete();
    return resource;
  }
}

module.exports = ResourceController;
