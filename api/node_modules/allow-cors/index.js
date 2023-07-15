module.exports = (response, origin = "*") => response.setHeader("Access-Control-Allow-Origin", origin);
