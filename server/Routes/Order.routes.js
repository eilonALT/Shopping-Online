module.exports = (app) => {
    const orders = require('../Controller/order.controller');

    // Create a new order
    app.post('/orders', orders.create);

    // Retrieve all orders
    app.get('/orders', orders.findAll);

    //Retrieve all orders with userId
    app.get('/orders/:userId', orders.findAllByUserId);

    // Retrieve a single order with orderId
    app.get('/orders/:orderId', orders.findOne);

    // Update a order with orderId
    app.put('/orders/:orderId', orders.update);

    // Delete a order with orderId
    app.delete('/orders/:orderId', orders.delete);
}