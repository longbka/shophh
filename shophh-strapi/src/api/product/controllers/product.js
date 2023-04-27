"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => {
  const numberOfEntries = 3;
  return {
    async random(ctx) {
      const { id } = ctx.params;
      function getRandomElementsFromArray(
        array,
        numberOfRandomElementsToExtract = 1
      ) {
        const elements = [];

        function getRandomElement(arr) {
          if (elements.length < numberOfRandomElementsToExtract) {
            const index = Math.floor(Math.random() * arr.length);
            const element = arr.splice(index, 1)[0];

            elements.push(element);

            return getRandomElement(arr);
          } else {
            return elements;
          }
        }

        return getRandomElement([...array]);
      }

      const newsListArray = await strapi.db
        .query("api::product.product")
        .findMany({
          where: {
            category: {
              id: parseInt(id),
            },
          },
          sort: [{ datetime: "asc" }],
          populate: { category: true, thumbnail: true, product_variants: true },
        });

      if (!newsListArray.length) {
        return null;
      }

      ctx.body = getRandomElementsFromArray(newsListArray, 4);
    },
  };
});
