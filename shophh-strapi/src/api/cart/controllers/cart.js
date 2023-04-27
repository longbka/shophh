"use strict";

/**
 * cart controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::cart.cart", ({ strapi }) => ({
  // Method 1: Creating an entirely custom action
  async deleteAll(ctx) {
    try {
      ctx.body = "ok";
      console.log(ctx.request.cookies);
    } catch (err) {
      ctx.body = err;
    }
  },
  async deleteByIds(ctx) {
    try {
      const ids = ctx.query.ids;
      const numIds = [];
      for (let i = 0; i < ids.length; i++) {
        numIds.push(parseInt(ids[i]));
      }
      console.log(numIds)
      // Xóa tất cả các bài đăng có id trong mảng ids
      const deleteCarts = await strapi.db.query("api::cart.cart").deleteMany({
        where: {
          id: {
            $in: numIds,
          },
        },
      });
      // Trả về thông tin các bài đăng đã bị xóa
      console.log("deletePosts", deleteCarts);
      ctx.body = "ok";
      return deleteCarts;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
