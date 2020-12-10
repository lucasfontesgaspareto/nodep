const parseCookie = require("../shared/parseCookie");

module.exports = (next) => (req, res) => {
  const cookies = parseCookie(req);

  if (cookies.token) {
    next(req, res);
  } else {
    res.writeHead(301, { Location: "/login" });
    return res.end();
  }
};
