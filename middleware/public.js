const fs = require("fs");
const path = require("path");

module.exports = (req, res, next) => {
  if (
    req.url != "/" &&
    fs.existsSync(path.join(__dirname, `../public${req.url}`))
  ) {
    const type = req.url.endsWith(".css")
      ? "text/css"
      : req.url.endsWith(".js")
      ? "text/javascript"
      : req.url.endsWith(".png")
      ? "image/png"
      : req.url.endsWith(".jpg")
      ? "image/jpg"
      : "text/*";

    return fs.readFile(
      path.join(__dirname, `../public${req.url}`),
      (error, buffer) => {
        res.writeHead(200, { "Content-Type": type });
        res.write(buffer);
        return res.end();
      }
    );
  }

  next();
};
