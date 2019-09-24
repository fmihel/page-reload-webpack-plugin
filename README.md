# page-reload-webpack-plugin
***The page will reload only after bild, but not after changing the files (as in webpack-dev-server)***
*  [English manual](#English) 
*  [Русское описание](#Russian) 

---
### English
# Reload the browser page after completing the bild of the webpack.

## Install

``` npm i page-reload-webpack-plugin -D ```

## Step by step
**1. Connect the plugin handler to the http server.**</br>
It is supposed to use the server *express*. For example:</br></br>
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
Connect the plugin handler:</br>
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
**2. Run the http server**
``` 
node server.js
```

**3. Webpack config**</br>
*webpack.config.js*:
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
**4. Bild the project**
``` 
npm run webpack
```

**5. Open the browser page**
```
http://localhost:3000/
```

**6. It's all.**</br>
Now after each successful build, the page *http://localhost:3000/* will be reloaded automatically,
without creating additional tabs.

---
### Russian
# Перезагрузка страницы браузера, после выполнения сборки webpack. 
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
**4. Собрать проект**
``` 
npm run webpack
```

**5. Открыть страницу браузер**
```
http://localhost:3000/
```

**6. Всё**</br>
Теперь после каждой успешной сборки страница *http://localhost:3000/* будет перезагружена автоматически, 
без создания дополнительных вкладок.
