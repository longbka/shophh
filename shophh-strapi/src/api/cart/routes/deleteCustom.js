module.exports = {
  routes: [
    // {
    //   method: "GET",
    //   path: "/getCustom",
    //   handler: "cart.getCustom",
    // },
    {
      method: "DELETE",
      path: "/carts-custom/delete-all",
      handler: "cart.deleteAll",
    },
    {
      method: "DELETE",
      path: "/carts-custom/delete-by-ids",
      handler: "cart.deleteByIds",
    },
  ],
};
