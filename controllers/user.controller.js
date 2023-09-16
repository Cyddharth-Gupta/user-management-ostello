const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const where = db.Sequelize.where;
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');


exports.findAll = (req, res) => {
    User.findAll()
      .then(data => {
        res.send(data);
        return;
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
  };

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find user with id=${id}.`
          });
        }
        return;
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
  };


async function findUserByUsername(username) {
    try {
        users = await User.findAll({ where: {username: username} })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}

async function findUserByEamil(email) {
    try {
        users = await User.findAll({ where: {email: email} })
        return (users instanceof Array) ? users[0] : null;
    }
    catch (ex) {
        throw ex;
    }
}


exports.signup = (req, res) => {
    console.log(req.body)
    if(!req.body.username, !req.body.email, !req.body.password) {
        res.status(400).send({
            message: 'Please provide all the fields.'
        });
        return;
    }

    // Create the User Record
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    User.create(newUser)
    .then(data => {
      res.send({
          message: "Signup Successful!",
          data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while signing you up.",
        errObj: err
      });
    });
}

exports.login = async (req, res) => {
    console.log(req.body)

    if ((!req.body.username && !req.body.email) || (!req.body.password)) {
        res.status(400).send({
            message: 'Please provide username/email and password.'
        });
    }
    user = null;
    if(req.body.username) {
        user = await findUserByUsername(req.body.username);
    } else if (req.body.email) {
        user = await findUserByEamil(req.body.email);
    }
    if(user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if(user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Login Successful",
                token: jwt.sign({ username: user.username, email: user.email }, secret)
            })
        } else {
            res.status(403).send({
                message: "Invalid Credentails!"
            });
        }
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      // Find the user by ID
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: `User with id=${id} not found.` });
      }
  
      // Ensure that the user making the request is the owner of the account (or has appropriate permissions)
      if (user.username !== req.user.username) {
        return res.status(403).json({ error: 'Unauthorized access.' });
      }
  
      // Update user information based on the request body
      if (req.body.username) {
        user.username = req.body.username;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
  
      // Save the updated user to the database
      await user.save();
  
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.deleteUser = async (req, res) => {
    const id = req.params.id;
  
    try {
      // Find the user by ID
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: `User with id=${id} not found.` });
      }
  
      // Ensure that the user making the request is the owner of the account (or has appropriate permissions)
      if (user.username !== req.user.username) {
        console.log(user.username)
        console.log(req.user.username)

        return res.status(403).json({ error: 'Unauthorized access.' });
      }
  
      // Delete the user from the database
      await user.destroy();
  
      return res.status(204).send(); // Respond with 204 No Content for successful deletion
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  

exports.changepassword = async (req, res) => {
    console.log(req.body)

    if (!req.body.oldpassword || !req.body.newpassword) {
        res.status(400).send({
            message: 'Please provide both old and new password.'
        });
    }
    user = await findUserByUsername(req.user.username);
    if(user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if(user.verifyPassword(req.body.oldpassword)) {
            user.update({password: req.body.newpassword}, {
                where: {id: user.id}
            });
            res.status(200).send({
                message: "Password Updated Successfully!"
            })
        } else {
            res.status(403).send({
                message: "Invalid Old Password! Please recheck."
            });
        }
    }
}

exports.verifypassword = async (req, res) => {
    console.log(req.body)

    if (!req.body.password) {
        res.status(400).send({
            message: 'Please provide your password to re-authenticate.'
        });
    }
    user = await findUserByUsername(req.user.username);
    if(user == null || !(user instanceof User)) {
        res.status(403).send({
            message: "Invalid Credentials!"
        });
    } else {
        if(user.verifyPassword(req.body.password)) {
            res.status(200).send({
                message: "Password Verification Successful!"
            })
        } else {
            res.status(403).send({
                message: "Invalid Password! Please recheck."
            });
        }
    }
}

module.exports = exports;