import express from 'express';
import User from '../models/User.js';
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();

// Get profile data
router.get('/profile', authenticateToken, async (req, res) => {
    console.log('GET /profile route hit');
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' });
    }

    console.log('User found:', user);
    res.json({
      username: user.username,
      name: user.name,
      bio: user.bio,
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update profile data
router.put('/profile', authenticateToken, async (req, res) => {
    try {
      const { name, bio, profileImage } = req.body;
  
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, bio, profileImage },
        { new: true }
      );
  
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      res.json({
        username: user.username,
        name: user.name,
        bio: user.bio,
        profileImage: user.profileImage,
      });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  });  

export default router;
