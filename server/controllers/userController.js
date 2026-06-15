import User from '../models/User.js';

/**
 * GET /api/user/profile
 * Get current user's profile
 */
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight,
      height: user.height,
      dietPref: user.dietPref,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/user/profile
 * Update current user's profile
 */
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Update fields if provided
    const { name, age, weight, height, dietPref, avatar } = req.body;
    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age;
    if (weight !== undefined) user.weight = weight;
    if (height !== undefined) user.height = height;
    if (dietPref !== undefined) user.dietPref = dietPref;
    if (avatar !== undefined) user.avatar = avatar;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      weight: updatedUser.weight,
      height: updatedUser.height,
      dietPref: updatedUser.dietPref,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    next(error);
  }
};
