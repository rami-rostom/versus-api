const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('../services/jwt');
const { User } = require('../models/index');

const controller = {
  handleSignUp: async (req, res) => {
    const EMAIL_REGEX = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/gm;

    // Password require at least 8 characters, 1 capital letter and 1 number.
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    try {
      const { email, password, confirmation } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          'error': 'Missing parameter(s).'
        });
      }      

      if (!EMAIL_REGEX.test(email)) {
        return res.status(400).json({
          'error': 'Email is not valid.'
        });
      }

      if (!PASSWORD_REGEX.test(password)) {
        return res.status(400).json({
          'error': 'Password invalid (must be at least 8 characters, include 1 number and 1 capital letter).'
        });
      }

      if (password !== confirmation) {
        return res.status(400).json({
          'error': 'Password and confirmation isn\'t matching.'
        });
      }

      const emailCheck = await User.findOne({
        where: { email }
      });

      if (emailCheck) {
        return res.status(400).json({
          'error': 'Email already used. Please try with a different email.'
        });
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      const uniqueId = uuidv4();

      await User.create({
        email,
        username: uniqueId,
        password: passwordHashed,
        confirmation: passwordHashed
      });

      res.status(200).json({
        message: 'User created, you can now login'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  handleSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          'error': 'Missing parameter(s).'
        });
      }

      const userFound = await User.findOne({
        where: { email }
      });

      if (!userFound) {
        return res.status(400).json({
          'error': 'This user doesn\'t exist.'
        });
      }

      if (userFound) {
        bcrypt.compare(password, userFound.password, verificationBcrypt());
      }

      const verificationBcrypt = (errBycrypt, resBycrypt) => {
        if (resBycrypt) {
          return res.status(200).json({
            'userId': userFound.id,
            'token': jwt.generateTokenForUser(userFound)
          });
        }
      };
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  }
};

module.exports = controller;