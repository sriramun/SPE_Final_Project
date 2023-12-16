const { loginUser, signupUser ,createToken,} = require('../controllers/userController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');

describe('User Controller Tests', () => {
  const sampleUserId = 'sampleUserId';
  const sampleEmail = 'test@example.com';
  const samplePassword = 'password123';

  const sampleUser = {
    _id: sampleUserId,
    email: sampleEmail,
    password: 'hashedPassword', // Assuming the password is hashed in the model
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser', () => {
    it('should return 400 if login fails', async () => {
      const req = { body: { email: sampleEmail, password: 'wrongPassword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.login.mockRejectedValueOnce(new Error('secretOrPrivateKey must have a value'));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'secretOrPrivateKey must have a value' });
    });
  });

  describe('signupUser', () => {
    it('should return 400 if signup fails', async () => {
      const req = { body: { email: sampleEmail, password: samplePassword } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.signup.mockRejectedValueOnce(new Error('secretOrPrivateKey must have a value'));

      await signupUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'secretOrPrivateKey must have a value' });
    });
  });
});
