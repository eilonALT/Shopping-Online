module.exports = (app) => {
    const cartsProducts = require('../Controller/cartProduct.controller');

    // Create a new cartProduct
    app.post('/cartsProducts', cartsProducts.create);

    // Retrieve all cartsProducts
    app.get('/cartsProducts', cartsProducts.findAll);

    // Retrieve a single cartProduct with cartProductId
    app.get('/cartsProducts/:cartProductId', cartsProducts.findOne);

    // Update a cartProduct with cartProductId
    app.put('/cartsProducts/:cartProductId', cartsProducts.update);

    // Delete a cartProduct with cartProductId
    app.delete('/cartsProducts/:cartProductId', cartsProducts.delete);
}