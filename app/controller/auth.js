const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const token = require('../middlewares/jwtMiddleware');
const { User } = require('../models/index');

const controller = {
  handleSignUp: async (req, res) => {
    // Email must have characters before and after @, and 2 to 4 characters after the dot.
    const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/gm;

    // Password require at least 8 characters, 1 capital letter and 1 number.
    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;

    const { email, password, confirmation } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ 'error': 'Missing parameter(s).' });
    }      
      
    if (password !== confirmation) {
      return res
        .status(400)
        .json({ 'error': 'Password and confirmation isn\'t matching.' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res
        .status(400)
        .json({ 'error': 'Email is not valid.' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res
        .status(400)
        .json({ 'error': 'Password invalid (must be at least 8 characters, include one number, one capital letter and one special character).' });
    }

    const emailCheck = await User.findOne({
      where: { email }
    });

    if (emailCheck) {
      return res
        .status(400)
        .json({ 'error': 'Email already used. Please try with a different email.' });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    // New unique username generated
    const uniqueId = uuidv4();

    await User.create({
      email,
      username: uniqueId,
      password: passwordHashed,
      confirmation: passwordHashed,
      role_id: 2
    });

    res
      .status(201)
      .json({ 'message': 'User successfully created, you can now login.' });
  },

  handleSignIn: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ 'error': 'Missing parameter(s).' });
    }

    const userFound = await User.findOne({
      where: { email }
    });

    if (!userFound) {
      return res
        .status(400)
        .json({ 'error': 'This user doesn\'t exist.' });
    }

    // Function is launch if the password match with the decrypted password. It will also generate JWT tokens.
    const verificationAuthBcrypt = (errBycrypt, resBycrypt) => {
      if (resBycrypt) {
        return res
          .status(200)
          .json({
            'userId': userFound.id,
            'token': token.generateAccessToken(userFound),
            'refreshToken': token.generateRefreshToken(userFound)
          });
      } else {
        return res
          .status(400)
          .json({ 'error': 'Please verify provided credentials.' });
      }
    };

    bcrypt.compare(password, userFound.password, verificationAuthBcrypt);
  },

  handleNewPassword: async (req, res) => {
    // Password require at least 8 characters, 1 capital letter and 1 number.
    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
    
    const { id } = req.params;
    const { password, confirmation } = req.body;

    if (!password || !confirmation) {
      return res
        .status(400)
        .json({ 'error': 'Missing parameter(s).' });
    } 

    if (password !== confirmation) {
      return res
        .status(400)
        .json({ 'error': 'Password and confirmation isn\'t matching.' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res
        .status(400)
        .json({ 'error': 'Password invalid (must be at least 8 characters, include one number, one capital letter and one special character).' });
    }

    const user = await User.findByPk(id);

    // Comparaison between the current password and the new password
    const checkNewAndCurrentPassword = await bcrypt.compare(password, user.password);

    // If the result is true, it means that the new password is the same than the current one. So the user has to change the new password
    if (checkNewAndCurrentPassword) {
      return res
        .status(400)
        .json({ 'error': 'You can\'t use the same password as new password. Please provide a different one.' });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    if (password) { user.password = passwordHashed; }
    await user.save();

    res
      .status(200)
      .json({ 'message': 'Password successfully modified.' });
  }
};

module.exports = controller;