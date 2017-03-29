var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.dev.js');
var path = require('path');
/*
* 1 当以命令行启动webpack-dev-server时,需要做两点：

 在命令行中添加--inline命令
 在webpack.config.js中添加devServer:{inline:true}
 2 当以Node.js API启动webpack-dev-server时,我们也需要做两点:

 由于webpack-dev-server的配置中无inline选项,我们需要添加webpack-dev-server/client?http://«path»:«port»/到webpack配置的entry入口点中.
 将<script src="http://localhost:8080/webpack-dev-server.js"></script>添加到html文件中
* */
Object.keys(config.entry).forEach(function (name) {
    config.entry[name] = ["webpack-dev-server/client?http://localhost:8080/",
        "webpack/hot/dev-server"].concat(config.entry[name])
});

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
});

server.listen(8080, 'localhost', function () {
});
