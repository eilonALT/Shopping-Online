const { validateBody } = require('../common/order-validation');
const Order = require('../Model/Order.model');


exports.create = async(req, res) => {
    try {
        // Validate Request 
        await validateBody(req.body);
        //create a order
        const order = new Order({
            userId: req.body.userId,
            cartId: req.body.cartId,
            totalPrice: req.body.totalPrice,
            city: req.body.city,
            street: req.body.street,
            shippingDate: req.body.shippingDate,
            orderCreated: new Date(),
            creditCard: req.body.creditCard
        });
        //save order in the database
        order.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the order."
                });
            });
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the order."
        });
    }
};

exports.findAll = (req, res) => {
    Order.find().populate('userId').populate('cartId').then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.orderId
            });
        });
};

//find order by userId
exports.findAllByUserId = (req, res) => {
    Order.find({ userId: req.params.userId }).populate('userId').populate('cartId').then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
}


exports.update = (req, res) => {


    Order.findByIdAndUpdate(
            req.params.orderId, {
                orderName: req.body.orderName
            }, {}, { new: true })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            res.send(order);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Error updating order with id " + req.params.orderId
            });
        });
};

exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            res.send({ message: "order deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "order not found with id " + req.params.orderId
                });
            }
            return res.status(500).send({
                message: "Could not delete order with id " + req.params.orderId
            });
        });
}