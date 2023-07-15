# allow-cors

Allow cross-origin access on your server responses


## Install

    npm install allow-cors


## Usage

```js
const allow = require("allow-cors");

http.createServer((request, response) => {
    allow(response);
    response.end();
});
```
Or
```js
import allow from "allow-cors/esm";

http.createServer((request, response) => {
    allow(response);
    response.end();
});
```


## License

[MIT](license)
