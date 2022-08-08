const swaggerDefinition = {
    info: {
        title: "HIT-BOOK",
        description: " DOC API REST HIT-BOOK"
    },
    // servers: ["http://localhost:5000"]
}

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routes/user.router.js',
        './routes/auth.router.js',
        './routes/book.router.js',
        './routes/commentBook.router.js',
        './routes/commentPost.router.js',
        './routes/post.router.js',
        './routes/statusBookUser.router.js',
        './routes/transaction.router.js',
    ],

};

/**
 * @param {express} app 
 */
const setup = app => app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

module.exports = setup;