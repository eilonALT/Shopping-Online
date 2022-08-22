const { validateBody } = require('../common/cart-validation');
const Cart = require('../Model/cart.model');

exports.create = async (req, res) => {
    try {

        // Validate Request 
        await validateBody(req.body);
        //create a cart
        const cart = new Cart({
            userId: req.body.userId,
            totalPrice: 0
        });
        //save cart in the database
        cart.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the cart."
                });
            });
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the cart."
        });
    }

};

exports.findAll = (req, res) => {
    Cart.find().populate('userId').then(carts => {
        res.send(carts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving carts."
        });
    });
};

exports.findOne = (req, res) => {
    Cart.findById(req.params.cartId).populate('userId')
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            res.send(cart);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            return res.status(500).send({
                message: "Error retrieving cart with id " + req.params.cartId
            });
        });
};

exports.update = (req, res) => {
    Cart.findByIdAndUpdate(
        req.params.cartId, req.body, { new: true })
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            res.send(cart);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            return res.status(500).send({
                message: "Error updating cart with id " + req.params.cartId
            });
        });
};

exports.delete = (req, res) => {
    Cart.findByIdAndRemove(req.params.cartId)
        .then(cart => {
            if (!cart) {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            res.send({ message: "cart deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "cart not found with id " + req.params.cartId
                });
            }
            return res.status(500).send({
                message: "Could not delete cart with id " + req.params.cartId
            });
        });
}