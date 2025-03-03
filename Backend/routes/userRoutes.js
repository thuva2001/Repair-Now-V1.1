import express from 'express';
import nodemailer from 'nodemailer'
const router = express.Router();
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getallUser,
    getaUser,
    toggleUserStatus
 } from '../controllers/userController.js';
 import { protect,isAdmin } from '../middleware/authMiddleware.js';



router.post('/signup', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);
router.get('/all-users',getallUser);
router.get('/:id', isAdmin, getaUser);
router.put('/:id/toggle', toggleUserStatus);

http://localhost:5000



// Define a route to handle form submissions
router.post('/email', async (req, res) => {
    const { name, email, subject, message } = req.body;
  
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      // Configure your email provider here
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS
      }
    });
  
    // Define email content
    let mailOptions = {
      from: email,
      to: 'officialrepairnow@gmail.com',
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    };
  
    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    }
  });

export default router;