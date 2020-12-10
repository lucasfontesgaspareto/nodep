const controller = require("../controller");
const auth = require("./auth");

const routes = {
  "/": {
    GET: auth(controller.home.get),
  },
  "/login": {
    GET: controller.login.get,
    POST: controller.login.post,
  },
};

module.exports = (req, res) => {
  const { method, url } = req;
  const path = url.split("?")[0];

  try {
    const fn = routes[path][method];
    if (fn instanceof Function) {
      return fn(req, res);
    }
  } catch (error) {
    console.log(error);
  }

  res.writeHead(404);
  return res.end();
};
