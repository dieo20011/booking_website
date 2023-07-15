export default (response, origin = "*") => response.setHeader("Access-Control-Allow-Origin", origin);
