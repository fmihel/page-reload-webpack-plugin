const _ = require('lodash');
const defaults = require('./defaults');

class Client {
    constructor() {
        this.params = { port: defaults.port };
        this.ws = undefined;
    }

    init(params) {
        this.params = _.defaultsDeep(params, this.params);
        this.ws = new WebSocket(`ws://localhost:${this.params.port}`);

        this.ws.onopen = () => {
            console.log('page-reload connect: ok');
            // ws.send('connected');
        };

        this.ws.onmessage = (ev) => {
            console.log(ev);
            document.location.reload(true);
        };
    }
}
const client = new Client();
module.exports = { client };
