'use strict';

const request = require('superagent');
const jsonld = require('jsonld');
const _ = require('lodash');
const SchemaOrg = require('schema.org');

module.exports = {

  getModels: () => {
    const models = [];

    _.forEach(strapi.models, (model, name) => {
      if (name === 'core_store') {
        return true;
      }

      models.push({
        icon: 'fa-cube',
        name: _.get(model, 'info.name', 'model.name.missing'),
        description: _.get(model, 'info.description', 'model.description.missing'),
        fields: _.keys(model.attributes).length
      });
    });

    const pluginModels = Object.keys(strapi.plugins).reduce((acc, current) => {
      _.forEach(strapi.plugins[current].models, (model, name) => {
        acc.push({
          icon: 'fa-cube',
          name: _.get(model, 'info.name', 'model.name.missing'),
          description: _.get(model, 'info.description', 'model.description.missing'),
          fields: _.keys(model.attributes).length,
          source: current,
        });
      });

      return acc;
    }, []);

    return models.concat(pluginModels);
  },

  getModel: (name, source) => {
    name = _.toLower(name);

    const model = source ? _.get(strapi.plugins, [source, 'models', name]) : _.get(strapi.models, name);

    const attributes = [];
    _.forEach(model.attributes, (params, name) => {
      const relation = _.find(model.associations, {alias: name});

      if (relation && !_.isArray(_.get(relation, relation.alias))) {
        if (params.plugin === 'upload' && relation.model || relation.collection === 'file') {
          params = {
            type: 'media',
            multiple: params.collection ? true : false
          };
        } else {
          params = _.omit(params, ['collection', 'model', 'via']);
          params.target = relation.model || relation.collection;
          params.key = relation.via;
          params.nature = relation.nature;
          params.targetColumnName = _.get((params.plugin ? strapi.plugins[params.plugin].models : strapi.models)[params.target].attributes[params.key], 'columnName', '');
        }
      }

      attributes.push({
        name,
        params
      });
    });

    return {
      name: _.get(model, 'info.name', 'model.name.missing'),
      description: _.get(model, 'info.description', 'model.description.missing'),
      connection: model.connection,
      collectionName: model.collectionName,
      attributes: attributes
    };
  },

  getTypes: () => {

    let schemaOrg = new SchemaOrg();
    const types = schemaOrg.getSubClasses('Thing', true);

    let typesArray = [];
    types.forEach(v => typesArray.push(v));

    return typesArray;

  },

  getProperties: async (type) => {

    const response = await request.get('https://schema.org/' + type).set('Accept', 'application/ld+json');

    const jsonValue = JSON.parse(response.text);

    const expanded = await jsonld.expand(jsonValue);

    const properties = expanded.filter(property => {
      const type = _.get(property, '@type');
      if (type && type.includes('http://www.w3.org/1999/02/22-rdf-syntax-ns#Property')) {
        return property;
      }

    }).map(property => {

      const ranges = _.get(property, 'http://schema.org/rangeIncludes').map((range) => {
        return _.get(range, '@id');
      });

      const labels = _.get(property, 'http://www.w3.org/2000/01/rdf-schema#label').map((label) => {
        return _.get(label, '@value');
      });


      const p = {
        '@id': _.get(property, '@id'),
        'label': (labels.length === 1 ? labels[0] : labels),
        'rangeIncludes': (ranges.length === 1 ? ranges[0] : ranges)
      };

      return p;
    });

    return properties;

  }


};