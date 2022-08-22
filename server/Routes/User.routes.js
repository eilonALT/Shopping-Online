module.exports = (app) => {
    const users = require('../Controller/User.controller');

    // Create a new user
    app.post('/users', users.create);

    // Retrieve all users
    app.get('/users', (req, res) => {
        if (req.query.userName && req.query.password) {
            users.findByUserNameAndPassword(req, res);
        }
        else if (req.query.userName) {
            users.findByUserName(req, res);
        }
        else if (req.query.idNumber) {
            users.findByIdNumber(req, res);
        }
        else {
            users.findAll(req, res);
        }
    })

    // Retrieve a single user with userId
    app.get('/users/:userId', users.findOne);

    // Update a user with userId
    app.put('/users/:userId', users.update);

    // Delete a user with userId
    app.delete('/users/:userId', users.delete);
}