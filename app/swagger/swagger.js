module.exports = app => {
    const swaggerUi = require('swagger-ui-express'),
          swaggerDocument = require('./swagger.json');

    app.use(app.get('docsUri'), swaggerUi.serve, swaggerUi.setup(swaggerDocument));
 
}