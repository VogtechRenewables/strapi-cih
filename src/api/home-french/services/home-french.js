'use strict';

/**
 * home-french service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-french.home-french');
