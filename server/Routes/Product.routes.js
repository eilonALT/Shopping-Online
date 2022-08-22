const upload = require('../middlewares/uploads');

module.exports = (app) => {
    const products = require('../Controller/product.controller');

    // Create a new product
    app.post('/products', upload.single('image'), products.create);

    // Retrieve all products
    app.get('/products', (req, res) => {
        if (req.query.categoryName) {
            products.findByCategory(req, res);
        } else {
            products.findAll(req, res);
        }
    })

    // Retrieve a single product with productId
    app.get('/products/:productId', products.findOne);

    // Update a product with productId
    app.put('/products/:productId', products.update);

    // Delete a product with productId
    app.delete('/products/:productId', products.delete);
}