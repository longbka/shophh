module.exports = {
  routes: [
    {
      method: "GET",
      path: "/products-custom/random/:id",
      handler: "product.random",
      config: {
        auth: false,
      },
    },
  ],
};
