const express    = require('express');
const path       = require('path');
const bodyParser = require("body-parser");
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const search     = require('./db/search');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const app = express();
const config = require('../webpack.config.js');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

const pathDist     = path.join(process.cwd(), 'dist');
app.use(express.static(pathDist));

app.post('/data', urlencodedParser, (req, res) => {
    const found = JSON.stringify(search(JSON.parse(req.body.data)));
    // console.log(found);
    // console.log(req);
    // console.log(res);
    res.send(found);
});

const port = 3030;

app.listen(port, () => console.log(`Server started on port: ${port}`));
