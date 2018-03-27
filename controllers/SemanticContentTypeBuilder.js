'use strict';

const fs = require('fs');
const path = require('path');
const _ = require('lodash');


/**
 * SemanticContentTypeBuilder.js controller
 *
 * @description: A set of functions called "actions" of the `semantic-content-type-builder` plugin.
 */
module.exports = {

  /**
   * Get all models registered in Strapi
   * @param ctx
   * @returns {Promise<void>}
   */
  getModels: async ctx => {
    const Service = strapi.plugins['semantic-content-type-builder'].services['semanticcontenttypebuilder'];
    ctx.send({ models: Service.getModels() });
  },

  /**
   * Get model
   * @param ctx
   * @returns {Promise<*>}
   */
  getModel: async ctx => {
    const Service = strapi.plugins['semantic-content-type-builder'].services['semanticcontenttypebuilder'];
    const { source } = ctx.request.query;

    let { model } = ctx.params;

    model = _.toLower(model);

    if (!source && !_.get(strapi.models, model)) return ctx.badRequest(null, [{ messages: [{ id: 'request.error.model.unknow' }] }]);

    if (source && !_.get(strapi.plugins, [source, 'models', model])) {
      return ctx.badRequest(null, [{ messages: [{ id: 'request.error.model.unknow' }] }]);
    }

    ctx.send({ model: Service.getModel(model, source) });
  },

  /**
   * Get available types from Schema.org
   * @param ctx
   * @returns {Promise<void>}
   */
  getTypes: async ctx => {
    const Service = strapi.plugins['semantic-content-type-builder'].services['semanticcontenttypebuilder'];

    ctx.send({types: Service.getTypes()});
  },

  /**
   * Get properties of given type
   * @param ctx
   * @returns {Promise<void>}
   */
  getProperties: async ctx => {
    const Service = strapi.plugins['semantic-content-type-builder'].services['semanticcontenttypebuilder'];

    let { type } = ctx.params;

    const properties = await Service.getProperties(type);

    ctx.send({properties: properties});
  }


};
