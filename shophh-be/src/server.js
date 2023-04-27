require("dotenv").config();
const path = require("path");
const express = require("express");
const { initWebRoutes } = require("./routes/web.js");
const { initApiRoutes } = require("./routes/api.js");
const { configViewEngine } = require("./config/viewEngine");
const bodyParser = require("body-parser");
const configCors = require("./config/cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3010;
app.use(express.static(__dirname + "/public"));

//config cookie-parser
app.use(cookieParser());

//config view engine
configViewEngine(app);
//config cors
configCors(app);
//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initWebRoutes(app);
initApiRoutes(app);
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
const session = require("express-session");
var redis = require("redis");
var redisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  legacyMode: true, //********New Addition - set legacy mode to true.*******
});
redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});
redisClient.connect();
app.use(
  session({
    secret: "keyboard cat",
    saveUninitialized: true,
    resave: false,
    store: new redisStore({ client: redisClient }),
    cookie: { maxAge: 6000000 },
  })
);
app.get("/demo", function (req, res, next) {
  try {
    if (req.session.views) {
      req.session.views++;
      res.setHeader("Content-Type", "text/html");
      res.write("<p>views: " + req.session.views + "</p>");
      res.write("<p>expires in: " + req.session.cookie.maxAge / 1000 + "s</p>");
      res.end();
    } else {
      req.session.views = 1;
      res.end("welcome to the session demo. refresh!");
    }
  } catch (error) {
    console.log(error);
  }
});
