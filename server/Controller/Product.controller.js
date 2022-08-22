const { validateBody } = require('../common/product-validation');
const Product = require('../Model/Product.model');
const Categories = require('../Model/Category.model');


exports.create = async (req, res) => {
    const { path: image } = req.file;
    try {
        // Validate Request 
        await validateBody(req.body);
        //create a product
        const product = new Product({
            productName: req.body.productName,
            categoryId: req.body.categoryId,
            price: req.body.price,
            image: "../../../assets/images/" + image.split('\\')[5]
        });
        //save product in the database
        product.save()
            .then(data => {
                Categories.findById(req.body.categoryId).then(category => {
                    category.products.push(data._id);
                    category.save();
                    res.send(data);
                }).catch(err => {
                    res.status(400).send({
                        message: "Category not found"
                    });
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the product."
                });
            });
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the product."
        });
    }
};

exports.findAll = (req, res) => {
    Product.find().populate('categoryId', 'categoryName').then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    });
};

exports.findOne = (req, res) => {
    Product.findById(req.params.productId).populate('categoryId')
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error retrieving product with id " + req.params.productId
            });
        });
};

exports.update = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.productId, req.body, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Error updating product with id " + req.params.productId
            });
        });
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            res.send({ message: "product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
}

exports.findByCategory = (req, res) => {
    Product.find({ categoryId: req.query.categoryName }).populate('categoryId', 'categoryName')
        .then(products => {
            if (!products) {
                return res.status(404).send({
                    message: "products not found with category id " + req.query.categoryName
                });
            }
            res.send(products);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "products not found with category id " + req.query.categoryName
                });
            }
            return res.status(500).send({
                message: "Error retrieving products with category id " + req.query.categoryName
            });
        });
}