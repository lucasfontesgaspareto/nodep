const fs = require("fs");
const path = require("path");
const BufferReplace = require("../shared/bufferReplace");
const Model = require("../model/Home");

module.exports = {
  get: (req, res) => {
    return fs.readFile(
      path.join(__dirname, "../view/login.html"),
      (error, buffer) => {
        buffer = BufferReplace(buffer, "#error", ``);
        buffer = BufferReplace(buffer, "#title", Model.title);
        buffer = BufferReplace(
          buffer,
          "#footer",
          fs
            .readFileSync(path.join(__dirname, "../view/footer.html"))
            .toString("utf8")
        );
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(buffer);
        return res.end();
      }
    );
  },
  post: (req, res) => {
    const { headers, method, url } = req;

    let body = [];

    req
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Buffer.concat(body).toString();

        const fields = body.split("&");
        const username = fields[0].split("=")[1];
        const password = fields[1].split("=")[1];

        if (Model.username === username && Model.password === password) {
          res.writeHead(301, { Location: "/" });
          return res.end();
        }

        return fs.readFile(
          path.join(__dirname, "../view/login.html"),
          (error, buffer) => {
            buffer = BufferReplace(
              buffer,
              "#error",
              `<script>alert('credenciais invalidas');</script>`
            );
            buffer = BufferReplace(buffer, "#title", Model.title);
            buffer = BufferReplace(
              buffer,
              "#footer",
              fs
                .readFileSync(path.join(__dirname, "../view/footer.html"))
                .toString("utf8")
            );
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(buffer);
            return res.end();
          }
        );
      });
  },
};
