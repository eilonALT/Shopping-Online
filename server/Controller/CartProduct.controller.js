const { validateBody } = require('../common/cartProduct-validation');
const CartProduct = require('../Model/cartProduct.model');
const Cart = require('../Model/cart.model');
const Product = require('../Model/Product.model');


const DEFAULT_AMOUNT = 1;

exports.create = async (req, res) => {
    try {
        // Validate Request 
        await validateBody(req.body);

        //get product by id
        const product = await Product.findById(req.body.productId);

        //create a cartProduct
        const cartProduct = new CartProduct({
            productId: req.body.productId,
            amount: DEFAULT_AMOUNT,
            totalPrice: product.price,
            cartId: req.body.cartId
        });
        //save cartProduct in the database
        cartProduct.save()
            .then(data => {
                //update cart products in the cart
                Cart.findByIdAndUpdate(req.body.cartId).then(cart => {
                    cart.cartProducts.push(data._id);
                    cart.totalPrice += product.price;
                    cart.save();
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the cart products."
                    });
                });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the cartProduct."
                });
            });
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the cartProduct."
        });
    }
};

exports.findAll = (req, res) => {
    CartProduct.find().then(cartProductsProducts => {
        res.send(cartProductsProducts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving cartProductsProducts."
        });
    });
};

exports.findOne = (req, res) => {
    CartProduct.findById(req.params.cartProductId)
        .then(cartProduct => {
            if (!cartProduct) {
                return res.status(404).send({
                    message: "cartProduct not found with id " + req.params.cartProductId
                });
            }
            res.send(cartProduct);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cartProduct not found with id " + req.params.cartProductId
                });
            }
            return res.status(500).send({
                message: "Error retrieving cartProduct with id " + req.params.cartProductId
            });
        });
};

exports.update = (req, res) => {
    CartProduct.findByIdAndUpdate(
        req.params.cartProductId, req.body, { new: true })
        .then(cartProduct => {
            if (!cartProduct) {
                return res.status(404).send({
                    message: "cartProduct not found with id " + req.params.cartProductId
                });
            }
            res.send(cartProduct);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cartProduct not found with id " + req.params.cartProductId
                });
            }
            return res.status(500).send({
                message: "Error updating cartProduct with id " + req.params.cartProductId
            });
        });
};

exports.delete = (req, res) => {
    CartProduct.findByIdAndRemove(req.params.cartProductId)
        .then(cartProduct => {
            if (!cartProduct) {
                return res.status(404).send({
                    message: "cartProduct not found with id " + req.params.cartProductId
                });
            }
            // find cart by id and remove cartProduct from cartProducts
            Cart.findById(cartProduct.cartId).then(cart => {
                ;
                cart.cartProducts.remove(cartProduct._id);
                cart.totalPrice -= cartProduct.totalPrice*cartProduct.amount;
                cart.save();
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while removing cartProduct."
                });
            });
            res.send({ message: "cartProduct deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "cartProduct not found with id " + req.params.cartProductId
                });
            }
            return res.status(500).send({
                message: "Could not delete cartProduct with id " + req.params.cartProductId
            });
        });
}