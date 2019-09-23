# page-reload-webpack-plugin
Перезагрузка страницы браузера, после выполнения сборки webpack. 
 
## Установка

``` npm i page-reload-webpack-plugin -D ```

## Использование

*webpack.config.js*
```
const { PageReloadPlugin } = require('page-reload-webpack-plugin');
...
module.exports = {
    ...
    plugins: [
        ...
        new PageReloadPlugin(),
        ...
    ],
};
```

*connect to express server:*
```
const express = require('express');
const { PageReloadServer } = require('page-reload-webpack-plugin');

const app = express();
PageReloadServer.init({ app });

...
app.listen(config.port, (err) => {
    ...
});

```