const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { ClientPipe } = require('./lib/pipe');
const { server } = require('./lib/server');
const defaults = require('./lib/defaults');

class PageReloadPlugin {
    constructor(options = {}) {
        this.options = _.defaultsDeep(options,{
            pipe:defaults.pipe,
            port:defaults.port,
            indexHtml:defaults.indexHtml,
            enable:true
        });

        this.script = `(function(){let ws = new WebSocket('ws://localhost:${this.options.port}');ws.onopen = () => {console.log('page-reload connect: ok');};ws.onmessage = (ev) => {document.location.reload(true);};}());`;
    }
    mainIsWebackDevServer(){
        const wp = 'webpack-dev-server.js';
        try{

            if (process.mainModule.filename.indexOf(wp)>=0)
                return true;
            return (process.argv.findIndex(v=>v.indexOf(wp)>=0)!==-1);

        }catch(e){
            return false;
        }
        
    }
    
    apply(compiler) {
        compiler.hooks.done.tap('page-reload-webpack-plugin', (
            stats /* stats is passed as argument when done hook is tapped.  */
        ) => {
            
            if ((this.options.enable)&&(!this.mainIsWebackDevServer())&&(!stats.hasErrors())){
                const opt = stats.compilation.options;
                if (this.options.indexHtml){                
                    
                    const fileName = path.join(opt.output.path,this.options.indexHtml);
                    try{
                        fs.accessSync(fileName, fs.constants.R_OK | fs.constants.W_OK);
                        let content = fs.readFileSync(fileName,'utf8');
                        content = content.replace('</html>',`<script type="text/javascript">${this.script}</script>\n</html>`);
                        fs.writeFileSync(fileName,content);
                    }catch(e){
                        console.info('--------------------------------------------------------------------')
                        console.warn(`page-reload-webpack-plugin: file ${fileName} not exists`);
                        console.info('--------------------------------------------------------------------')
                    }
                }

                const pipe = new ClientPipe(this.options.pipe);
                pipe.send('reload');
            }
            
        });
    } 
}
const PageReloadServer = server;
module.exports = {PageReloadPlugin,PageReloadServer};
