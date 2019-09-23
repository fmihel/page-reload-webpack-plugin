# page-reload-webpack-plugin
Перезагрузка страницы браузера, после выполнения сборки webpack. 
 
## Установка

``` npm i page-reload-webpack-plugin -D ```

## Использование
**1. Подключение обработчика плагина к http серверу.**</br>
Предполагается что используется сервер на основе *express*. Его реализация может быть примерно такой:</br></br>
*server.js*
```
const express = require('express');
const app = express();

app.use(express.static('./public/'));

app.get('/', (from, to) => {
       ...
});
app.listen(3000, (err) => {
    if (err) { return console.error(err); }
    console.log(`server start:ok`);
    return undefined;
});

module.exports = app;
```
Подключим обработчик плагина:</br>
```
const express = require('express');
const { PageReloadServer } = require('page-reload-webpack-plugin');

const app = express();
PageReloadServer.init({ app });

app.use(express.static('./public/'));

app.get('/', (from, to) => {
       ...
});
app.listen(3000, (err) => {
    if (err) { return console.error(err); }
    console.log(`server start:ok`);
    return undefined;
});

```
**2. Запустим http сервевр**
``` 
node server.js
```

**4. Открыть страницу браузер**
```
http://localhost:3000/
```

**3. Конфигурация webpack**</br>
В файле *webpack.config.js*:
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
**4. Всё**</br>
Теперь после каждой успешной сборки страница *http://localhost:3000/* будет перезагружена автоматически, 
без создания дополнительных вкладок.
``` 
npm run webpack
```
