// eslint-disable-next-line max-classes-per-file
const _ = require('lodash');
const net = require('net');
const defaults = require('./defaults');

class CommonPipe {
    constructor() {
        this.params = defaults.pipe;
        this.pipe = undefined;
    }

    init(params) {
        this.params = _.defaultsDeep(params, this.params);
    }
}

class ServerPipe extends CommonPipe {
    constructor() {
        super();
        this.params.onRead = false;
        this.pipe = undefined;
    }

    init(params) {
        super.init(params);

        this.pipe = net.createServer((socket) => {
            socket.on('data', (data) => {
                if (this.params.onRead) { this.params.onRead(data); }
            });

            socket.on('error', (err) => {
                console.error(err);
            });
        });
        this.pipe.listen(this.params.port, this.params.addr);
    }
}

class ClientPipe extends CommonPipe {
    send(data = '') {
        this.pipe = new net.Socket();
        try{
            this.pipe.connect(this.params.port, this.params.addr, () => {
                
                this.pipe.write(data);
                this.pipe.destroy(); // kill client after server's response
            });
            this.pipe.on('error',(e)=>{
                console.info('--------------------------------------------------------------------')
                console.warn('page-reload-webpack-plugin: can`t update page, need start express server');
                console.info('--------------------------------------------------------------------')
            });

        }catch(e){
            
        }
    }
}


module.exports = { ServerPipe, ClientPipe };
