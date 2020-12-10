"use strict";

const parseCookies = (request) => {
  const list = {},
    rc = request.headers.cookie;

  rc &&
    rc.split(";").forEach(function (cookie) {
      const parts = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

  return list;
};

module.exports = parseCookies;
