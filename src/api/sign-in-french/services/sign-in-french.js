'use strict';

/**
 * sign-in-french service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sign-in-french.sign-in-french');
