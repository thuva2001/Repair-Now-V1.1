import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModels.js';
import nodemailer from 'nodemailer';



//@desc   Auth user/settoken
//route POST/api/users/auth
//@access Public


const authUser = asyncHandler (async (req, res) =>{
const { email, password } = req.body;

const user = await User.findOne({ email});

if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: user.token,
      success:true, 
      message :"Welcome" +" " + user.name});
} else {
    res.status(401);
    throw new Error('Invalid email or password');
}

});


//@desc   Register a new user
//route POST/api/users/auth
//@access Public

const registerUser = asyncHandler (async (req, res) =>{
const { name, email, password } = req.body;
console.log(req.body);
const userExists = await User.findOne({ email });
console.log(userExists);
if (userExists) {
    res.status(400);
    throw new Error('User already exists');
}

const user = await User.create({
    name,
    email,
    password
});

if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      success:true, 
      message :"welcome"    });
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASS
      }
    });
    var mailOptions = {
      from : 'officialrepairnow@gmail.com',
      to : user.email ,
      subject : 'Message From repairnow For New Registration',
      html : `
      <h3> Hello  your are succesfully Registered  <h3/>
      `
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('id sent: ' + info.response);
      }
    });

} else {
    res.status(400);
    throw new Error('Invalid user data');
}

});

//@desc   Logout user
//route POST/api/users/auth
//@access Public


const logoutUser = asyncHandler (async (req, res) =>{

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message:'User logged out'});
    });


//@desc   Get User Profile
//route POST/api/users/profile
//@access Private


const getUserProfile = asyncHandler (async (req, res) =>{
    
const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
}
    res.status(200).json(user);
    });


//@desc   Update User Profile
//route Put/api/users/profile
//@access Public


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
       user.name = req.body.name || user.name;
       user.email = req.body.email || user.email;

       if (req.body.password) {
        user.password = req.body.password;
       }

       const updatedUser = await user.save();

       res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
       });
    } else {
        res.status(404);
        throw new Error('User not found')
    }

    res.status(200).json({ message:'Update user profile'});
    });

   // @desc    get all users
   // route    GET /api/users/all-users
   // @access

  const getallUser = asyncHandler(async (req, res) => {
    try {
      const getUsers = await User.find();
      res.json(getUsers);
    } catch (error) {
      throw new Error(error);
    }
  });

  // @desc    get a single user
// route    GET/api/users/
// @access Public
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const getaUser = await User.findById(id);
      res.json({
        getaUser,
      });
    } catch (error) {
      throw new Error(error);
    }
  });


  // Enable or disable user by ID
const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isActive = !user.isActive; // Toggle user's isActive status

    await user.save();

    res.status(200).json({ success: true, message: user.isActive ? 'User enabled' : 'User disabled', data: user });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



    export{
        authUser,
        registerUser,
        logoutUser,
        getUserProfile,
        updateUserProfile,
        getallUser,
        getaUser,
        toggleUserStatus
    };