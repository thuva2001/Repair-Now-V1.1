
import asynchandler from 'express-async-handler';
import Mechanic from '../models/mechanicModel.js';
import cloudinary from '../utils/Cloudinary.js';

// @desc Create a new mechanic
// route POST /api/mechanic/create shop
// @access Public

const createMechanic = asynchandler(async (req, res) => {
  const {
    ShopName,
    latitude,
    longitude,
    ShopAddress,
    ShopNear,
    ShopType,
    PhoneNumber,
    Email,
    ShopTime,
  } = req.body;

  if (!latitude || !longitude) {
    res.status(400);
    throw new Error("Latitude and Longitude are required for location.");
  }

  let shopPhoto = null;
  if (req.file) {
    const publicId = req.file.originalname || `shop_${Date.now()}`;
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `repairnow`,
      public_id: publicId,
    });

    shopPhoto = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const mechanic = await Mechanic.create({
    ShopName,
    location: {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    },
    ShopAddress,
    ShopNear,
    ShopType,
    PhoneNumber,
    Email,
    ShopPhoto: shopPhoto,
    ShopTime,
  });

  if (mechanic) {
    res.status(201).json(mechanic);
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});



  
  
  // // @desc Get all shops
  // // route GET /api/mechanic/getmechanic
  // // @access Private
  
  const getMechanic = asynchandler(async (req, res) => {
    const mechanic = await Mechanic.find({});
    res.json(mechanic);
  });



  // @desc Get all mechanics with ispost true
// @route GET /api/mechanic/getmechanic

const gettrueMechanic = asynchandler(async (req, res) => {
  const { lat, lng, maxDistance } = req.query;
  console.log("1111111", lat, lng, maxDistance);
 
 
  let query = { ispost: true }; // Default query
 
 
  if (lat && lng) {
    query.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)], // [lng, lat]
        },
        $maxDistance: parseInt(maxDistance) || 5000, // Use user input or default to 5000m
      },
    };
  }
 
 
  try {
    const mechanics = await Mechanic.find(query);
    res.json(mechanics);
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    res.status(500).json({ message: "Server error" });
  }
 });
 
  // @desc Get a single shop by ID
  // route GET /api/mechanic/ id
  // @access Private
  
  const getMechanicById = asynchandler(async (req, res) => {
    const mechanic = await Mechanic.findById(req.params.id);
  
    if (mechanic) {
      res.json(mechanic);
    } else {
      res.status(404);
      throw new Error('mechanic not found');
    }
  });

  // @desc Update a mechanic by ID
// route Patch /api/design/:id
// @access Private 

const updateMechanicById = async (req, res) => {
  const { ShopName, Location,ShopAddress,ShopNear, ShopType, PhoneNumber, Email, ShopTime, ispost } = req.body;

  try {
    const mechanic = await Mechanic.findById(req.params.id);

    if (mechanic) {
      mechanic.ShopName = ShopName || mechanic.ShopName;
      mechanic.Location = Location || mechanic.Location;
      mechanic.ShopAddress = ShopAddress || mechanic.ShopAddress;
      mechanic.ShopNear = ShopNear || mechanic.ShopNear;
      mechanic.ShopType = ShopType || mechanic.ShopType;
      mechanic.PhoneNumber = PhoneNumber || mechanic.PhoneNumber;
      mechanic.Email = Email || mechanic.Email;
      mechanic.ShopTime = ShopTime || mechanic.ShopTime;
      mechanic.ispost = ispost !== undefined ? ispost : mechanic.ispost; // Update ispost if provided

      const updatedMechanic = await mechanic.save();
      res.json(updatedMechanic);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
  
  
  
  
  // @desc Delete mechanic by ID
  // route DELETE /api/mechanic/:id
  // @access Private 
  
  const deleteMechanicById = asynchandler(async (req, res) => {
   const {id} =req.params;
   
    try  {
      const mechanicdelete= await Mechanic.findOneAndDelete(id)
      res.json({ message: 'mechanic removed',mechanicdelete });
    } catch {
      res.status(404);
      throw new Error('mechanic not found');
    }
  
  
  });
  

  
  
  
  
  export { createMechanic ,getMechanic,getMechanicById,updateMechanicById,deleteMechanicById,gettrueMechanic,};
