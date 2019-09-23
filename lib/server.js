const _ = require('lodash');
const expressWs = require('express-ws');
const { ServerPipe } = require('./pipe');
const defaults = require('./defaults');
/**
 * класс отправки сообщения на перезагрузку страницы
 * 1. Инициализация - настройка порта и подключение к express дополнительных
 * узлов прослушки websocket
 * Server.init({app:app,port:3000});
 *
 * 2. Отправка броузеру сообщния на перезагрузку
 * Server.reload();
 *
 */
class Server {
    constructor() {
        this.params = {
            port: defaults.port,
            app: undefined,
            pipe:defaults.pipe
        };

        this.list = [];
        this.pipe = new ServerPipe();
    }

    /**
     * добавляет в express узел прослушки websocket
     * @param {json} params = {port:int,app:express object}
     *
     */
    init(params) {
        this.params = _.defaultsDeep(params, this.params);
        // eslint-disable-next-line no-underscore-dangle
        this._initWs();
        // eslint-disable-next-line no-underscore-dangle
        this._initPipe();
    }

    // eslint-disable-next-line no-underscore-dangle
    _initWs() {
        expressWs(this.params.app);
        this.params.app.ws('/', (ws) => {
            this.list.push(ws);
        });
    }

    // eslint-disable-next-line no-underscore-dangle
    _initPipe() {
        this.pipe.init({
            port: this.pipe.port,
            addr: this.pipe.addr,
            onRead:()=>{
                this.reload();
            }
        });
    }

    /**
     * отправка данных
     * @param {json} data данные для отправки
     */
    send(data) {
        let i = 0;
        while (i < this.list.length) {
            const ws = this.list[i];
            try {
                ws.send(JSON.stringify(data));
                i++;
            } catch (e) {
                this.list.splice(i, 1);
            }
        }
    }

    reload() {
        this.send({ command: 'reload' });
    }
}
const server = new Server();
module.exports = { server };
