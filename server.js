var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerConfig = require('./app/swagger');
const { setupWebsocket } = require('./app/websocket');

// var mongoose = require('mongoose');
// var io = require('./app/connectionSocket');

const app = express();
const server = require('http').Server(app);
setupWebsocket(server);

app.use((req, res, next) => {
  return next();
});

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(require('./app/router'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));


var port = process.env.PORT || 21170
// var port = process.env.port || 8001
// var port2 = process.env.port || 8002
// io.listen(port2);
server.listen(port);
console.log("Iniciando a app na porta " + port);