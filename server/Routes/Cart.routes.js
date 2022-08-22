module.exports = (app) => {
    const carts = require('../Controller/cart.controller');

    // Create a new cart
    app.post('/carts', carts.create);

    // Retrieve all carts
    app.get('/carts', carts.findAll);

    // Retrieve a single cart with cartId
    app.get('/carts/:cartId', carts.findOne);

    // Update a cart with cartId
    app.put('/carts/:cartId', carts.update);

    // Delete a cart with cartId
    app.delete('/carts/:cartId', carts.delete);
}