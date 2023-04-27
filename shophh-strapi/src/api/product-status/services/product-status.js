'use strict';

/**
 * product-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-status.product-status');
