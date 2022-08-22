const { validateBody } = require('../common/category-validation');
const Category = require('../Model/Category.model');

exports.create = async(req, res) => {
    try {

        // Validate Request 
        await validateBody(req.body);
        //create a category
        const category = new Category({
            categoryName: req.body.categoryName,
            categoryImage: req.body.categoryImage
        });
        //save category in the database
        category.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the category."
                });
            });
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the category."
        });
    }
};

exports.findAll = (req, res) => {
    Category.find().populate('products')
        .then(categories => {
            res.send(categories);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving categories."
            });
        });
};

exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Error retrieving category with id " + req.params.categoryId
            });
        });
};

exports.update = (req, res) => {


    Category.findByIdAndUpdate(
            req.params.categoryId, {
                categoryName: req.body.categoryName,
                categoryImage: req.body.categoryImage
            }, { new: true })
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            res.send(category);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Error updating category with id " + req.params.categoryId
            });
        });
};

exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
        .then(category => {
            if (!category) {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            res.send({ message: "category deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "category not found with id " + req.params.categoryId
                });
            }
            return res.status(500).send({
                message: "Could not delete category with id " + req.params.categoryId
            });
        });
}