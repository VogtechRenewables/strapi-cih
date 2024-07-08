'use strict';

/**
 * program-and-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::program-and-service.program-and-service');
