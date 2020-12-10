const { fstat } = require("fs");
const http = require("http");
const routes = require("./middleware/routes");
const public = require("./middleware/public");

const server = http.createServer((req, res) => {
  public(req, res, () => {
    routes(req, res);
  });
});

server.listen(8080);
