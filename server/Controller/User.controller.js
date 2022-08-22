const { validateBody } = require('../common/user-validation');
const User = require('../Model/User.model');
const Cart = require('../Model/cart.model');
const bcrypt = require('bcrypt');

const OBJECT_ID_DEAFAULT = "11bacd11111a111a111df111";
const DEFAULT_TOTAL_PRICE = 0;

exports.create = async (req, res) => {
    try {
        // Validate Request 
        await validateBody(req.body);
        //create a user

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            idNumber: req.body.idNumber,
            password: hash,
            city: req.body.city,
            street: req.body.street,
            role: req.body.role || 'user',
            cartId: OBJECT_ID_DEAFAULT
        });
        //save user in the database
        user.save()
            .then(data => {
                // create a cart
                const cart = new Cart({
                    userId: data._id,
                    cartProducts: [],
                    totalPrice: DEFAULT_TOTAL_PRICE
                });
                //save cart in the database
                cart.save()
                    .then(cart => {
                        //update user cartId
                        User.findByIdAndUpdate(data._id, {
                            cartId: cart._id
                        }, {
                            new: true
                        }).then(user => {
                            res.send(user);
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while updating the user cart id."
                            });
                        });
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the cart."
                        });
                    }
                    );
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
                });
            });
    } catch (error) {
        return res.status(400).send({
            message: error.message || "Some error occurred while creating the User."
        });
    }
};

exports.findAll = (req, res) => {
    User.find().populate('cartId').then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
};

exports.update = (req, res) => {

    User.findByIdAndUpdate(
        req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        idNumber: req.body.idNumber,
        password: req.body.password,
        city: req.body.city,
        street: req.body.street
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
}

exports.findByUserName = (req, res) => {
    User.findOne({ username: req.query.userName })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with username " + req.query.userName
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with username " + req.query.userName
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with username " + req.query.userName
            });
        });
}

exports.findByIdNumber = (req, res) => {
    User.findOne({ idNumber: req.query.idNumber })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with idNumber " + req.query.idNumber
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with idNumber " + req.query.idNumber
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with idNumber " + req.query.idNumber
            });
        });
}

exports.findByUserNameAndPassword = (req, res) => {
    User.findOne({ username: req.query.userName })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with username or password " + req.query.userName
                });
            }
            user.password = bcrypt.compareSync(req.query.password, user.password);
            if (user.password) {
                res.send(user);
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with username " + req.query.userName
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with username " + req.query.userName
            });
        });
}