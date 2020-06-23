"use strict";

const Resource = use("App/Models/Resource");

/**
 * AdonisJs provides a HTTP Context object to each route handler.
 * This object contains everything you need to handle the request, like the request or response class, and can be easily extended via Providers or Middleware.
 * (ex. ctx, ctx.request, ctx.auth, etc)
 * https://adonisjs.com/docs/4.1/request-lifecycle
 *
 */

/**
 * Resourceful controller for interacting with resources
 */
class ResourceController {
  /**
   * Show a list of all resources.
   * GET resources
   *
   * @method index
   *
   * @return {Object} resources
   */
  async index() {
    const resources = await Resource.all();
    return resources;
  }

  /**
   * Create/save a new resource.
   * POST resources
   *
   * @method store
   *
   * @param {object} auth, request
   *
   * @return {object} resource
   */
  async store({ auth, request }) {
    const user = await auth.getUser();
    const { name, quantity } = request.all();
    const resource = new Resource();
    resource.fill({
      name,
      quantity,
      user_id: user.id,
    });
    await resource.save();
    return resource;
  }

  /**
   * Display a single resource.
   * GET resources/:id
   *
   * @method show
   *
   * @param {object} params
   *
   * @return {object} resource
   */
  async show({ params }) {
    const { id } = params;
    const resource = await Resource.find(id);
    return resource;
  }

  /**
   * Update resource details.
   * PUT or PATCH resources/:id
   *
   * @method update
   *
   * @param {object} params, request
   *
   * @return {object} resource
   *
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
   * @method destroy
   *
   * @param {object} params
   *
   * @return {object} resource
   *
   */
  async destroy({ params }) {
    const { id } = params;
    const resource = await Resource.find(id);
    await resource.delete();
    return resource;
  }

  /**
   * Get all resources owned by current user.
   * GET users/resources
   *
   * @method getUserResources
   *
   * @param {object} auth
   *
   * @return {object} resources
   *
   */
  async getUserResources({ auth }) {
    const user = await auth.getUser();
    const resources = await Resource.query().where("user_id", user.id).fetch();
    return resources;
  }
}

module.exports = ResourceController;
