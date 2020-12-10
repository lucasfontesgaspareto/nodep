const fs = require("fs");
const path = require("path");
const BufferReplace = require("../shared/bufferReplace");
const Model = require("../model/Home");

module.exports = {
  get: (req, res) => {
    return fs.readFile(
      path.join(__dirname, "../view/index.html"),
      (error, buffer) => {
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
};
