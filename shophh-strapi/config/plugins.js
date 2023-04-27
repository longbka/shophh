module.exports = ({ env }) => ({
  // ...
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: 600000,
      },
    },
  },
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  // ...
  // email: {
  //   config: {
  //     provider: "nodemailer",
  //     providerOptions: {
  //       host: "smtp.gmail.com",
  //       port: 465,
  //       auth: {
  //         user: "noreplyAirsense@gmail.com",
  //         pass: "keadbexdzuviawry",
  //       },
  //     },
  //   },
  //   settings: {
  //     defaultFrom: "email@gmail.com",
  //     defaultReplyTo: "email@gmail.com",
  //   },
  // },
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "shophoanghoai@gmail.com",
        defaultReplyTo: "shophoanghoai@gmail.com",
      },
    },
  },
  "strapi-plugin-populate-deep": {
    config: {
      defaultDepth: 3, // Default is 5
    },
  },
  plugins: {
    name: "markdown-it-attrs",
    // Thêm option tùy chọn nếu cần thiết
  },
  "random-sort": {
    enabled: true,
  },
});
