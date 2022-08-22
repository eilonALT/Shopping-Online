module.exports = (app) => {
    const categories = require('../Controller/category.controller');

    // Create a new category
    app.post('/categories', categories.create);

    // Retrieve all categories
    app.get('/categories', categories.findAll);

    // Retrieve a single category with categoryId
    app.get('/categories/:categoryId', categories.findOne);

    // Update a category with categoryId
    app.put('/categories/:categoryId', categories.update);

    // Delete a category with categoryId
    app.delete('/categories/:categoryId', categories.delete);
}